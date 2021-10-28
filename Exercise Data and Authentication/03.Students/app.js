window.addEventListener("load", showStudents);
window.addEventListener("submit", createStudent);

async function showStudents() {
  let tbody = document.querySelector("#results > tbody");
  tbody.textContent = "";
  let responce = await fetch(
    "http://localhost:3030/jsonstore/collections/students"
  );
  let data = await responce.json();

  Object.values(data).forEach((x) => {
    let tr = document.createElement("tr");
    let tdFirstName = document.createElement("td");
    tdFirstName.textContent = x.firstName;
    let tdLastName = document.createElement("td");
    tdLastName.textContent = x.lastName;
    let tdFacultyNumber = document.createElement("td");
    tdFacultyNumber.textContent = x.facultyNumber;
    let tdGrade = document.createElement("td");
    tdGrade.textContent = x.grade;

    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdFacultyNumber);
    tr.appendChild(tdGrade);
    tbody.appendChild(tr);
  });
}

async function createStudent(e) {
  e.preventDefault();
  let formData = new FormData(e.target);

  let firstName = formData.get("firstName");
  let lastName = formData.get("lastName");
  let facultyNumber = formData.get("facultyNumber");
  let grade = Number(formData.get("grade"));

  let responce = await fetch(
    "http://localhost:3030/jsonstore/collections/students",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        facultyNumber,
        grade,
      }),
    }
  );

  e.target.reset();
  await showStudents();
}
