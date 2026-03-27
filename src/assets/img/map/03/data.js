import bin from './shops-bin.png';
import fountain from './shops-fountain.png';

export const MAP_03_OBJECTS = {
  'shops-bin': {
    id: 'shops-bin',
    map: 'shops',
    location: 'outside',
    width: 1,
    height: 1,
    src: bin,
  },
  'shops-fountain': {
    id: 'shops-fountain',
    map: 'shops',
    location: 'outside',
    width: 2,
    height: 2,
    src: fountain,
  }
};

export const MAP_03_DIAMONDS = [
  { id: 'd5', x: 3, y: 8 },
  { id: 'd6', x: 12, y: 5 },
  { id: 'd7', x: 4, y: 13 },
];
