import schoolChair from './school-chair.png';
import schoolSwing from './school-swing.png';

export const MAP_01_OBJECTS = {
  'school-chair': {
    id: 'school-chair',
    map: 'school',
    location: 'classroom',
    width: 1, // in cells
    height: 1,
    src: schoolChair,
  },
  'school-swing': {
    id: 'school-swing',
    map: 'school',
    location: 'outside',
    width: 2,
    height: 2,
    src: schoolSwing,
  }
};