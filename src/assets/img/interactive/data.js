import cat from './cat.png';
import key from './key.png';
import schoolBag from './school-bag.png';
import unoBack from '../map/02/uno-back.png';
import unoGreen3 from '../map/02/uno-green-3.png';
import unoRed6 from '../map/02/uno-red-6.png';
import unoDraw4 from '../map/02/uno-draw-4.png';
import chewingGum from '../map/02/chewing-gum.png';
import phone from '../map/02/phone.png';
import rubiksCube from '../map/02/rubiks-cube.png';
import violin from '../map/02/violin.png';
import treasureChest from '../map/02/treasure-chest.png';
import treasureChestOpen from '../map/02/treasure-chest-open.png';
import treasureChestKey from '../map/02/treasure-chest-key.png';
import basketBall from '../map/02/basket-ball.png';
import aflBall from '../map/02/afl-ball.png';
import chessWhiteKing from '../map/02/chess-white-king.png';
import chessWhiteQueen from '../map/02/chess-white-queen.png';
import chessWhiteKnight from '../map/02/chess-white-knight.png';
import chessWhitePawn from '../map/02/chess-white-pawn.png';
import chessBlackKing from '../map/02/chess-black-king.png';
import teacher from '../map/02/teacher.png';
import recorder from '../map/02/recorder.png';
import pencil from '../map/02/pencil.png';
import sharpener from '../map/02/sharpener.png';
import notebook from '../map/02/notebook.png';
import lostProperty from '../map/02/lost-property.png';
import lostPropertyOpen from '../map/02/lost-property-open.png';

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
  'chess-piece': {
    id: 'chess-piece',
    label: 'Chess Piece',
    width: 1,
    height: 1,
    src: null, // TODO: Replace with import once image is added
    speed: 0,
    damage: 0,
    canPush: true,
  },
  'playing-card': {
    id: 'playing-card',
    label: 'Playing Card',
    width: 1,
    height: 1,
    src: null, // TODO: Replace with import once image is added
    speed: 0,
    damage: 0,
    canTurnOver: true,
  },
  'chest': {
    id: 'chest',
    label: 'Treasure Chest',
    width: 1,
    height: 1,
    src: treasureChest,
    openSrc: treasureChestOpen,
    speed: 0,
    damage: 0,
    canOpenAndClose: true,
    requiresItem: 'treasure-chest-key',
    containsItem: 'rubiks-cube',
  },
  'lost-property': {
    id: 'lost-property',
    label: 'Lost Property',
    width: 2,
    height: 2,
    src: lostProperty,
    openSrc: lostPropertyOpen,
    speed: 0,
    damage: 0,
    canOpenAndClose: true,
    requiresItem: false,
    containsItems: [
      { id: 'notebook', type: 'interactive' },
      { id: 'school-sport-uniform', type: 'outfit' },
    ],
  },
  'uno-green-3': {
    id: 'uno-green-3',
    label: 'Green 3 Card',
    width: 1,
    height: 1,
    src: unoBack,
    turnedSrc: unoGreen3,
    speed: 0,
    damage: 0,
    canTurnOver: true,
    canCollect: true,
    hitMessage: 'Picked up a Green 3 card!',
  },
  'uno-red-6': {
    id: 'uno-red-6',
    label: 'Red 6 Card',
    width: 1,
    height: 1,
    src: unoBack,
    turnedSrc: unoRed6,
    speed: 0,
    damage: 0,
    canTurnOver: true,
    canCollect: true,
    hitMessage: 'Picked up a Red 6 card!',
  },
  'uno-draw-4': {
    id: 'uno-draw-4',
    label: 'Wild Draw 4 Card',
    width: 1,
    height: 1,
    src: unoBack,
    turnedSrc: unoDraw4,
    speed: 0,
    damage: 0,
    canTurnOver: true,
    canCollect: true,
    hitMessage: 'Picked up a Draw 4 card!',
  },
  'chewing-gum': {
    id: 'chewing-gum',
    label: 'Chewing Gum',
    width: 1, height: 1,
    src: chewingGum,
    speed: 0, damage: 0,
    canCollect: true,
    teleportOnCollect: {
      message: "You have been caught with chewing gum! Straight to a blue dot.",
      targetTileType: 9,
    },
    hitMessage: 'Picked up chewing gum!',
  },
  'phone': {
    id: 'phone',
    label: 'Phone',
    width: 1, height: 1,
    src: phone,
    speed: 0, damage: 0,
    canCollect: true,
    teleportOnCollect: {
      message: "You have been caught with a phone!\nGo straight to the a blue dot.",
      targetTileType: 9,
    },
    hitMessage: 'Picked up a phone!',
  },
  'rubiks-cube': {
    id: 'rubiks-cube',
    label: 'Rubik\'s Cube',
    width: 1, height: 1,
    src: rubiksCube,
    speed: 0, damage: 0,
    canCollect: true,
    hitMessage: 'Picked up a Rubik\'s Cube!',
  },
  'violin': {
    id: 'violin',
    label: 'Violin',
    width: 1, height: 1,
    src: violin,
    speed: 0, damage: 0,
    canCollect: true,
    hitMessage: 'Picked up a Violin! 🎻',
  },
  'treasure-chest-key': {
    id: 'treasure-chest-key',
    label: 'Treasure Key',
    width: 1, height: 1,
    src: treasureChestKey,
    speed: 0, damage: 0,
    canCollect: true,
    hitMessage: 'Picked up a Treasure Key!',
  },
  'basket-ball': {
    id: 'basket-ball',
    label: 'Basketball',
    width: 1, height: 1,
    src: basketBall,
    speed: 0, damage: 0,
    canPush: true,
  },
  'afl-ball': {
    id: 'afl-ball',
    label: 'AFL Ball',
    width: 1, height: 1,
    src: aflBall,
    speed: 0, damage: 0,
    canPush: true,
  },
  'chess-white-king': {
    id: 'chess-white-king',
    label: 'White King',
    width: 1, height: 1, src: chessWhiteKing, speed: 0, damage: 0, canPush: true,
  },
  'chess-white-queen': {
    id: 'chess-white-queen',
    label: 'White Queen',
    width: 1, height: 1, src: chessWhiteQueen, speed: 0, damage: 0, canPush: true,
  },
  'chess-white-knight': {
    id: 'chess-white-knight',
    label: 'White Knight',
    width: 1, height: 1, src: chessWhiteKnight, speed: 0, damage: 0, canPush: true,
  },
  'chess-white-pawn': {
    id: 'chess-white-pawn',
    label: 'White Pawn',
    width: 1, height: 1, src: chessWhitePawn, speed: 0, damage: 0, canPush: true,
  },
  'chess-black-king': {
    id: 'chess-black-king',
    label: 'Black King',
    width: 1, height: 1, src: chessBlackKing, speed: 0, damage: 0, canPush: true,
  },
  'teacher': {
    id: 'teacher',
    label: 'Teacher',
    width: 1, height: 1,
    src: teacher,
    speed: 1.2,
    damage: 1,
    axis: 'random',
    hitMessage: 'You bumped into a teacher! 📚',
  },
  'recorder': {
    id: 'recorder',
    label: 'Recorder',
    width: 1, height: 1,
    src: recorder,
    speed: 0, damage: 0,
    canCollect: true,
    hitMessage: 'Picked up a Recorder! 🎵',
  },
  'pencil': {
    id: 'pencil',
    label: 'Pencil',
    width: 1, height: 1,
    src: pencil,
    speed: 0, damage: 0,
    canCollect: true,
    hitMessage: 'Picked up a Pencil! ✏️',
  },
  'sharpener': {
    id: 'sharpener',
    label: 'Sharpener',
    width: 1, height: 1,
    src: sharpener,
    speed: 0, damage: 0,
    canCollect: true,
    hitMessage: 'Picked up a Sharpener!',
  },
  'notebook': {
    id: 'notebook',
    label: 'Notebook',
    width: 1, height: 1,
    src: notebook,
    speed: 0, damage: 0,
    canCollect: true,
    hitMessage: 'Picked up a Notebook! 📓',
  },
};
