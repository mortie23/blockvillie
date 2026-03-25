import schoolUniform from './school-uniform.png';
import yellowPyjamas from './yellow-pyjamas.png';

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
};

