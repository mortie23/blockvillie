// 0: Walkable path (Outdoor grass)
// 1: Wall/Block (unwalkable)
// 3: Indoor floor (Walkable beige tile)
// 4: Outdoor paved (Walkable)

import { MAP_01_OBJECTS } from '../assets/img/map/01/data';
import { MAP_02_OBJECTS } from '../assets/img/map/02/data';
import { MAP_03_OBJECTS } from '../assets/img/map/03/data';
import { MAP_04_OBJECTS } from '../assets/img/map/04/data';

export const MAPS = {
  playground: {
    id: "playground",
    name: "Blocky Playground",
    width: 15,
    height: 15,
    data: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    startX: 7,
    startY: 7,
    objects: [
      { type: MAP_02_OBJECTS['playground-bush'], x: 2, y: 2 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 5, y: 4 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 6, y: 8 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 12, y: 9 },
      { type: MAP_02_OBJECTS['playground-dizzywizzy'], x: 4, y: 10 },
      { type: MAP_02_OBJECTS['playground-dizzywizzy'], x: 10, y: 12 },
    ]
  },
  school: {
    id: "school",
    name: "Heartlake School",
    width: 15,
    height: 15,
    data: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
      [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
      [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
      [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
      [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
      [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
      [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    startX: 7,
    startY: 14,
    objects: [
      { type: MAP_01_OBJECTS['school-chair'], x: 4, y: 4 },
      { type: MAP_01_OBJECTS['school-chair'], x: 7, y: 4 },
      { type: MAP_01_OBJECTS['school-chair'], x: 10, y: 4 },
      { type: MAP_01_OBJECTS['school-chair'], x: 4, y: 6 },
      { type: MAP_01_OBJECTS['school-chair'], x: 7, y: 6 },
      { type: MAP_01_OBJECTS['school-chair'], x: 10, y: 6 },
      { type: MAP_01_OBJECTS['school-swing'], x: 3, y: 12 },
      { type: MAP_01_OBJECTS['school-swing'], x: 9, y: 12 },
    ]
  },
  shops: {
    id: "shops",
    name: "Village Shops",
    width: 15,
    height: 15,
    data: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 1, 0],
      [0, 1, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 1, 0],
      [0, 1, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 1, 0],
      [0, 1, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 1, 0],
      [0, 1, 1, 1, 3, 1, 1, 0, 1, 1, 3, 1, 1, 1, 0],
      [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    ],
    startX: 7,
    startY: 7,
    objects: [
      { type: MAP_03_OBJECTS['shops-bin'], x: 2, y: 8 },
      { type: MAP_03_OBJECTS['shops-bin'], x: 12, y: 8 },
      { type: MAP_03_OBJECTS['shops-fountain'], x: 6, y: 9 },
    ]
  },

  suburban_house: {
    id: "suburban_house",
    name: "Mortimer House",
    width: 32,
    height: 24,
    data: [
      [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 4, 1, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 4, 3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 4, 4, 3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 4, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 4, 1, 3, 3, 1, 4, 4, 4, 1, 3, 3, 1, 3, 3, 1, 3, 1, 3, 1, 3, 3, 3, 1, 3, 3, 1, 3, 3, 3, 1, 0],
      [4, 1, 3, 3, 3, 3, 3, 4, 4, 1, 3, 3, 1, 3, 3, 1, 3, 1, 3, 1, 3, 3, 3, 1, 3, 3, 1, 3, 3, 3, 1, 0],
      [1, 3, 3, 3, 3, 3, 3, 1, 4, 1, 3, 3, 1, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 1, 3, 3, 3, 1, 0],
      [3, 3, 3, 3, 3, 3, 3, 1, 4, 1, 3, 1, 1, 3, 3, 1, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 1, 0],
      [3, 3, 3, 3, 3, 3, 1, 4, 4, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0],
      [3, 3, 3, 3, 3, 1, 4, 4, 4, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 0],
      [1, 3, 3, 3, 1, 4, 4, 4, 4, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 1, 3, 1, 3, 3, 3, 1, 0],
      [2, 1, 3, 1, 4, 4, 4, 4, 4, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 1, 3, 3, 3, 3, 3, 1, 0],
      [2, 2, 1, 4, 4, 4, 4, 4, 4, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 1, 3, 1, 3, 3, 3, 1, 0],
      [2, 2, 2, 0, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 0],
      [2, 2, 2, 2, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 3, 1, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    startX: 14, // Starting in Kylie bedroom
    startY: 16,
    objects: [
      /* front trees */
      { type: MAP_02_OBJECTS['playground-bush'], x: 15, y: 18 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 18, y: 18 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 21, y: 18 },
      /* back exit bushes */
      { type: MAP_02_OBJECTS['playground-bush'], x: 14, y: 2 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 15, y: 3 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 15, y: 4 },
      /* back hedge */
      { type: MAP_02_OBJECTS['playground-bush'], x: 25, y: 0 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 26, y: 0 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 27, y: 0 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 28, y: 0 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 29, y: 0 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 30, y: 0 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 31, y: 0 },
      /* bushed near garage */
      { type: MAP_02_OBJECTS['playground-bush'], x: 6, y: 2 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 7, y: 3 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 8, y: 4 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 7, y: 5 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 6, y: 6 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 5, y: 5 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 4, y: 4 },
      { type: MAP_02_OBJECTS['playground-bush'], x: 5, y: 3 },
      /* table */
      { type: MAP_04_OBJECTS['eight-seater-dining-chairs'], x: 28, y: 8 },
      /* girls beds */
      { type: MAP_04_OBJECTS['single-bed'], x: 14, y: 15 },
      { type: MAP_04_OBJECTS['single-bed'], x: 20, y: 15 },
      /* couch */
      { type: MAP_04_OBJECTS['three-seater-couch'], x: 27, y: 16 },
      /* tv */
      { type: MAP_04_OBJECTS['tv'], x: 27, y: 14 },
      /* SUV */
      { type: MAP_04_OBJECTS['suv'], x: 11, y: 20 },
    ]
  }
};
