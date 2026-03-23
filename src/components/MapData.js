// 0: Walkable path (Outdoor grass)
// 1: Wall/Block (unwalkable)
// 3: Indoor floor (Walkable beige tile)

import { MAP_01_OBJECTS } from '../assets/img/map/01/data';
import { MAP_02_OBJECTS } from '../assets/img/map/02/data';
import { MAP_03_OBJECTS } from '../assets/img/map/03/data';

export const MAPS = {
  playground: {
    id: "playground",
    name: "Blocky Playground",
    width: 15,
    height: 15,
    data: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,0,0,1,3,3,3,1,0],
      [0,0,0,0,0,0,0,0,0,1,3,3,3,1,0],
      [0,0,0,0,0,0,0,0,0,1,3,3,3,1,0],
      [0,0,0,0,0,0,0,0,0,1,1,3,1,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,0,0,0,1,1,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,3,3,3,3,3,3,3,3,3,1,0,0],
      [0,0,1,3,3,3,3,3,3,3,3,3,1,0,0],
      [0,0,1,3,3,3,3,3,3,3,3,3,1,0,0],
      [0,0,1,3,3,3,3,3,3,3,3,3,1,0,0],
      [0,0,1,3,3,3,3,3,3,3,3,3,1,0,0],
      [0,0,1,3,3,3,3,3,3,3,3,3,1,0,0],
      [0,0,1,3,3,3,3,3,3,3,3,3,1,0,0],
      [0,0,1,1,1,1,3,3,1,1,1,1,1,0,0],
      [0,0,0,0,0,0,3,3,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,0,1,1,1,1,1,1,0],
      [0,1,3,3,3,3,1,0,1,3,3,3,3,1,0],
      [0,1,3,3,3,3,1,0,1,3,3,3,3,1,0],
      [0,1,3,3,3,3,1,0,1,3,3,3,3,1,0],
      [0,1,3,3,3,3,1,0,1,3,3,3,3,1,0],
      [0,1,1,1,3,1,1,0,1,1,3,1,1,1,0],
      [0,0,0,0,3,0,0,0,0,0,3,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,3,3,3,3,3,3,3,3,3,3,3,1,0],
      [0,1,1,1,1,1,1,3,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,3,0,0,0,0,0,0,0],
    ],
    startX: 7,
    startY: 7,
    objects: [
      { type: MAP_03_OBJECTS['shops-bin'], x: 2, y: 8 },
      { type: MAP_03_OBJECTS['shops-bin'], x: 12, y: 8 },
      { type: MAP_03_OBJECTS['shops-fountain'], x: 6, y: 9 },
    ]
  }
};
