# Weather application made with React

Visit the project on https://weather-vidomarkas.netlify.com/

#### Youtube video link:

[![weather video link](https://img.youtube.com/vi/Tl0CYyrQ0HI/0.jpg)](https://www.youtube.com/watch?v=Tl0CYyrQ0HI)

## My Objectives

Learn how to implement:<br />

-   react hooks
-   context API

Consolidate knowledge in:

-   Asynchronous javascript
-   Handling REST APIs
-   Using local storage

## Challenges faced

-   Implementing react hooks

    -   Learning how to use useEffect properly to replace lifecycle methods
    -   Learning how to update state with useState, which does not automatically merge with the previous state, but overwrites it (using spread operator)

-   Navigation between dynamically created location components
-   Bad choice when selecting how to structure data in the location context file. Refactored context, app and location components.
-   Implemented react router to switch between the locations. Decided to go with react carousel and locations list where locations would be rendered all at once. This avoids the location being rendered each time when it is opened.

### `Checklist`

-   [x] Remove added location
-   [x] Implement Local storage
-   [ ] Add animations
-   [x] Ability to change measure units
-   [x] Dots representing locations, current highlighted
-   [ ] Transform to PWA
-   [x] Get IP location
-   [x] Get current weather and forecast from weatherbit API
-   [x] Create a list of weekdays
-   [x] Apply dynamic weather icons
-   [x] Change background depending on time of day
-   [x] Implement react router to switch between the locations
-   [x] Create a dropdown suggestion list when searching for location with Algolia autocomplete
-   [x] Increase accuracy of location with geolocation using web API
-   [x] loading screen and spinner
-   [x] Hide API keys with environmental variables

## How to use

In the project directory, run:

### `npm install`

Installs dependencies necessary to run the app.

### `npm start`

Runs the app in the development mode.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

test
