import diamond from './diamond.mp3';
import cardFlip from './card-flip.mp3';
import chessMove from './chess-move.mp3';
import outfit from './outfit.mp3';
import phoneVibrating from './phone-vibrating.mp3';
import fail from './fail.mp3';
import collectGeneric from './collect-generic.mp3';
import bumpEnemy from './bump-enemy.mp3';

// Add all sounds to this registry.
// To support arbitrary generic sound keys in configurations
// before you have the asset, simply leave the `src` as null.
export const SOUND_EFFECTS = {
  'diamond': { src: diamond, volume: 0.8 },
  'card-flip': { src: cardFlip, volume: 1.0 },
  'chess-move': { src: chessMove, volume: 1.0 },
  'outfit': { src: outfit, volume: 1.0 },
  'phone-vibrating': { src: phoneVibrating, volume: 1.0 },
  'fail': { src: fail, volume: 1.0 },
  'collect-generic': { src: collectGeneric, volume: 0.8 },
  'bump-enemy': { src: bumpEnemy, volume: 0.6 },
};

let isMuted = false;

export function setMuted(muted) {
  isMuted = muted;
}

/**
 * Utility to consistently play sounds triggered from gameplay interactions.
 * Safely handles missing assets and standardizes playback.
 */
export function playSound(soundKey) {
  if (isMuted) return;

  const soundDef = SOUND_EFFECTS[soundKey];

  // If the sound isn't in our registry or has no asset source, fail gracefully.
  if (!soundDef || !soundDef.src) {
    if (!soundDef) console.warn(`[playSound] Sound key "${soundKey}" not found in SOUND_EFFECTS.`);
    return;
  }

  // Use a new Audio instance to allow overlapping rapid playbacks (e.g., collecting 5 diamonds in a row)
  const audio = new Audio(soundDef.src);
  audio.volume = soundDef.volume !== undefined ? soundDef.volume : 1.0;

  // Play returns a promise, gracefully handle autoplay restrictions and missing file errors.
  audio.play().catch(err => {
    // We suppress NotAllowedError because this happens natively if a user
    // hasn't interacted with the document yet.
    if (err.name !== 'NotAllowedError') {
      console.warn(`[playSound] Failed to play audio "${soundKey}":`, err);
    }
  });
}
