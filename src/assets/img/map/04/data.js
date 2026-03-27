import circleDiningTableChairs from './circle-dining-table-chairs.png';
import eightSeaterDiningChairs from './eight-seater-dining-chairs.png';
import singleBed from './single-bed.png';
import doubleBed from './double-bed.png';
import threeSeaterCouch from './three-seater-couch.png';
import bookcase from './bookcase.png';
import tv from './tv.png';
import suv from './suv.png';
import kitchenSink from './kitchen-sink.png';
import toilet from './toilet.png';
import shower from './shower.png';

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
  'double-bed': {
    id: 'double-bed',
    map: 'suburban_house',
    location: 'inside',
    width: 2,
    height: 2,
    src: doubleBed,
  },
  'three-seater-couch': {
    id: 'three-seater-couch',
    map: 'suburban_house',
    location: 'inside',
    width: 2,
    height: 1,
    src: threeSeaterCouch,
  },
  'bookcase': {
    id: 'bookcase',
    map: 'suburban_house',
    location: 'inside',
    width: 2,
    height: 1,
    src: bookcase,
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
  },
  'kitchen-sink': {
    id: 'kitchen-sink',
    map: 'suburban_house',
    location: 'inside',
    width: 2,
    height: 1,
    src: kitchenSink,
  },
  'toilet': {
    id: 'toilet',
    map: 'suburban_house',
    location: 'inside',
    width: 1,
    height: 1,
    src: toilet,
  },
  'shower': {
    id: 'shower',
    map: 'suburban_house',
    location: 'inside',
    width: 1,
    height: 1,
    src: shower,
  }
};

export const MAP_04_DIAMONDS = [
  { id: 'dsh1', x: 4, y: 10 }, // left bedroom
  { id: 'dsh2', x: 21, y: 12 }, // main hall
  { id: 'dsh3', x: 28, y: 15 }, // right lounge
  { id: 'dsh4', x: 25, y: 17 }, // hallway
];
