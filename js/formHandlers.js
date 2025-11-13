
document.addEventListener("DOMContentLoaded", () => {
  // Compétences 
  const skillsContainer = document.getElementById("skills-container");
  const addSkillBtn = document.getElementById("add-skill");

  addSkillBtn.addEventListener("click", () => {
    const input = document.createElement("div");
    input.className = "flex gap-2";
    input.innerHTML = `
      <input type="text" placeholder="Compétence" class="input-field flex-1" />
      <button class="btn-secondary remove-skill">✖</button>
    `;
    skillsContainer.appendChild(input);
  });

  skillsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-skill")) {
      e.target.parentElement.remove();
    }
  });

  // Expériences 
  const expContainer = document.getElementById("experience-container");
  const addExpBtn = document.getElementById("add-experience");

  addExpBtn.addEventListener("click", () => {
    const block = document.createElement("div");
    block.className = "flex flex-col md:flex-row gap-2";
    block.innerHTML = `
      <input type="text" placeholder="Poste" class="input-field flex-1" />
      <input type="text" placeholder="Entreprise" class="input-field flex-1" />
      <input type="text" placeholder="Années" class="input-field flex-1" />
      <button class="btn-secondary remove-exp">✖</button>
    `;
    expContainer.appendChild(block);
  });

  expContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-exp")) {
      e.target.parentElement.remove();
    }
  });
});

// Études 
const eduContainer = document.getElementById("education-container");
const addEduBtn = document.getElementById("add-education");

addEduBtn.addEventListener("click", () => {
  const block = document.createElement("div");
  block.className = "flex flex-col md:flex-row gap-2";
  block.innerHTML = `
    <input type="text" placeholder="Diplôme / Formation" class="input-field flex-1" />
    <input type="text" placeholder="Établissement" class="input-field flex-1" />
    <input type="text" placeholder="Années" class="input-field flex-1" />
    <button class="btn-secondary remove-edu">✖</button>
  `;
  eduContainer.appendChild(block);
});

eduContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-edu")) {
    e.target.parentElement.remove();
  }
});
