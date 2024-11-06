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

// Для блоку, який відкривається/закривається
const btnRoll = document.getElementsByClassName("roll");
const blockRoll = document.getElementsByClassName("roll-block");

Array.from(btnRoll).forEach((btn, index) => {
  btn.addEventListener("click", () => showOrHide(blockRoll[index]));
});

function showOrHide(block) {
  block.classList.toggle("show"); // Додаємо/знімаємо клас для показу/приховування
}

///////////////////////////////////////////////
// async function getData() {
//   try {
//     const response = await fetch('/json/data.json'); // Запит на сервер
//     if (!response.ok) throw new Error('Помилка при завантаженні даних');

//     const data = await response.json(); // Перетворення JSON у JavaScript об'єкт
//     renderData(data); // Функція для відображення даних на сторінці
//   } catch (error) {
//     console.error('Помилка під час отримання даних:', error);
//   }
// }

// // Функція для відображення даних на сторінці
// function renderData(data) {
//   const container = document.getElementById('data-container');

//   // Виводимо навички (skills)
//   const skillsSection = document.createElement('div');
//   skillsSection.innerHTML = '<h3>Skills</h3>';
//   data.skills.forEach(item => {
//     const div = document.createElement('div');
//     div.textContent = `${item.name}: ${item.progress}%`;
//     skillsSection.appendChild(div);
//   });
//   container.appendChild(skillsSection);

//   // Виводимо хобі (hobbies)
//   const hobbiesSection = document.createElement('div');
//   hobbiesSection.innerHTML = '<h3>Hobbies</h3>';
//   data.hobbies.forEach(item => {
//     const div = document.createElement('div');
//     div.textContent = `${item.name}: ${item.progress}%`;
//     hobbiesSection.appendChild(div);
//   });
//   container.appendChild(hobbiesSection);

//   // Виводимо мови (languages)
//   const languagesSection = document.createElement('div');
//   languagesSection.innerHTML = '<h3>Languages</h3>';
//   data.languages.forEach(item => {
//     const div = document.createElement('div');
//     div.textContent = `${item.name}: ${item.progress}%`;
//     languagesSection.appendChild(div);
//   });
//   container.appendChild(languagesSection);
// }

// getData(); // Виклик асинхронної функції для отримання даних

// Завантажуємо дані з data.json
async function getData() {
  try {
    const response = await fetch("data/data.json"); 
    if (!response.ok) {
      throw new Error("Помилка при завантаженні даних");
    }
    const data = await response.json();
    renderData(data); // Передаємо отримані дані для відображення
  } catch (error) {
    console.error("Помилка при завантаженні даних:", error);
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
