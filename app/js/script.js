// Додаємо прогрес-бару анімацію (буде застосовуватися CSS)
document.querySelectorAll(".skill").forEach((skill) => {
  const progress = skill.querySelector(".progress");
  const width = progress.style.width; // Наприклад, "80%"

  // Після завантаження сторінки задаємо початкову ширину 0 для анімації
  progress.style.width = "0";

  // Використовуємо setTimeout, щоб відтворити анімацію прогресу
  setTimeout(() => {
    progress.style.width = width; // Відновлюємо ширину
  }, 100); // Затримка для початку анімації
});

// Додаємо анімацію видимості для кожного елемента
document.addEventListener("DOMContentLoaded", function () {
  const skills = document.querySelectorAll(".skill");

  skills.forEach((skill, index) => {
    setTimeout(() => {
      skill.classList.add("visible"); // Додаємо клас видимості для анімації
    }, index * 300); // Затримка для кожного елемента
  });
});

// // Для блоку, який відкривається/закривається
// const btnRoll = document.getElementsByClassName("roll");
// const blockRoll = document.getElementsByClassName("roll-block");
// document.addEventListener("DOMContentLoaded", function () {
//   const progressBars = document.querySelectorAll(".progress");
//   progressBars.forEach((progressBar) => {
//     const width = progressBar.style.width; // Отримуємо задану ширину
//     progressBar.style.width = "0"; // Задаємо початкову ширину 0
//     setTimeout(() => {
//       progressBar.style.width = width; // Відновлюємо ширину для анімації
//     }, 100); // Затримка для початку анімації
//   });
// });
const btnRoll = document.getElementsByClassName("roll");
const blockRoll = document.getElementsByClassName("roll-block");
Array.from(btnRoll).forEach((btn, index) => {
  btn.addEventListener("click", () => showOrHide(blockRoll[index]));
});
function showOrHide(block) {
  if (block.style.maxHeight) {
    block.style.maxHeight = null;
  } else {
    block.style.maxHeight = "300vh";
  }
}



async function getData() {
  try {
    const response = await fetch("http://localhost:8080/data/data.json",{cache: "no-store"});
    if (!response.ok) {
      throw new Error("Помилка при завантаженні даних");
    }
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.error("Помилка при завантаженні даних:", error);
    alert("Сталася помилка при завантаженні даних");
  }
}
// Функція для рендеру даних на сторінці
function renderData(data) {
  renderSkills(data.skills);
  renderHobbies(data.hobbies);
  renderLanguages(data.languages);
}

// Функція для відображення навичок
function renderSkills(skills) {
  const container = document.getElementById("skills-container");

  skills.forEach((skill) => {
    const skillDiv = document.createElement("div");
    skillDiv.classList.add("skill");

    // Додаємо HTML-структуру прогрес-бару
    skillDiv.innerHTML = `
      <h3>${skill.name}</h3>
      <div class="progress-bar">
        <div class="progress" style="width: 0;"></div> 
      </div>
    `;

    // Додаємо елемент в контейнер
    container.appendChild(skillDiv);

    // Плавно змінюємо ширину прогрес-бару
    const progressBar = skillDiv.querySelector(".progress");
    setTimeout(() => {
      progressBar.style.width = `${skill.progress}%`; // Задаємо фінальний розмір після завантаження
    }, 100); // Затримка, щоб забезпечити старт анімації
  });
}

// Функція для відображення хобі
function renderHobbies(hobbies) {
  const container = document.getElementById("hobbies-container");
  hobbies.forEach((hobby) => {
    const hobbyDiv = document.createElement("div");
    hobbyDiv.classList.add("skill");
    hobbyDiv.innerHTML = `
      <h3>${hobby.name}</h3>
      <div class="progress-bar">
        <div class="progress" style="width: 0;"></div>
      </div>
    `;
    container.appendChild(hobbyDiv);

    const progressBar = hobbyDiv.querySelector(".progress");
    setTimeout(() => {
      progressBar.style.width = `${hobby.progress}%`;
    }, 100);
  });
}

// Функція для відображення мов
function renderLanguages(languages) {
  const container = document.getElementById("languages-container");
  languages.forEach((language) => {
    const languageDiv = document.createElement("div");
    languageDiv.classList.add("skill");
    languageDiv.innerHTML = `
      <h3>${language.name}</h3>
      <div class="progress-bar">
        <div class="progress" style="width: 0;"></div>
      </div>
    `;
    container.appendChild(languageDiv);

    const progressBar = languageDiv.querySelector(".progress");
    setTimeout(() => {
      progressBar.style.width = `${language.progress}%`;
    }, 100);
  });
}

// Викликаємо функцію для завантаження та відображення даних
getData();
