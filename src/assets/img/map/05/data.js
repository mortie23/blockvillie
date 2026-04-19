import arcadeGame from './arcade-game.png';
import barrierChain from './barrier-chain.png';
import cinemaChair from './cinema-chair.png';
import cleaningTrolley from './cleaning-trolley.png';
import exit from './exit.png';
import icecream from './icecream.png';
import lobbyCouch from './lobby-couch.png';
import moviePoster from './movie-poster.png';
import popcornMachine from './popcorn-machine.png';
import popcorn from './popcorn.png';
import post from './post.png';
import waterDrink from './water-drink.png';
import movieScreen from './movie-screen.png';
import salesDesk from './sales-desk.png';

export const MAP_05_OBJECTS = {
    'arcade-game': { id: 'arcade-game', map: 'cimema', location: 'inside', width: 1, height: 2, src: arcadeGame },
    'barrier-chain': { id: 'barrier-chain', map: 'cimema', location: 'inside', width: 1, height: 1, src: barrierChain },
    'cinema-chair': { id: 'cinema-chair', map: 'cimema', location: 'inside', width: 1, height: 1, src: cinemaChair },
    'cleaning-trolley': { id: 'cleaning-trolley', map: 'cimema', location: 'inside', width: 1, height: 1, src: cleaningTrolley },
    'exit': { id: 'exit', map: 'cimema', location: 'inside', width: 1, height: 1, src: exit },
    'icecream': { id: 'icecream', map: 'cimema', location: 'inside', width: 1, height: 1, src: icecream },
    'lobby-couch': { id: 'lobby-couch', map: 'cimema', location: 'inside', width: 4, height: 2, src: lobbyCouch },
    'movie-poster': { id: 'movie-poster', map: 'cimema', location: 'inside', width: 1, height: 1, src: moviePoster },
    'popcorn-machine': { id: 'popcorn-machine', map: 'cimema', location: 'inside', width: 2, height: 2, src: popcornMachine },
    'popcorn': { id: 'popcorn', map: 'cimema', location: 'inside', width: 1, height: 1, src: popcorn },
    'post': { id: 'post', map: 'cimema', location: 'inside', width: 1, height: 1, src: post },
    'water-drink': { id: 'water-drink', map: 'cimema', location: 'inside', width: 1, height: 2, src: waterDrink },
    'movie-screen': { id: 'movie-screen', map: 'cimema', location: 'inside', width: 3, height: 17, src: movieScreen },
    'sales-desk': { id: 'sales-desk', map: 'cimema', location: 'inside', width: 3, height: 2, src: salesDesk },
};

export const MAP_05_DIAMONDS = [
    { id: 'dsh1', x: 4, y: 10 }, // left bedroom
    { id: 'dsh2', x: 21, y: 12 }, // main hall
    { id: 'dsh3', x: 28, y: 15 }, // right lounge
    { id: 'dsh4', x: 25, y: 17 }, // hallway
];