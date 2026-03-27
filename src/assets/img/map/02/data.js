import bush from './playground-bush.png';
import dizzywizzy from './playground-dizzywizzy.png';

export const MAP_02_OBJECTS = {
  'playground-bush': {
    id: 'playground-bush',
    map: 'playground',
    location: 'outside',
    width: 1,
    height: 1,
    src: bush,
  },
  'playground-dizzywizzy': {
    id: 'playground-dizzywizzy',
    map: 'playground',
    location: 'outside',
    width: 2,
    height: 2,
    src: dizzywizzy,
  }
};

export const MAP_02_DIAMONDS = [
  { id: 'd1', x: 8, y: 5 },
  { id: 'd2', x: 13, y: 12 },
];
