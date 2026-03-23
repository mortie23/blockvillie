import React, { useState, useEffect, useCallback } from 'react';
import { Shirt, Diamond, Sparkle, X, Map as MapIcon, ShoppingBag, Users } from 'lucide-react';
import { MAPS } from './components/MapData';
import { CHARACTERS } from './components/Characters';

const TILE_SIZE = 80;

// Initial spawned items (clothes and diamonds)
const INITIAL_ITEMS = {
  playground: [
    { id: 'c1', type: 'clothing', x: 2, y: 3, name: 'Cool Hoodie', color: '#ff6b6b' },
    { id: 'd1', type: 'diamond', x: 8, y: 5 },
    { id: 'd2', type: 'diamond', x: 13, y: 12 },
  ],
  school: [
    { id: 'c2', type: 'clothing', x: 5, y: 5, name: 'School Uniform', color: '#4ecdc4' },
    { id: 'd3', type: 'diamond', x: 10, y: 3 },
    { id: 'd4', type: 'diamond', x: 11, y: 8 },
  ],
  shops: [
    { id: 'd5', type: 'diamond', x: 3, y: 8 },
    { id: 'd6', type: 'diamond', x: 12, y: 5 },
    { id: 'd7', type: 'diamond', x: 4, y: 13 },
  ]
};

const SHOP_ITEMS = [
  { id: 's1', type: 'clothing', name: 'Princess Dress', color: '#f72585', price: 2 },
  { id: 's2', type: 'clothing', name: 'Ninja Suit', color: '#3a0ca3', price: 3 },
  { id: 's3', type: 'clothing', name: 'Space Helmet', color: '#4361ee', price: 5 },
];

function App() {
  const [currentMapId, setCurrentMapId] = useState('playground');
  const [playerPos, setPlayerPos] = useState({ x: MAPS['playground'].startX, y: MAPS['playground'].startY });
  
  // Game State
  const [diamonds, setDiamonds] = useState(0);
  const [inventory, setInventory] = useState([]); // Array of clothing objects
  const [equipped, setEquipped] = useState(null); // ID of equipped clothing
  const [worldItems, setWorldItems] = useState(INITIAL_ITEMS);
  const [activeCharacter, setActiveCharacter] = useState(CHARACTERS[0]);
  
  // Modals & UI
  const [activeModal, setActiveModal] = useState(null); // 'clothing', 'closet', 'shop', 'map'
  const [pendingItem, setPendingItem] = useState(null); // Item player just stood on

  // Current map data
  const mapData = MAPS[currentMapId];

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

    // Collision check (1=wall)
    const tileType = mapData.data[y][x];
    if (tileType !== 0 && tileType !== 3) return;

    // Static Object Collision
    const isStaticObject = (mapData.objects || []).some(obj => {
      const objW = obj.type.width || 1;
      const objH = obj.type.height || 1;
      return x >= obj.x && x < obj.x + objW &&
             y >= obj.y && y < obj.y + objH;
    });
    if (isStaticObject) return;

    // Move player
    setPlayerPos({ x, y });
  }, [playerPos, mapData, activeModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
  }, [playerPos, currentMapId, worldItems]);

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
    setActiveModal(null);
  };

  return (
    <div className="game-container">
      {/* Background UI Layer */}
      <div className="ui-layer">
        <div className="top-bar pointer-events-auto">
          <div className="glass-panel diamond-counter">
            <Diamond className="diamond-icon" fill="#ffb703" color="#ffb703" size={24} />
            {diamonds}
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="button secondary" onClick={() => setActiveModal('map')}>
              <MapIcon size={20} style={{marginRight: 8, verticalAlign: 'middle'}}/> Map
            </button>
            <button className="button" style={{background: '#4ecdc4', color: '#fff'}} onClick={() => setActiveModal('characters')}>
              <Users size={20} style={{marginRight: 8, verticalAlign: 'middle'}}/> Characters
            </button>
            <button className="button" onClick={() => setActiveModal('closet')}>
              <Shirt size={20} style={{marginRight: 8, verticalAlign: 'middle'}}/> Closet
            </button>
            <button className="button" style={{background: '#9d4edd'}} onClick={() => setActiveModal('shop')}>
              <ShoppingBag size={20} style={{marginRight: 8, verticalAlign: 'middle'}}/> Shop
            </button>
          </div>
        </div>
        
        <div className="map-title" style={{ alignSelf: 'center', fontSize: '2rem', fontWeight: 800, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)', pointerEvents: 'none', marginBottom: '20px' }}>
          {mapData.name}
        </div>
      </div>

      {/* Game Map Rendering */}
      <div className="game-world" style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: `translate(${-playerPos.x * TILE_SIZE - TILE_SIZE/2}px, ${-playerPos.y * TILE_SIZE - TILE_SIZE/2}px)`,
        transition: 'transform 0.15s linear'
      }}>
        <div className="map-grid" style={{ 
          width: mapData.width * TILE_SIZE, 
          height: mapData.height * TILE_SIZE,
          gridTemplateColumns: `repeat(${mapData.width}, ${TILE_SIZE}px)`,
          position: 'absolute',
          top: 0, left: 0
        }}>
          {mapData.data.flat().map((tile, i) => (
            <div key={i} className={`tile tile-${tile}`}></div>
          ))}
        </div>

        {/* Static Image Map Objects */}
        {(mapData.objects || []).map((obj, i) => (
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
        {(worldItems[currentMapId] || []).map((item) => (
          <div key={item.id} className="floating-item" style={{ left: item.x * TILE_SIZE, top: item.y * TILE_SIZE }}>
            {item.type === 'diamond' ? (
              <Diamond fill="#ffb703" color="#fb8500" size={48} className="diamond-icon" />
            ) : (
              <Shirt fill={item.color} color="#fff" size={56} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            )}
          </div>
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
            
            {/* Currently Equipped Clothes indication */}
            {equipped && (
              <div style={{
                position: 'absolute', 
                bottom: -16, 
                color: inventory.find(i => i.id === equipped)?.color || '#fff'
              }}>
                <Shirt size={44} fill="currentColor" color="rgba(0,0,0,0.2)"/>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'clothing' && pendingItem && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2>You found clothing!</h2>
            <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
              <Shirt size={80} fill={pendingItem.color} color="#fff" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.2))', animation: 'float 2s infinite ease-in-out' }} />
            </div>
            <h3>{pendingItem.name}</h3>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
              <button className="button" onClick={() => acceptClothing(true)}>Accept & Wear</button>
              <button className="button secondary" onClick={() => acceptClothing(false)}>Put in Closet</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'closet' && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{maxWidth: '600px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h2>Your Closet</h2>
              <button className="button secondary" style={{padding: '5px 10px'}} onClick={() => setActiveModal(null)}><X size={20}/></button>
            </div>
            {inventory.length === 0 ? (
              <p style={{padding: '40px', color: '#666'}}>Your closet is empty. Explore to find clothes!</p>
            ) : (
              <div className="closet-grid">
                {inventory.map(item => (
                  <div 
                    key={item.id} 
                    className={`closet-item ${equipped === item.id ? 'equipped' : ''}`}
                    onClick={() => setEquipped(item.id)}
                  >
                    <Shirt fill={item.color} color="#000" size={40} style={{margin: '0 auto', display: 'block'}} />
                    <div style={{fontSize: '0.9rem', marginTop: '10px'}}>{item.name}</div>
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
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h2>Fast Travel</h2>
              <button className="button secondary" style={{padding: '5px 10px'}} onClick={() => setActiveModal(null)}><X size={20}/></button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
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
          <div className="glass-panel modal-content" style={{maxWidth: '600px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h2 style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <ShoppingBag color="#9d4edd" /> Village Shop
              </h2>
              <button className="button secondary" style={{padding: '5px 10px'}} onClick={() => setActiveModal(null)}><X size={20}/></button>
            </div>
            <p>Buy exclusive outfits with your collected diamonds!</p>
            <div className="closet-grid">
              {SHOP_ITEMS.map(item => {
                const owned = inventory.some(i => i.id === item.id);
                const canAfford = diamonds >= item.price;
                return (
                  <div key={item.id} className="closet-item" style={{opacity: owned ? 0.5 : 1}}>
                    <Shirt fill={item.color} color="#000" size={40} style={{margin: '0 auto', display: 'block'}} />
                    <div style={{fontSize: '0.9rem', marginTop: '10px'}}>{item.name}</div>
                    <div style={{marginTop: '10px'}}>
                      {owned ? (
                        <span style={{color: '#4ecdc4', fontWeight: 'bold'}}>Owned</span>
                      ) : (
                        <button 
                          className="button" 
                          style={{padding: '5px 10px', width: '100%', background: canAfford ? '#ffb703' : '#ccc'}}
                          onClick={() => buyItem(item)}
                          disabled={!canAfford}
                        >
                          <Diamond size={14} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '4px'}}/>
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
          <div className="glass-panel modal-content" style={{maxWidth: '800px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h2>Select Character</h2>
              <button className="button secondary" style={{padding: '5px 10px'}} onClick={() => setActiveModal(null)}><X size={20}/></button>
            </div>
            <div className="closet-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))'}}>
              {CHARACTERS.map(char => (
                <div 
                  key={char.id} 
                  className={`closet-item ${activeCharacter.id === char.id ? 'equipped' : ''}`}
                  onClick={() => { setActiveCharacter(char); setActiveModal(null); }}
                >
                  <img src={char.src} alt={char.name} style={{ width: '60px', height: '60px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />
                  <div style={{fontSize: '0.9rem', marginTop: '10px', textAlign: 'center', fontWeight: 'bold'}}>{char.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
