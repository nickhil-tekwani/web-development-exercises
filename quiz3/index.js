function checkRange(score) {
  return(score < 0 || score > 100);
}

function calculateGrades(quiz = 0, assignment1 = 0, assignment2 = 0, assignment3 = 0) {
  if (checkRange(quiz) || checkRange(assignment1) || checkRange(assignment2) || checkRange(assignment3)) {
    return null;  
  }

  finalScore = (quiz * .15) + (assignment1 * .15) + (assignment2 * .3) + (assignment3 * .4)
  return finalScore;
}

// Do not make changes below this line
module.exports = calculateGrades;
