const courseForm = document.querySelector(".course-form");
const courseList = document.querySelector(".courses-list");
const editButtons = document.querySelectorAll(".edit-course");
const deleteButtons = document.querySelectorAll(".delete-course");

const refreshAllcourses = () => {
  fetch("http://localhost:8000/courses")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((courses) => {
      const html = courses
        .map(
          (coursedata) =>
            `<li class="course">
            <span id="${coursedata.id}"> ${coursedata.name} 
        | <a href="#" onclick="alert('ID: ${coursedata.id} || NAME: ${coursedata.name} || DESCRIPTION: ${coursedata.desc}'); return false;">view details</a> 
        | <input class="input-desc" id="${coursedata.id + 'input'}" type="text" placeholder="new desc" /> -->
        <a href="#" id="${coursedata.id}" class="edit-course" onclick="editCourse(${coursedata.id}, '${coursedata.id}');">submit new desc</a>
        | <a href="#" id="${coursedata.id}" class="delete-course" onclick="deleteCourse(${coursedata.id}); refreshAllcourses();">delete course</a>
        </span>
              </li>`
        )
        .join("");

      courseList.innerHTML = html;
    });
};

const insertSinglecourse = (coursedata) => {
  const htmlElement = `<li class="course">
        <span id="${coursedata.id}"> ${coursedata.name} 
        | <a href="#" onclick="alert('ID: ${coursedata.id} || NAME: ${coursedata.name} || DESCRIPTION: ${coursedata.desc}'); return false;">view details</a> 
        | <input class="input-desc" id="${coursedata.id + 'input'}" type="text" placeholder="new desc" /> -->
        <a href="#" id="${coursedata.id}" class="edit-course" onclick="editCourse(${coursedata.id}, '${coursedata.id}');">submit new desc</a>
        | <a href="#" id="${coursedata.id}" class="delete-course" onclick="deleteCourse(${coursedata.id}); refreshAllcourses();">delete course</a>
        </span>
      </li>`;
  courseList.insertAdjacentHTML("afterbegin", htmlElement);
};

const deleteCourse = (id) => {
    console.log('deleting course ' + id)
    fetch(("http://localhost:8000/courses/" + id), { method: "DELETE"})
        .then((response) => {
            refreshAllcourses();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

const editCourse = (id) => {
    const newDesc = document.getElementById(id + "input").value
    console.log("updating course " + id + " with new description " + newDesc)

    const reqBody = {
        desc: newDesc,
      };
    
      fetch(("http://localhost:8000/courses/" + id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      })
        .then((response) => {
            console.log(response);
            refreshAllcourses();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    
}

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newcourse = {
    desc: e.currentTarget.coursedesc.value,
    coursename: e.currentTarget.coursename.value,
  };

  fetch("http://localhost:8000/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newcourse),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      e.target.reset();
      insertSinglecourse(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

refreshAllcourses();
