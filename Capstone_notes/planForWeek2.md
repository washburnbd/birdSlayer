### Tasks:
Plan out UI
React Router
Fetch API
Images and Animations
Create HUD

### Components:
- Login (Home Page)
- Register (Linked to Login)
- View Players
- Start game with selected player
- Game Interface (Non Combat)
    - Buttons:
        1. Button to begin combat
        2. Button to access inventory
        3. Button to examine room
        4. Button to go to next room
        5. Button to save and quit (logs out user and returns them to login screen)
        - Button to loot does not work unless enemy is defeated (check if room is cleared)
        - Button to go to next room does not work unless enemy is defeated 
    - Displayed:
        - Health (show current hp out of max hp)
        - Equipped weapon (show weapon damage and base damage)
        - equipped armor (show armor defense and base defense) 
- Game Interface (Combat)
    - Buttons:
        1. Button to attack
        2. Button to defend
        3. Button to access inventory
        4. Button to save and quit
    - Displayed:
        - Health (show current hp out of max hp)
        - Enemy Health (current hp out of max hp)
        - Equipped weapon (show weapon damage and base damage)
        - equipped armor (show armor defense and base defense) 
    - Response: 
        - Enemy attacks
        - Enemy defends
- Inventory Screen
    - Buttons:
        - View weapons (view state)
            - displays all weapons with buttons next to them to equip
            - equipped weapon is already denoted and does not have a button
        - View armor (view state)
            - displays all armor with buttons next to them to equip
            - equipped armor is already denoted and does not have a button
- Examine Room
    - Gives player a description of room (lore interaction)
    - Displays loot and give the option to pick up (won't work is room is not cleared)
- Defeat Screen
    - Option to view player or option to start over (need to add method to reset player in api)
- Victory Screen
    - Display stats, option to view players or option to start over (updates boss slain to true)


### Timeline:

Monday:Login
- set up greensock components for hero and enemy (Daniel)
- setting up login and view players
- make all the components and make a screen for each so we can see successful navigation (needs to be done first)
- auth handler (auth context, must be doen before login)
- set up react router
    - when you install react rounter "npm install react-router-dom 5"
- creating sprite images
- begin setting up fetch api (only focus on login for today?)

Tuesday:
- set up the rest of the fetch api
- connect fetch api to components

Wednesday:
- 

Thursday:
Have everything ready to present to James

Friday:
Present