import schoolUniform from './school-uniform.png';
import yellowPyjamas from './yellow-pyjamas.png';
import crows from './crows.png';
import redCrayon from './red-crayon.png';
import schoolSportUniform from './school-sport-uniform.png';
import blueyCostume from './bluey-costume.png';
import elsaCostume from './elsa-costume.png';

/**
 * Outfit descriptor — mirrors the MAP_XX_OBJECTS pattern.
 *
 * Fields:
 *   id     – unique key, matches filename stem
 *   name   – display name
 *   src    – imported PNG (same dimensions as character PNGs — overlaid on sprite)
 *   price  – 0 = world-drop only, >0 = purchasable in shop
 *   spawns – array of { map, x, y } world-drop locations (empty = shop-only)
 */
export const OUTFITS = {
  'school-uniform': {
    id: 'school-uniform',
    name: 'School Uniform',
    src: schoolUniform,
    price: 0,
    spawns: [
      { map: 'school', x: 5, y: 5 },
      { map: 'suburban_house', x: 16, y: 14 },
      { map: 'suburban_house', x: 18, y: 14 },
    ],
  },
  'yellow-pyjamas': {
    id: 'yellow-pyjamas',
    name: 'Yellow Pyjamas',
    src: yellowPyjamas,
    price: 3,
    spawns: [
      { map: 'suburban_house', x: 15, y: 14 },
    ],
  },
  'crows': {
    id: 'crows',
    name: 'Crows Guernsey',
    src: crows,
    price: 10,
    spawns: [
      { map: 'suburban_house', x: 10, y: 12 },
    ],
  },
  'red-crayon': {
    id: 'red-crayon',
    name: 'Red Crayon Suit',
    src: redCrayon,
    price: 15, // Price > 0
    spawns: [], // Empty spawns makes it appear in the Shop
  },
  'school-sport-uniform': {
    id: 'school-sport-uniform',
    name: 'School Sport Uniform',
    src: schoolSportUniform,
    price: 15, // Price > 0
    spawns: [], // Empty spawns makes it appear in the Shop
  },
  'bluey-costume': {
    id: 'bluey-costume',
    name: 'Bluey Costume',
    src: blueyCostume,
    price: 25, // Price > 0
    spawns: [], // Empty spawns makes it appear in the Shop
  },
  'elsa-costume': {
    id: 'elsa-costume',
    name: 'Elsa Costume',
    src: elsaCostume,
    price: 50, // Price > 0
    spawns: [], // Empty spawns makes it appear in the Shop
  },
};
