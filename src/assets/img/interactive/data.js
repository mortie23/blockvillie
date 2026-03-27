import cat from './cat.png';
import key from './key.png';
import schoolBag from './school-bag.png';

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
};
