# Interactive Assets

Objects in this directory are interactive within the game.
There are multiple types of interactive objects:

## Collectibles

Objects that when the player is on the same tile, the object is collected and removed from the game and put into the players "possessions" for part of completing missions or levels.

Example: a key

## Moving Obstacles

Objects that move around the playing tiles, and if the player is on the same tile as the moving obstacle, the player has one of their three sand-timer health-points removed.

Example: a cat

## Pushing objects

Objects that can be pushed by the player, if the player is on and adjacent tile to the pushing object, the player can push the pushing object to an adjacent tile. The pushing object can only be pushed one tile at a time, and if the pushing object is pushed into a wall or another pushing object, the pushing object cannot be pushed any further.

Example: a chess peice

## Turn over objects

Objects that can be turned over by the player, if the player is on and adjacent tile to the turn over object, the player can turn over the turn over object to an adjacent tile. The turn over object can only be turned over once and cannot be turned back over.

Example: a playing card

## Opening and closing objects

Objects that can be opened and closed by the player, if the player is on and adjacent tile to the opening and closing object, the player can open and close the opening and closing object. The opening and closing object can be opened and closed multiple times. If the opening and closing object is opened, the player can collect the object inside the opening and closing object. If the opening and closing object is closed, the player cannot collect the object inside the opening and closing object. Sometimes the opening and closing object will require the player to have something in their "possessions" to open it.

Example: a chest that requires a key.

