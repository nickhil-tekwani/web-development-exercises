const calculateGrades = require("./index");

test("calculateGrades returns 0 when no parameter is sent", () => {
  expect(calculateGrades()).toBe(0);
});

test("calculateGrades returns null when any grade is out of range", () => {
  expect(calculateGrades(100, 300, 100, 100)).toBe(null);
  expect(calculateGrades(100, 0, 100, -7)).toBe(null);
  expect(calculateGrades(1000, 44, 3, 4)).toBe(null);
});

test("calculateGrades calculates grades correctly based on the formula", () => {
  expect(calculateGrades(50, 70, 80, 60)).toBe(66);
  expect(calculateGrades(100, 100, 100, 100)).toBe(100);
});
