Order of requests:

SetUp:
0. create a login
1. login and retrieve a token
2. use that token and create a new player/view players of a user
3. create a room with the player in it
4. check the player has a weapon (if not equip one)
5. check that the player has armor (if not equip some)
6. Check an enemy spawns with health

PreCombat/During Combat (run before any combat decision) Double Checks:
1. fetch the player (is the player dead?)
2. fetch the room (is the room cleared?)

Combat:
1. Attack (get enemy move)
2. Defend (get enemy move)

PostCombat
1. PickUp any loot
2. Go to the next room -> generate a new room


