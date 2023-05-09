# Caerula Expedition

## What is it?

This is a small game based off of the popular mobile game "Arknights". That being said, all assets present in the game, such as the name and/or sprites used belong to Hypergryph.

## How does it work?

This is a side-scrolling shooter where there is a set time limit. Under this time limit, you have to get as many points as possible before the time runs out (or if you die instead).

Once you die, or the timer runs out, the score is set, and you can choose to submit your score to the leaderboard under an alias. The leaderboard itself shows the top 5 people with the highest score.

### Control Scheme

- WASD for movement
- Space to shoot

## Code Stack

p5.js - the main JavaScript library used to create the game

Vite - Code building tool that is very fast and highly recommended to any web developer

Prisma and PostgreSQL - PostgreSQL is the database of choice. It's used to house data on the leaderboard of the game. Prisma is used to bridge the connection between the application and the database
