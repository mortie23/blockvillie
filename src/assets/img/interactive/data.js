import cat from './cat.png';
import key from './key.png';
import schoolBag from './school-bag.png';
import unoBack from '../map/02/uno-back.png';
import unoGreen3 from '../map/02/uno-green-3.png';
import unoRed6 from '../map/02/uno-red-6.png';
import unoDraw4 from '../map/02/uno-draw-4.png';

export const INTERACTIVE_OBJECTS = {
  'cat': {
    id: 'cat',
    label: 'Mischievous Cat',
    width: 1,   // grid cells
    height: 1,
    src: cat,
    // seconds between each single-cell move (lower = faster)
    speed: 0.8,
    // time slots removed on contact
    damage: 1,
    // 'x' = patrol left/right, 'y' = patrol up/down
    axis: 'x',
    // toast message shown when player is hit
    hitMessage: 'Wasted time feeding Willow 🐱',
  },
  'key': {
    id: 'key',
    label: 'Key',
    width: 1,
    height: 1,
    src: key,
    speed: 0,
    damage: 0,
    canCollect: true,
    hitMessage: 'Picked up a key 🔑',
  },
  'school-bag': {
    id: 'school-bag',
    label: 'School Bag',
    width: 1,
    height: 1,
    src: schoolBag,
    speed: 0,
    damage: 0,
    canCollect: true,
    hitMessage: 'Picked up a school bag 🎒',
  },
  'chess-piece': {
    id: 'chess-piece',
    label: 'Chess Piece',
    width: 1,
    height: 1,
    src: null, // TODO: Replace with import once image is added
    speed: 0,
    damage: 0,
    canPush: true,
  },
  'playing-card': {
    id: 'playing-card',
    label: 'Playing Card',
    width: 1,
    height: 1,
    src: null, // TODO: Replace with import once image is added
    speed: 0,
    damage: 0,
    canTurnOver: true,
  },
  'chest': {
    id: 'chest',
    label: 'Chest',
    width: 1,
    height: 1,
    src: null, // TODO: Replace with import once image is added
    speed: 0,
    damage: 0,
    canOpenAndClose: true,
    requiresItem: 'key',
    containsItem: 'school-bag',
  },
  'uno-green-3': {
    id: 'uno-green-3',
    label: 'Green 3 Card',
    width: 1,
    height: 1,
    src: unoBack,
    turnedSrc: unoGreen3,
    speed: 0,
    damage: 0,
    canTurnOver: true,
    canCollect: true,
    hitMessage: 'Picked up a Green 3 card!',
  },
  'uno-red-6': {
    id: 'uno-red-6',
    label: 'Red 6 Card',
    width: 1,
    height: 1,
    src: unoBack,
    turnedSrc: unoRed6,
    speed: 0,
    damage: 0,
    canTurnOver: true,
    canCollect: true,
    hitMessage: 'Picked up a Red 6 card!',
  },
  'uno-draw-4': {
    id: 'uno-draw-4',
    label: 'Wild Draw 4 Card',
    width: 1,
    height: 1,
    src: unoBack,
    turnedSrc: unoDraw4,
    speed: 0,
    damage: 0,
    canTurnOver: true,
    canCollect: true,
    hitMessage: 'Picked up a Draw 4 card!',
  },
};
