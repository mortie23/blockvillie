import circleDiningTableChairs from './circle-dining-table-chairs.png';
import eightSeaterDiningChairs from './eight-seater-dining-chairs.png';
import singleBed from './single-bed.png';
import threeSeaterCouch from './three-seater-couch.png';
import tv from './tv.png';
import suv from './suv.png';

export const MAP_04_OBJECTS = {
  'circle-dining-table-chairs': {
    id: 'circle-dining-table-chairs',
    map: 'suburban_house',
    location: 'inside',
    width: 1,
    height: 1,
    src: circleDiningTableChairs,
  },
  'eight-seater-dining-chairs': {
    id: 'eight-seater-dining-chairs',
    map: 'suburban_house',
    location: 'inside',
    width: 2,
    height: 4,
    src: eightSeaterDiningChairs,
  },
  'single-bed': {
    id: 'single-bed',
    map: 'suburban_house',
    location: 'inside',
    width: 1,
    height: 2,
    src: singleBed,
  },
  'three-seater-couch': {
    id: 'three-seater-couch',
    map: 'suburban_house',
    location: 'inside',
    width: 2,
    height: 1,
    src: threeSeaterCouch,
  },
  'tv': {
    id: 'tv',
    map: 'suburban_house',
    location: 'inside',
    width: 2,
    height: 1,
    src: tv,
  },
  'suv': {
    id: 'suv',
    map: 'suburban_house',
    location: 'outside',
    width: 4,
    height: 4,
    src: suv,
  }
};
