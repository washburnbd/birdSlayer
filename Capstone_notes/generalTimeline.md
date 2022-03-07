### Timeline:

WEEK ONE:

- Monday:
    - db schemas 
    - models
    - start on mappers
- Tuesday:
    - finish mappers
    - make repos
    - test repos
- Wednesday:
    - start service creation
        - keep in mind dependencies on other repos
        - run tests for services
- Thursday:
    - finish services
    - start controllers
- Friday:
    - finish controllers
    - backend security
- Saturday/Sunday:
    - finish uncompleted tasks in backend, make sure game can be played via http requests
    - look into animations/suirtable art and greensock
    - start thinking about tasks for UI

WEEK TWO:

- Monday:
    - plan out the UI
    - start working on a html page to send http requests and get responses back
    - connect security with front end and set up login



## Tasks:

# API:

- db schema x
- models x
- mappers for models:
    - users
    - players
    - inventory
    - weapons
    - armor
    - room enemy
    - room
    - enemy
- repositories for:
    - gameUser
    - player
    - room
- tests for repositories
- services for:
    - gameService (runs game)
    - gameUserService (validates input, crud stuff)
- tests for services
- controllers for:
    - users (login)
    - players (modifying eq, room list and hp)
        - weapons mod here
        - armor mod here 
    - enemies (modify hp)
    - general game controller
        - send requests to get a randomly generated room
        - combat sequence in the room
            - send put/posts to deal damage/heal/etc
- tests?
- security (jwt)


# UI:
- Greensock and Art
- Login and register forms work with security

# Services Plan:
Controllers tell the service what to do and the service does it, so for example if a player attacks an enemy, the service determines the outcome of the attack and communicates to the repos what data needs to be changed.

- GameService:

# Controllers

- Login/User Management Controller


