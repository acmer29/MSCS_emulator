# MSCS_emulator

author: [Tianyu Qi](https://www.linkedin.com/in/tianyu-q-477a25147/)

## Summary

A text-based, event-driven, and nodejs-typescript-implemented game.

## Objective

The idea of this simulation game came after I came across this [PHD Simulator](https://github.com/morriswmz/phd-game/tree/master/src). I found it would be quite fit to create a game presenting the life as an alien MSCS student in US via the similar machenism.

## Goals

 - Implement the game, simulate the MSCS student life in event preentation and option choices.
 - Implement a UI with reasonable cost (in term of engineering time).
 - Deploy the game in a public accessible host.

### No goals
 - Easy to be cleared in good ending, as my MSCS was not.

Wait a minute, I'm not intend to write a design doc...

## Requirement

To develop this project, the below-mentioned software is required.
 - nodejs: v18
 - npm: v9

For npm dependencies, please run `npm install` after the above requirements are met.

## Testing

### Export the changes to distribution version
```
npx webpack
```

### Run nodejs server locally
```
npm run dev
```
This will start the `nodemon` which will then monitor the file change in `/dist` directory.