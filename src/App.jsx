import React, { useState, useEffect, useCallback } from 'react';
import { Diamond, X, Map as MapIcon, ShoppingBag, Users, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { MAPS } from './components/MapData';
import { CHARACTERS } from './components/Characters';
import { OUTFITS } from './assets/img/outfit/data.js';
import { INTERACTIVE_OBJECTS } from './assets/img/interactive/data.js';

const TILE_SIZE = 80;

// Build one world-drop item per spawn entry across all outfits.
const _outfitWorldDrops = Object.values(OUTFITS).flatMap(o =>
  (o.spawns || []).map((spawn, idx) => ({
    id: `outfit-${o.id}-${spawn.map}-${idx}`,
    type: 'clothing',
    outfit: o,
    spawnMap: spawn.map,
    x: spawn.x,
    y: spawn.y,
  }))
);

// Build INITIAL_ITEMS from per-map diamond data and outfit world drops.
const INITIAL_ITEMS = Object.fromEntries(
  Object.values(MAPS).map(map => [
    map.id,
    [
      ..._outfitWorldDrops.filter(o => o.spawnMap === map.id),
      ...(map.diamonds || []).map(d => ({ ...d, type: 'diamond' })),
    ],
  ])
);

// Shop items: outfits with price > 0 and no spawns.
const SHOP_ITEMS = Object.values(OUTFITS)
  .filter(o => o.price > 0 && (!o.spawns || o.spawns.length === 0))
  .map(o => ({ id: `shop-${o.id}`, type: 'clothing', outfit: o, price: o.price }));

function App() {
  const [currentMapId, setCurrentMapId] = useState('suburban_house');
  const [playerPos, setPlayerPos] = useState({ x: MAPS['suburban_house'].startX, y: MAPS['suburban_house'].startY });

  // Game State
  const [diamonds, setDiamonds] = useState(0);
  const [inventory, setInventory] = useState([]); // Array of clothing objects
  const [equipped, setEquipped] = useState(null); // ID of equipped clothing
  const [worldItems, setWorldItems] = useState(INITIAL_ITEMS);
  const [activeCharacter, setActiveCharacter] = useState(CHARACTERS.find(c => c.name === 'Kylie') || CHARACTERS[0]);
  const [possessions, setPossessions] = useState([]);
  const [completedMissions, setCompletedMissions] = useState({});

  // Health (time remaining)
  const MAX_HEALTH = 3;
  const [health, setHealth] = useState(MAX_HEALTH);
  const [invincible, setInvincible] = useState(false);
  const [hitFlash, setHitFlash] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Obstacle glow set (obstacle ids currently glowing)
  const [glowingObstacles, setGlowingObstacles] = useState(new Set());

  // Active obstacles — keyed by mapId, each entry is array of { id, type, x, y, dir }
  const [activeObstacles, setActiveObstacles] = useState(() =>
    Object.fromEntries(
      Object.values(MAPS).map(m => [
        m.id,
        (m.obstacles || []).filter(o => {
          if (!o.type) {
            console.error(`[MapData] Obstacle "${o.id}" on map "${m.id}" has undefined type. Check that the INTERACTIVE_OBJECTS key exists.`);
            return false;
          }
          if (!o.type.src) {
            console.warn(`[MapData] Obstacle "${o.id}" (${o.type.id}) on map "${m.id}" has no src image.`);
          }
          return true;
        }).map(o => ({ ...o })), // deep-copy so we can mutate pos
      ])
    )
  );

  // Window size tracking for camera clamp
  const [windowSize, setWindowSize] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 800,
    h: typeof window !== 'undefined' ? window.innerHeight : 600
  });

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modals & UI
  const [activeModal, setActiveModal] = useState(null); // 'clothing', 'closet', 'shop', 'map'
  const [pendingItem, setPendingItem] = useState(null); // Item player just stood on

  // Current map data
  const mapData = MAPS[currentMapId];

  // Dev-time: validate all map data on mount
  useEffect(() => {
    Object.values(MAPS).forEach(m => {
      (m.objects || []).forEach((obj, i) => {
        if (!obj.type) {
          console.error(`[MapData] Static object #${i} on map "${m.id}" has undefined type. Check MAP_XX_OBJECTS key.`);
        } else if (!obj.type.src) {
          console.warn(`[MapData] Static object "${obj.type.id}" #${i} on map "${m.id}" has no src image.`);
        }
      });
    });
  }, []);
  // Show splash on initial load
  useEffect(() => {
    if (mapData.mission && !completedMissions[currentMapId]) {
      setActiveModal('mission_splash');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Movement
  const handleKeyDown = useCallback((e) => {
    if (activeModal) return; // Don't move if a modal is open

    let { x, y } = playerPos;
    if (e.key === 'ArrowUp' || e.key === 'w') y -= 1;
    if (e.key === 'ArrowDown' || e.key === 's') y += 1;
    if (e.key === 'ArrowLeft' || e.key === 'a') x -= 1;
    if (e.key === 'ArrowRight' || e.key === 'd') x += 1;

    // Bounds check
    if (y < 0 || y >= mapData.height || x < 0 || x >= mapData.width) return;

    // Collision check
    const tileType = mapData.data[y][x];
    if (![0, 3, 4, 5, 6, 8, 9].includes(tileType)) return;

    // Static Object Collision
    const isStaticObject = (mapData.objects || []).some(obj => {
      const objW = obj.type.width || 1;
      const objH = obj.type.height || 1;
      return x >= obj.x && x < obj.x + objW &&
        y >= obj.y && y < obj.y + objH;
    });
    if (isStaticObject) return;

    // Interactive Object Collision Check
    const activeObs = activeObstaclesRef.current[currentMapId] || [];
    const interactiveAtTarget = activeObs.find(obs => obs.x === x && obs.y === y);

    if (interactiveAtTarget) {
      if (interactiveAtTarget.type.canPush) {
        const dx = x - playerPos.x;
        const dy = y - playerPos.y;
        const targetX = x + dx;
        const targetY = y + dy;

        // Check if targetX, targetY is Walkable and Empty
        if (targetY >= 0 && targetY < mapData.height && targetX >= 0 && targetX < mapData.width) {
          const tTileType = mapData.data[targetY][targetX];
          if ([0, 3, 4, 5, 6, 8].includes(tTileType)) {
            const isTargetStaticObj = (mapData.objects || []).some(obj => {
              const w = obj.type.width || 1;
              const h = obj.type.height || 1;
              return targetX >= obj.x && targetX < obj.x + w && targetY >= obj.y && targetY < obj.y + h;
            });
            const isTargetInteractiveObj = activeObs.some(o => o.x === targetX && o.y === targetY);
            
            if (!isTargetStaticObj && !isTargetInteractiveObj) {
              setActiveObstacles(prev => {
                const obsList = [...prev[currentMapId]];
                const idx = obsList.findIndex(o => o.id === interactiveAtTarget.id);
                obsList[idx] = { ...obsList[idx], x: targetX, y: targetY };
                return { ...prev, [currentMapId]: obsList };
              });
              setPlayerPos({ x, y });
            }
          }
        }
        return; // Block movement if push fails, or pushed successfully
      }

      if (interactiveAtTarget.type.canTurnOver) {
        if (!interactiveAtTarget.turnedOver) {
          setActiveObstacles(prev => {
            const obsList = [...prev[currentMapId]];
            const idx = obsList.findIndex(o => o.id === interactiveAtTarget.id);
            obsList[idx] = { ...obsList[idx], turnedOver: true };
            return { ...prev, [currentMapId]: obsList };
          });
          const toastId = `toast-${Date.now()}`;
          setToasts(prev => [...prev, { id: toastId, message: `Turned over ${interactiveAtTarget.type.label}` }]);
          setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 3000);
          return; // Block movement because we just flipped it
        } else if (!interactiveAtTarget.type.canCollect) {
          return; // Block movement if it's not collectable
        }
        // Let player walk onto it if already flipped and collectable
      }

      if (interactiveAtTarget.type.canOpenAndClose) {
        const isCurrentlyOpen = !!interactiveAtTarget.isOpen;

        // Toggle condition
        const reqItem = interactiveAtTarget.type.requiresItem;
        const currentPossessions = possessionsRef.current;
        const hasReqItem = !reqItem || currentPossessions.some(p => p.id === reqItem);

        if (!isCurrentlyOpen && reqItem && !hasReqItem) {
          const toastId = `toast-${Date.now()}`;
          setToasts(prev => [...prev, { id: toastId, message: `Requires ${reqItem} to open!` }]);
          setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 3000);
          return;
        }

        if (!isCurrentlyOpen) {
          // Opening: spawn contained items
          const itemsToSpawn = interactiveAtTarget.type.containsItems || 
                              (interactiveAtTarget.type.containsItem ? [{ id: interactiveAtTarget.type.containsItem, type: 'interactive' }] : []);
          
          setActiveObstacles(prev => {
            const obsList = [...prev[currentMapId]];
            const idx = obsList.findIndex(o => o.id === interactiveAtTarget.id);
            const chest = obsList[idx];
            obsList[idx] = { ...chest, isOpen: true };

            if (!chest.hasSpawnedItem && itemsToSpawn.length > 0) {
              // Find adjacent walkable tiles (8 directions)
              const adjacents = [
                { x: chest.x + 1, y: chest.y }, { x: chest.x - 1, y: chest.y },
                { x: chest.x, y: chest.y + 1 }, { x: chest.x, y: chest.y - 1 },
                { x: chest.x + 1, y: chest.y + 1 }, { x: chest.x - 1, y: chest.y - 1 },
                { x: chest.x + 1, y: chest.y - 1 }, { x: chest.x - 1, y: chest.y + 1 },
              ];

              let usedTiles = [];
              const outfitsToSpawn = [];

              itemsToSpawn.forEach((item, i) => {
                // Find a unique adjacent tile that is walkable and not currently occupied by an obstacle
                let spawnTile = adjacents.find(t =>
                  isCellWalkable(mapData, t.x, t.y) &&
                  !obsList.some(o => o.x === t.x && o.y === t.y) &&
                  !usedTiles.some(ut => ut.x === t.x && ut.y === t.y)
                );

                // Fallback: If no unique space, stack them on available tiles (or chest location)
                // Comment: Stacking fallback to ensure items always appear. Developer should limit items per container.
                if (!spawnTile) {
                  spawnTile = adjacents.find(t => isCellWalkable(mapData, t.x, t.y)) || { x: chest.x, y: chest.y };
                }
                usedTiles.push(spawnTile);

                if (item.type === 'interactive') {
                  const config = INTERACTIVE_OBJECTS[item.id];
                  if (config) {
                    obsList.push({
                      id: `${chest.id}-spawn-${item.id}-${i}-${Date.now()}`,
                      type: config,
                      x: spawnTile.x,
                      y: spawnTile.y,
                      dir: 1,
                    });
                  }
                } else if (item.type === 'outfit') {
                  const config = OUTFITS[item.id];
                  if (config) {
                    outfitsToSpawn.push({
                      id: `${chest.id}-spawn-${item.id}-${i}-${Date.now()}`,
                      type: 'clothing',
                      outfit: config,
                      x: spawnTile.x,
                      y: spawnTile.y,
                    });
                  }
                }
              });

              obsList[idx] = { ...obsList[idx], hasSpawnedItem: true };

              // Trigger side-effect update for outfits state
              if (outfitsToSpawn.length > 0) {
                setTimeout(() => {
                  setWorldItems(wPrev => ({
                    ...wPrev,
                    [currentMapId]: [...(wPrev[currentMapId] || []), ...outfitsToSpawn]
                  }));
                }, 0);
              }

              const toastId = `toast-spawn-${Date.now()}`;
              setToasts(tPrev => [...tPrev, { id: toastId, message: `Items appeared from the ${chest.type.label}!` }]);
              setTimeout(() => setToasts(tPrev => tPrev.filter(t => t.id !== toastId)), 3000);
            }

            return { ...prev, [currentMapId]: obsList };
          });

          const toastId = `toast-open-${Date.now()}`;
          setToasts(prev => [...prev, { id: toastId, message: `Opened ${interactiveAtTarget.type.label}` }]);
          setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 3000);
        } else {
          // Closing
          setActiveObstacles(prev => {
            const obsList = [...prev[currentMapId]];
            const idx = obsList.findIndex(o => o.id === interactiveAtTarget.id);
            obsList[idx] = { ...obsList[idx], isOpen: false };
            return { ...prev, [currentMapId]: obsList };
          });
          const toastId = `toast-${Date.now()}`;
          setToasts(prev => [...prev, { id: toastId, message: `Closed ${interactiveAtTarget.type.label}` }]);
          setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 3000);
        }
        return; // Block movement
      }
    }

    // Move player
    setPlayerPos({ x, y });
  }, [playerPos, mapData, activeModal, currentMapId]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ── Obstacle movement tick ──────────────────────────────────────────────────
  // We keep refs for values we need inside the interval without re-creating it.
  const playerPosRef = React.useRef(playerPos);
  useEffect(() => { playerPosRef.current = playerPos; }, [playerPos]);

  const activeObstaclesRef = React.useRef(activeObstacles);
  useEffect(() => { activeObstaclesRef.current = activeObstacles; }, [activeObstacles]);

  const possessionsRef = React.useRef(possessions);
  useEffect(() => { possessionsRef.current = possessions; }, [possessions]);

  const healthRef = React.useRef(health);
  useEffect(() => { healthRef.current = health; }, [health]);

  const invincibleRef = React.useRef(invincible);
  useEffect(() => { invincibleRef.current = invincible; }, [invincible]);

  const currentMapIdRef = React.useRef(currentMapId);
  useEffect(() => { currentMapIdRef.current = currentMapId; }, [currentMapId]);

  // Helper: is (nx, ny) a walkable, non-static-object cell on the given map?
  const isCellWalkable = useCallback((mapDef, nx, ny) => {
    if (ny < 0 || ny >= mapDef.height || nx < 0 || nx >= mapDef.width) return false;
    const tile = mapDef.data[ny][nx];
    if (![0, 3, 4, 5, 6, 8, 9].includes(tile)) return false;
    const blocked = (mapDef.objects || []).some(obj => {
      const w = obj.type.width || 1;
      const h = obj.type.height || 1;
      return nx >= obj.x && nx < obj.x + w && ny >= obj.y && ny < obj.y + h;
    });
    return !blocked;
  }, []);

  useEffect(() => {
    const TICK_MS = 500;
    // Each obstacle advances one step every (speed / TICK_MS) ticks.
    // We track a per-obstacle tick counter to support different speeds.
    const tickCounters = {};

    const interval = setInterval(() => {
      const mapId = currentMapIdRef.current;
      const mapDef = MAPS[mapId];

      setActiveObstacles(prev => {
        const mapObs = prev[mapId];
        if (!mapObs || mapObs.length === 0) return prev;

        const updated = mapObs.map(obs => {
          // Speed: steps per second → ticks to skip
          const ticksPerStep = Math.max(1, Math.round((obs.type.speed * 1000) / TICK_MS));
          tickCounters[obs.id] = (tickCounters[obs.id] || 0) + 1;
          if (tickCounters[obs.id] < ticksPerStep) return obs; // not time to move yet
          tickCounters[obs.id] = 0;

          // Compute candidate next position
          let nx, ny, newDir;

          if (obs.type.axis === 'random') {
            // Random walk: pick a random direction each step
            const directions = [
              { dx: 1, dy: 0 },   // right
              { dx: -1, dy: 0 },  // left
              { dx: 0, dy: 1 },   // down
              { dx: 0, dy: -1 },  // up
            ];
            // Shuffle and try each direction until one is walkable
            const shuffled = directions.sort(() => Math.random() - 0.5);
            let moved = false;
            for (const d of shuffled) {
              const cx = obs.x + d.dx;
              const cy = obs.y + d.dy;
              if (isCellWalkable(mapDef, cx, cy)) {
                nx = cx;
                ny = cy;
                newDir = d.dx !== 0 ? d.dx : obs.dir;
                moved = true;
                break;
              }
            }
            if (!moved) {
              nx = obs.x;
              ny = obs.y;
              newDir = obs.dir;
            }
          } else {
            // Standard patrol: x or y axis
            nx = obs.x + (obs.type.axis === 'x' ? obs.dir : 0);
            ny = obs.y + (obs.type.axis === 'y' ? obs.dir : 0);
            newDir = obs.dir;

            if (!isCellWalkable(mapDef, nx, ny)) {
              // Bounce — try reverse
              newDir = -obs.dir;
              nx = obs.x + (obs.type.axis === 'x' ? newDir : 0);
              ny = obs.y + (obs.type.axis === 'y' ? newDir : 0);
              // If still not walkable, stay put
              if (!isCellWalkable(mapDef, nx, ny)) {
                nx = obs.x;
                ny = obs.y;
                newDir = obs.dir;
              }
            }
          }

          return { ...obs, x: nx, y: ny, dir: newDir };
        });

        // Check collision with player after moving
        const { x: px, y: py } = playerPosRef.current;
        const hitObs = updated.find(o => o.x === px && o.y === py);
        if (hitObs && !hitObs.type.canCollect && !invincibleRef.current && healthRef.current > 0) {
          setHealth(h => {
            const next = h - hitObs.type.damage;
            if (next <= 0) {
              setActiveModal('gameover');
              return 0;
            }
            return next;
          });
          setInvincible(true);
          setHitFlash(true);
          setTimeout(() => setHitFlash(false), 400);
          setTimeout(() => setInvincible(false), 1500);

          // Toast message
          if (hitObs.type.hitMessage) {
            const toastId = `toast-${Date.now()}`;
            setToasts(prev => [...prev, { id: toastId, message: hitObs.type.hitMessage }]);
            setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 3000);
          }

          // Obstacle glow
          setGlowingObstacles(prev => new Set([...prev, hitObs.id]));
          setTimeout(() => setGlowingObstacles(prev => {
            const next = new Set(prev);
            next.delete(hitObs.id);
            return next;
          }), 1000);
        }

        return { ...prev, [mapId]: updated };
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [isCellWalkable]); // stable — runs once

  // Check for items on current tile
  useEffect(() => {
    const itemsOnMap = worldItems[currentMapId] || [];
    const itemOnTile = itemsOnMap.find(item => item.x === playerPos.x && item.y === playerPos.y);

    if (itemOnTile) {
      if (itemOnTile.type === 'diamond') {
        // Collect diamond immediately
        setDiamonds(prev => prev + 1);
        // Remove from world
        setWorldItems(prev => ({
          ...prev,
          [currentMapId]: prev[currentMapId].filter(i => i.id !== itemOnTile.id)
        }));
      } else if (itemOnTile.type === 'clothing') {
        // Prompt user
        setPendingItem(itemOnTile);
        setActiveModal('clothing');
      }
    }

    // Check for collectable obstacles on current tile
    const obsOnMap = activeObstacles[currentMapId] || [];
    const hitObs = obsOnMap.find(o => o.x === playerPos.x && o.y === playerPos.y);
    if (hitObs && hitObs.type.canCollect) {
      setPossessions(prev => {
        if (prev.some(p => p.id === hitObs.type.id)) return prev;
        return [...prev, hitObs.type];
      });
      setActiveObstacles(prev => ({
        ...prev,
        [currentMapId]: prev[currentMapId].filter(o => o.id !== hitObs.id)
      }));
      if (hitObs.type.hitMessage) {
        const toastId = `toast-${Date.now()}`;
        setToasts(prev => [...prev, { id: toastId, message: hitObs.type.hitMessage }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 3000);
      }
    }
  }, [playerPos, currentMapId, worldItems, activeObstacles]);

  // Evaluate Mission
  useEffect(() => {
    const mission = mapData.mission;
    if (!mission || completedMissions[currentMapId]) return;

    const hasItems = mission.items.every(itemId => possessions.some(p => p.id === itemId));
    const equippedItem = inventory.find(i => i.id === equipped);
    const hasOutfit = equippedItem && equippedItem.outfit.id === mission.outfit;
    const target = mission.target;
    
    // Player must be adjacent or within the target rect (since target might be solid)
    const isAtTarget = playerPos.x >= target.x - 1 && playerPos.x <= target.x + target.width &&
                       playerPos.y >= target.y - 1 && playerPos.y <= target.y + target.height;

    if (hasItems && hasOutfit && isAtTarget) {
      setCompletedMissions(prev => ({ ...prev, [currentMapId]: true }));
      setActiveModal('missioncomplete');
    }
  }, [playerPos, equipped, possessions, mapData, currentMapId, completedMissions, inventory]);

  const acceptClothing = (equipIndex) => {
    if (!pendingItem) return;
    setInventory(prev => [...prev, pendingItem]);
    if (equipIndex) {
      setEquipped(pendingItem.id);
    }
    // Remove from world
    setWorldItems(prev => ({
      ...prev,
      [currentMapId]: prev[currentMapId].filter(i => i.id !== pendingItem.id)
    }));
    setActiveModal(null);
    setPendingItem(null);
  };

  const buyItem = (item) => {
    if (diamonds >= item.price && !inventory.find(i => i.id === item.id)) {
      setDiamonds(prev => prev - item.price);
      setInventory(prev => [...prev, item]);
    }
  };

  const changeMap = (newMapId) => {
    setCurrentMapId(newMapId);
    setPlayerPos({ x: MAPS[newMapId].startX, y: MAPS[newMapId].startY });
    if (MAPS[newMapId].mission && !completedMissions[newMapId]) {
      setActiveModal('mission_splash');
    } else {
      setActiveModal(null);
    }
  };

  const restartGame = () => {
    setHealth(MAX_HEALTH);
    setInvincible(false);
    setHitFlash(false);
    setPlayerPos({ x: MAPS[currentMapId].startX, y: MAPS[currentMapId].startY });
    // Reset obstacles to their initial positions from map definition
    setActiveObstacles(
      Object.fromEntries(
        Object.values(MAPS).map(m => [
          m.id,
          (m.obstacles || []).map(o => ({ ...o })),
        ])
      )
    );
    setActiveModal(null);
  };

  // Camera bounds calculation (so you don't see out-of-bounds map)
  const mapWidthPx = mapData.width * TILE_SIZE;
  const mapHeightPx = mapData.height * TILE_SIZE;
  const halfW = windowSize.w / 2;
  const halfH = windowSize.h / 2;

  const idealX = playerPos.x * TILE_SIZE + TILE_SIZE / 2;
  const idealY = playerPos.y * TILE_SIZE + TILE_SIZE / 2;

  // Clamp if map is larger than screen. If smaller, center it.
  const clampedX = mapWidthPx > windowSize.w ? Math.max(halfW, Math.min(idealX, mapWidthPx - halfW)) : mapWidthPx / 2;
  const clampedY = mapHeightPx > windowSize.h ? Math.max(halfH, Math.min(idealY, mapHeightPx - halfH)) : mapHeightPx / 2;

  // Visible windowing calc (buffer of 2 extra tiles)
  const cameraLeft = clampedX - halfW;
  const cameraTop = clampedY - halfH;
  const minX = Math.max(0, Math.floor(cameraLeft / TILE_SIZE) - 2);
  const maxX = Math.min(mapData.width - 1, Math.ceil((cameraLeft + windowSize.w) / TILE_SIZE) + 2);
  const minY = Math.max(0, Math.floor(cameraTop / TILE_SIZE) - 2);
  const maxY = Math.min(mapData.height - 1, Math.ceil((cameraTop + windowSize.h) / TILE_SIZE) + 2);

  return (
    <div className={`game-container${hitFlash ? ' hit' : ''}`}>
      {/* Background UI Layer */}
      <div className="ui-layer">
        <div className="top-bar pointer-events-auto">
          {/* Health Bar — sand timers */}
          <div className="glass-panel time-bar">
            {Array.from({ length: MAX_HEALTH }).map((_, i) => (
              <span
                key={i}
                className={`time-slot${i < health ? '' : ' lost'}`}
              >
                {i < health ? '⏳' : '⌛'}
              </span>
            ))}
          </div>

          <div className="glass-panel diamond-counter">
            <Diamond className="diamond-icon" fill="#ffb703" color="#ffb703" size={24} />
            {diamonds}
          </div>

          <div className="top-bar-buttons hide-scrollbar">
            <button className="button secondary" onClick={() => setActiveModal('map')}>
              <MapIcon size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} /> Map
            </button>
            <button className="button" style={{ background: '#4ecdc4', color: '#fff' }} onClick={() => setActiveModal('characters')}>
              <Users size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} /> Characters
            </button>
            <button className="button" onClick={() => setActiveModal('possessions')}>
              🎒 Possessions
            </button>
            <button className="button" onClick={() => setActiveModal('closet')}>
              👗 Closet
            </button>
            <button className="button" style={{ background: '#9d4edd' }} onClick={() => setActiveModal('shop')}>
              <ShoppingBag size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} /> Shop
            </button>
          </div>
        </div>

        <div className="map-title" style={{ alignSelf: 'center', fontSize: '2rem', fontWeight: 800, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)', pointerEvents: 'none', marginBottom: '20px' }}>
          {mapData.name}
        </div>

        <div className="coords-indicator">
          ({playerPos.x}, {playerPos.y})
        </div>
      </div>

      {/* Game Map Rendering */}
      <div className="game-world" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(${-clampedX}px, ${-clampedY}px)`,
        transition: 'transform 0.15s linear'
      }}>
        <div className="map-grid" style={{
          width: mapData.width * TILE_SIZE,
          height: mapData.height * TILE_SIZE,
          position: 'absolute',
          top: 0, left: 0
        }}>
          {(() => {
            const tiles = [];
            for (let y = minY; y <= maxY; y++) {
              for (let x = minX; x <= maxX; x++) {
                tiles.push(
                  <div key={`${x}-${y}`} className={`tile tile-${mapData.data[y][x]}`} style={{ position: 'absolute', left: x * TILE_SIZE, top: y * TILE_SIZE }} />
                );
              }
            }
            return tiles;
          })()}
        </div>

        {/* Static Image Map Objects */}
        {(mapData.objects || [])
          .filter(obj => {
            const w = obj.type.width || 1;
            const h = obj.type.height || 1;
            return obj.x + w >= minX && obj.x <= maxX && obj.y + h >= minY && obj.y <= maxY;
          })
          .map((obj, i) => (
          <img
            key={`obj-${i}`}
            src={obj.type.src}
            alt={obj.type.id}
            style={{
              position: 'absolute',
              left: obj.x * TILE_SIZE,
              top: obj.y * TILE_SIZE,
              width: obj.type.width * TILE_SIZE,
              height: obj.type.height * TILE_SIZE,
              objectFit: 'contain',
              zIndex: 2,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
            }}
          />
        ))}

        {/* World Items */}
        {(worldItems[currentMapId] || [])
          .filter(item => item.x >= minX && item.x <= maxX && item.y >= minY && item.y <= maxY)
          .map((item) => (
          <div key={item.id} className="floating-item" style={{ left: item.x * TILE_SIZE, top: item.y * TILE_SIZE }}>
            {item.type === 'diamond' ? (
              <Diamond fill="#ffb703" color="#fb8500" size={48} className="diamond-icon" />
            ) : (
              <img
                src={item.outfit.src}
                alt={item.outfit.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              />
            )}
          </div>
        ))}

        {/* Moving Obstacles */}
        {(activeObstacles[currentMapId] || [])
          .filter(obs => {
            const w = obs.type.width || 1;
            const h = obs.type.height || 1;
            return obs.x + w >= minX && obs.x <= maxX && obs.y + h >= minY && obs.y <= maxY;
          })
          .map(obs => (
          <img
            key={obs.id}
            src={obs.isOpen && obs.type.openSrc ? obs.type.openSrc : (obs.turnedOver && obs.type.turnedSrc ? obs.type.turnedSrc : obs.type.src)}
            alt={obs.type.label}
            className={`obstacle-sprite${glowingObstacles.has(obs.id) ? ' glowing' : ''}${obs.type.canCollect && (!obs.type.canTurnOver || obs.turnedOver) ? ' floating-collectable' : ''}${obs.turnedOver ? (obs.type.turnedSrc ? ' revealed' : ' turned-over') : ''}${obs.isOpen ? ' opened' : ''}`}
            style={{
              left: obs.x * TILE_SIZE,
              top: obs.y * TILE_SIZE,
              width: obs.type.width * TILE_SIZE,
              height: obs.type.height * TILE_SIZE,
              transform: obs.type.canCollect ? undefined : (obs.dir === -1 && obs.type.axis === 'x' ? 'scaleX(-1)' : 'none'),
            }}
          />
        ))}

        {/* Player Sprite */}
        <div className="player player-sprite" style={{ left: playerPos.x * TILE_SIZE, top: playerPos.y * TILE_SIZE }}>
          <div style={{
            width: TILE_SIZE,
            height: TILE_SIZE,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <img src={activeCharacter.src} alt={activeCharacter.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />

            {/* Currently Equipped Clothes — overlaid at full character size */}
            {equipped && (() => {
              const equippedItem = inventory.find(i => i.id === equipped);
              return equippedItem ? (
                <img
                  src={equippedItem.outfit.src}
                  alt={equippedItem.outfit.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                  }}
                />
              ) : null;
            })()}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'gameover' && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '400px' }}>
            <div style={{ fontSize: '4rem' }}>⌛</div>
            <h2 style={{ color: '#e63946', fontSize: '2rem' }}>Out of Time!</h2>
            <p style={{ color: '#555' }}>You ran out of time before finishing your mission.</p>
            <button className="button" style={{ background: '#e63946', fontSize: '1.1rem', padding: '14px 30px' }} onClick={restartGame}>
              ⏳ Try Again
            </button>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast">
            ⌛ {toast.message}
          </div>
        ))}
      </div>

      {activeModal === 'clothing' && pendingItem && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2>You found clothing!</h2>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <img
                src={pendingItem.outfit.src}
                alt={pendingItem.outfit.name}
                style={{ width: 120, height: 120, objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.2))', animation: 'float 2s infinite ease-in-out' }}
              />
            </div>
            <h3>{pendingItem.outfit.name}</h3>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="button" onClick={() => acceptClothing(true)}>Accept & Wear</button>
              <button className="button secondary" onClick={() => acceptClothing(false)}>Put in Closet</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'closet' && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Your Closet</h2>
              <button className="button secondary" style={{ padding: '5px 10px' }} onClick={() => setActiveModal(null)}><X size={20} /></button>
            </div>
            {inventory.length === 0 ? (
              <p style={{ padding: '40px', color: '#666' }}>Your closet is empty. Explore to find clothes!</p>
            ) : (
              <div className="closet-grid">
                {inventory.map(item => (
                  <div
                    key={item.id}
                    className={`closet-item ${equipped === item.id ? 'equipped' : ''}`}
                    onClick={() => setEquipped(item.id)}
                  >
                    <img src={item.outfit.src} alt={item.outfit.name} style={{ width: 56, height: 56, objectFit: 'contain', margin: '0 auto', display: 'block' }} />
                    <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>{item.outfit.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeModal === 'map' && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Fast Travel</h2>
              <button className="button secondary" style={{ padding: '5px 10px' }} onClick={() => setActiveModal(null)}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.values(MAPS).map(m => (
                <button
                  key={m.id}
                  className={`button ${currentMapId === m.id ? 'secondary' : ''}`}
                  onClick={() => changeMap(m.id)}
                  disabled={currentMapId === m.id}
                >
                  {m.name} {currentMapId === m.id && '(Current)'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'shop' && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag color="#9d4edd" /> Village Shop
              </h2>
              <button className="button secondary" style={{ padding: '5px 10px' }} onClick={() => setActiveModal(null)}><X size={20} /></button>
            </div>
            <p>Buy exclusive outfits with your collected diamonds!</p>
            <div className="closet-grid">
              {SHOP_ITEMS.map(item => {
                const owned = inventory.some(i => i.id === item.id);
                const canAfford = diamonds >= item.price;
                return (
                  <div key={item.id} className="closet-item" style={{ opacity: owned ? 0.5 : 1 }}>
                    <img src={item.outfit.src} alt={item.outfit.name} style={{ width: 56, height: 56, objectFit: 'contain', margin: '0 auto', display: 'block' }} />
                    <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>{item.outfit.name}</div>
                    <div style={{ marginTop: '10px' }}>
                      {owned ? (
                        <span style={{ color: '#4ecdc4', fontWeight: 'bold' }}>Owned</span>
                      ) : (
                        <button
                          className="button"
                          style={{ padding: '5px 10px', width: '100%', background: canAfford ? '#ffb703' : '#ccc' }}
                          onClick={() => buyItem(item)}
                          disabled={!canAfford}
                        >
                          <Diamond size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} />
                          {item.price}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'characters' && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Select Character</h2>
              <button className="button secondary" style={{ padding: '5px 10px' }} onClick={() => setActiveModal(null)}><X size={20} /></button>
            </div>
            <div className="closet-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
              {CHARACTERS.map(char => (
                <div
                  key={char.id}
                  className={`closet-item ${activeCharacter.id === char.id ? 'equipped' : ''}`}
                  onClick={() => { setActiveCharacter(char); setActiveModal(null); }}
                >
                  <img src={char.src} alt={char.name} style={{ width: '60px', height: '60px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />
                  <div style={{ fontSize: '0.9rem', marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>{char.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'possessions' && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Your Possessions</h2>
              <button className="button secondary" style={{ padding: '5px 10px' }} onClick={() => setActiveModal(null)}><X size={20} /></button>
            </div>
            {possessions.length === 0 ? (
              <p style={{ padding: '40px', color: '#666' }}>You have no possessions yet. Explore the map to find some!</p>
            ) : (
              <div className="closet-grid">
                {possessions.map(item => (
                  <div key={item.id} className="closet-item">
                    <img src={item.src} alt={item.label} style={{ width: 56, height: 56, objectFit: 'contain', margin: '0 auto', display: 'block' }} />
                    <div style={{ fontSize: '0.9rem', marginTop: '10px', textAlign: 'center' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeModal === 'missioncomplete' && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '400px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center' }}>⭐</div>
            <h2 style={{ color: '#ffb703', fontSize: '2rem', textAlign: 'center' }}>Mission Complete!</h2>
            <p style={{ color: '#555', textAlign: 'center' }}>You've successfully completed the area mission!</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button className="button" style={{ background: '#4ecdc4', fontSize: '1.1rem', padding: '14px 30px' }} onClick={() => {
                setActiveModal(null);
                if (mapData.mission && mapData.mission.next_map) {
                  changeMap(mapData.mission.next_map);
                }
              }}>
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'mission_splash' && mapData.mission && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '500px' }}>
            <h2 style={{ color: '#4ecdc4', fontSize: '2rem' }}>Area Mission!</h2>
            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>{mapData.mission.description}</p>
            <div style={{ textAlign: 'left', marginBottom: '20px', background: 'rgba(0,0,0,0.1)', padding: '15px', borderRadius: '10px' }}>
              <strong>Objectives:</strong>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                <li>👗 Wear: {mapData.mission.outfit.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</li>
                <li>🎒 Find: {mapData.mission.items.map(i => i.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(', ')}</li>
                <li>📍 Reach: Target Location</li>
              </ul>
            </div>
            <button className="button" style={{ background: '#4ecdc4', width: '100%', padding: '15px', fontSize: '1.2rem' }} onClick={() => setActiveModal(null)}>
              Start!
            </button>
          </div>
        </div>
      )}

      {/* Mobile D-Pad Overlay */}
      <div className="d-pad-container pointer-events-auto">
        <button className="d-pad-btn up" onPointerDown={(e) => { e.preventDefault(); handleKeyDown({ key: 'ArrowUp' }); }}><ArrowUp size={32} /></button>
        <button className="d-pad-btn left" onPointerDown={(e) => { e.preventDefault(); handleKeyDown({ key: 'ArrowLeft' }); }}><ArrowLeft size={32} /></button>
        <button className="d-pad-btn right" onPointerDown={(e) => { e.preventDefault(); handleKeyDown({ key: 'ArrowRight' }); }}><ArrowRight size={32} /></button>
        <button className="d-pad-btn down" onPointerDown={(e) => { e.preventDefault(); handleKeyDown({ key: 'ArrowDown' }); }}><ArrowDown size={32} /></button>
      </div>
    </div>
  );
}

export default App;
