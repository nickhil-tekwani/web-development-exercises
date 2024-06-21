# week-3-javascript

- run `npm install` in your terminal
- update the function found in `index.js` called `calculateGrades` so that it calculates the grades based on the following rules:
  - function takes 4 parameters (quiz, assigment1, assigment2, assigment3)
  - each parameter is defaulted to 0
  - return `null` if any parameter if out of range (0-100). For example if quiz = 200 that is an invalid grade so it should return null. Only grades from 0 to 100 are valid.
  - calculate grade based on the following formula: `quiz * 15% + assigment1 * 15% + assigment2 * 30% + assigment3 * 40%`
- test if your code is correct by running the following command in your terminal `npm test`
