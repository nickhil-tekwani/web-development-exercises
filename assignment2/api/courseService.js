

// We are going to save in memory for now, in our next class we will save to a relational database
const db = {
    courses: [],
};



export const generateId = () => {
    return Math.floor(100000 + Math.random() * 900000)
};

export const getAllcourses = () => {
  return { courses: db.courses };
};

export const findcourseById = (courseId) => {
  return db.courses.find((t) => t.id.toString() === courseId);
};

export const createRes = (msg) => {
    const newres = {
        messageFromServer: msg
    }
    return newres;
}

export const createcourse = (desc, coursename) => {
  const newcourse = {
    id: generateId(),
    desc: desc,
    coursename: coursename,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  db.courses.push(newcourse);

  return newcourse;
};

export const updatecourse = (courseId, desc) => {
  let indexToUpdate = -1;

  const currentcourse = db.courses.find((t, i) => {
    indexToUpdate = i;
    return t.id.toString() === courseId;
  });

  if (currentcourse) {
    db.courses.splice(indexToUpdate, 1, {
      ...currentcourse,
      desc: desc,
      updatedAt: Date.now(),
    });

    return true;
  } else {
    return false;
  }
};

export const delCourse = (id) => {
  let indexToUpdate = -1;

  const currentcourse = db.courses.find((t, i) => {
    indexToUpdate = i;
    return t.id.toString() === id;
  });

  if (currentcourse) {
    db.courses.splice(indexToUpdate, 1);
    return true;
  } else {
    return false;
  }
}
