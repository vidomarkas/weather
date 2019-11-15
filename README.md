# Weather application made with React

Visit the ongoing project on https://weather-vidomarkas.netlify.com/

## My Objectives
Learn how to implement:<br />
* react hooks
* context API 

Consolidate knowledge in:
* Asynchronous javascript
* Handling REST APIs
* Using local storage

## Challenges faced
* Implementing react hooks

   * Learning how to use useEffect properly to replace lifecycle methods
   * Learning how to update state with useState, which does not automatically merge with the previous state, but overwrites it (using spread operator)
* Navigation between dynamically created location components
* Bad choice when selecting how to structure data in the location context file. Refactored context, app and location components.
 * Implemented react router to switch between the locations. Decided to go with react carousel and locations list where locations would be rendered all at once. This avoids the location being rendered each time when it is opened.


### `Checklist`

- [ ] Remove added location
- [ ] Implement Local storage
- [ ] Add animations
- [ ] Ability to change measure units
- [ ] Dots representing locations, current highlighted
- [ ] Transform to PWA
- [X] Get IP location
- [X] Get current weather and forecast from weatherbit API
- [X] Create a list of weekdays
- [X] Apply dynamic weather icons
- [X] Change background depending on time of day
- [X] Implement react router to switch between the locations
- [X] Create a dropdown suggestion list when searching for location with Algolia autocomplete
- [X] Increase accuracy of location with geolocation using web API
- [X] loading screen and spinner
- [X] Hide API keys with environmental variables


