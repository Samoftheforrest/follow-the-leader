# Minefield Memory
- Add Am I responsive image here once design is complete

## Goal For This Project

Welcome to Minefield Memory!

Trapped behind enemy lines, with a set of trecherous minefields ahead, how many of your comrades will you be able to save? Follow your captain, the ironically named Sgt M. Field to safety.

## Table of Contents
- Add this in once README is complete.

## UX/UI

### User Goals
- Website needs to be visually appealing.
- Ability to track your score as the game progresses.
- Ability to select difficulty, to choose the appropriate level of challenge.
- Once difficulty has been selected, difficulty then increments when each round is completed.
- Website needs to be functional on various devices (e.g. mobile, tablet and desktop).

### User Stories
- As a user, I should be able to play the game on both mobile and desktop devices.
- As a user, I would expect the game to have an appealing aesthetic that is appropriate for the game's concept.
- As a user, I would like to be able to select the game's difficulty.
- As a user, I would like the game's difficulty to increase slightly as the game progresses - to keep it engaging.
- As a user, I would like to be able to check the rules at any time during the game.
- As a user, I would like to be able to play the game using either using a keyboard or mouse/mobile clicks.
- As a user, I would like to be able to track my score as the game progresses.
- As a user, I would like to be able to contact the game's creator in order to provide feedback.

### Site Owner's Goals
- I would like to create a game that users find engaging.
- I wanted to create a game with features not usually found in standard memory games.
- I want users to be able to easily give feedback on the game - allowing me to revise the game and improve the user experience.
- I would like to create a game that is visually appealing.

### User Requirements and Expectations

#### Requirements
- Should be visually appealing
- Should be easily navigable - using either keyboard, mouse, or thumb click on mobile
- To track the user's score
- The ability for the user to select a difficulty
- To be able to change difficulty at any time

#### Expectations
- When a difficulty is selected, an appropriately difficult minefield should appear
- The user should only be able to move one sqaure at a time
- A tally of the score on screen for the user to keep track of
- The ability to return to the start of the game, and select a new difficulty using the 'home' link in the navigation
- That the rules modal appears when 'rules' is selected from the nav

### Design Choices

#### Colours
For this project - I chose a pre-made colour pallete from [Coolors](https://coolors.co/). I decided upon a simple, predominantly green, chromatic colour scheme because I believed that the simplicity was appropriate for the game's simple nature. I also thought that shades of green would be appropriate for a game based on minefields, as the colour is often associated with military uniform.

Below, I will go explain the individual colours' uses more carefully.

![Colour palette](/docs/colour-palette.png)

- `#1f242180`: As this colour is the darkest, I decided to use it mainly to outline, or as box shadow - note: the '80' on the end of this hex code sets the opacity of this colour to 50%.
- `#216869`: This colour was used as the main background of the page, as I felt that the other colours would stand out well against it.
- `#49a078`: I used this colour as the background for the following elements: the header, the game board container, and the social icons section.
- `#9cc5a1`: I used this colour as the background for only the game board's squares. I thought it would be appropriate to give the squares a unique colour to pull the user's attention toward them. 
- `#dce1de`: I used this colour for all of the text, as it provided the most contrast with the background.

#### Fonts
I used [Google Fonts](https://fonts.google.com/) to select the page's fonts. I used [Harmattan](https://fonts.google.com/specimen/Harmattan?query=harmat), in two different weights, for all of the game's text, as I thought it was inkeeping with the simple aesthetic.

### Wireframes

#### Desktop Wireframes
- [Home screen](docs/wireframes/desktop-home.png)
- [Game screen (easy)](docs/wireframes/desktop-easy-mode.png)
- [Game screen (medium)](docs/wireframes/desktop-medium-mode.png)
- [Game screen (hard)](docs/wireframes/desktop-hard-mode.png)
- [Game over screen](docs/wireframes/desktop-game-over.png)
- [Rules modal](docs/wireframes/desktop-rules.png)

#### Tablet Wireframes
- [Home screen](docs/wireframes/tablet-home.png)
- [Game screen](docs/wireframes/tablet-game-screen.png)
- [Game over](docs/wireframes/tablet-game-over.png)
- [Rules modal](docs/wireframes/tablet-rules.png)

#### Mobile Wireframes
- [Home screen](docs/wireframes/mobile-home.png)
- [Game screen](docs/wireframes/mobile-game-screen.png)
- [Game over](docs/wireframes/mobile-game-over.png)
- [Rules modal](docs/wireframes/mobile-rules.png)

### UX/UI Flowchart
- [UX/UI Flowchart](docs/uxui/flowchart/minefield-memory-uxui-flowchart.png)

## Features

### Existing Features
- The ability to move using either keyboard or mouse (or thumb clicks on mobile devices)
- Ability to choose between three difficulty levels: easy, medium and hard
- Randomised paths through the minefield - meaning no two games are the same!
- The ability to provide feedback via social media (through links)
- Check the rules/how to play the game at any time by opening up the rules modal

### Features to be Implemented

**Hint**
- Add in a "hint" that checks whether the square right of, or below the player, has the "path" class on it, and changes the colour of the square to let the player know it is safe to walk on.

**Minesweeper Mode**
- Add in a version of the game in which there is no leader! As the player steps through the minefield, they have to hover their mouse over the surrounding squares to detect mines.
    - Add a note about how this would have to be a desktop only game because you cannot hover on smaller screen sizes.

**Multiplayer Mode**
- A version of the game in which one player is the "leader" - this player goes first and creates the path. Then, the second player has to copy the path exactly.

**Time-trial Mode**
- A version of the game which the user has to race against the clock to complete as many runs through the minefield as possible.

**Save High Scores**
- Allow users to save their highest score, and have an additional page in which displays a leaderboard of the highest scores of all players.

## Technologies Used

### Languages
- [HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Frameworks
- [Bootstrap](https://getbootstrap.com/)

### Design
- [Figma](https://www.figma.com)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

## Testing

### Test Name
**As a user, I should be able to play the game on both mobile and desktop devices.**
- **Plan**

- **Implementation**

- **Test**

- **Result**

- **Verdict**

### Test Name
**As a user, I would expect the game to have an appealing aesthetic that is appropriate for the game's concept.**
- **Plan**

- **Implementation**

- **Test**

- **Result**

- **Verdict**

### Test Name
**As a user, I would like to be able to select the game's difficulty.**
- **Plan**

- **Implementation**

- **Test**

- **Result**

- **Verdict**

### Test Name
**As a user, I would like the game's difficulty to increase slightly as the game progresses - to keep it engaging.**
- **Plan**

- **Implementation**

- **Test**

- **Result**

- **Verdict**

### Test Name
**As a user, I would like to be able to check the rules at any time during the game.**
- **Plan**

- **Implementation**

- **Test**

- **Result**

- **Verdict**

### Test Name
**As a user, I would like to be able to play the game using either using a keyboard or mouse/mobile clicks.**
- **Plan**

- **Implementation**

- **Test**

- **Result**

- **Verdict**

### Test Name
**As a user, I would like to be able to track my score as the game progresses.**
- **Plan**

- **Implementation**

- **Test**

- **Result**

- **Verdict**

### Test Name
**As a user, I would like to be able to contact the game's creator in order to provide feedback.**
- **Plan**

- **Implementation**

- **Test**

- **Result**

- **Verdict**

## Bugs

### Example Bug

## Deployment

### Local Development
- 

### Deployment

## Credits

### General Thanks