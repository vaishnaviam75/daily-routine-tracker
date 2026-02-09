const today = new Date();
const dateKey = today.toDateString();
document.getElementById("todayDate").innerText = dateKey;

const isWeekend = today.getDay() === 0 || today.getDay() === 6;

const tasks = isWeekend
  ? [
      { name: "Exercise", marks: 10 },
      { name: "Healthy Meal", marks: 10 },
      { name: "Skill Study (3 hrs)", marks: 30 },
      { name: "Job Apply", marks: 15 },
      { name: "English Practice", marks: 15 },
      { name: "Project Making", marks: 20 }
    ]
  : [
      { name: "Exercise", marks: 10 },
      { name: "Healthy Meal", marks: 10 },
      { name: "Internship (5 hrs)", marks: 30 },
      { name: "Job Apply", marks: 10 },
      { name: "English Practice", marks: 10 },
      { name: "Skill Study (2 hrs)", marks: 15 },
      { name: "Project Making", marks: 15 }
    ];

const taskList = document.getElementById("taskList");

tasks.forEach((t, i) => {
  taskList.innerHTML += `
    <div class="task">
      <span>${t.name} (+${t.marks})</span>
      <input type="checkbox" data-i="${i}">
    </div>
  `;
});

document.addEventListener("change", calculateScore);

function calculateScore() {
  let score = 0;
  document.querySelectorAll("[data-i]").forEach(cb => {
    if (cb.checked) score += tasks[cb.dataset.i].marks;
  });

  if (document.getElementById("junkFood").checked) score -= 5;
  score = Math.max(0, score);

  document.getElementById("scoreText").innerText = `Score: ${score} / 100`;
  document.getElementById("scoreImage").src =
    score >= 60 ? "images/happy.png" : "images/sad.png";

  return score;
}

function saveToday() {
  const data = {
    date: dateKey,
    score: calculateScore(),
    tasks: []
  };

  document.querySelectorAll("[data-i]").forEach(cb => {
    const i = cb.dataset.i;
    data.tasks.push({
      name: tasks[i].name,
      done: cb.checked
    });
  });

  localStorage.setItem(dateKey, JSON.stringify(data));
  alert("Saved");
}

/* LOAD SAVED */
const saved = JSON.parse(localStorage.getItem(dateKey));
if (saved) {
  saved.tasks.forEach((t, i) => {
    document.querySelector(`[data-i="${i}"]`).checked = t.done;
  });
  calculateScore();
}
