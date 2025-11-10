let currentStep = 0;
const steps = document.querySelectorAll(".form-step");
const progressBar = document.getElementById("progress-bar");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let selectedModel = "1"; // par défaut

document.querySelectorAll(".cv-model").forEach(model => {
  model.addEventListener("click", () => {
    document.querySelectorAll(".cv-model").forEach(m => m.classList.remove("ring-4", "ring-indigo-400"));
    model.classList.add("ring-4", "ring-indigo-400");
    selectedModel = model.dataset.model;
    saveToStorage("selectedModel", selectedModel);
  });
});

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("hidden", i !== index);
    step.classList.toggle("active", i === index);
  });

  prevBtn.classList.toggle("hidden", index === 0);
  nextBtn.textContent = index === steps.length - 1 ? "Terminer" : "Suivant →";

  const progress = ((index + 1) / steps.length) * 100;
  progressBar.style.width = `${progress}%`;
}

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    collectData();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

function collectData() {
  const formData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    linkedin: document.getElementById("linkedin").value,
    github: document.getElementById("github").value,
    skills: Array.from(document.querySelectorAll("#skills-container input")).map(el => el.value),
    experiences: Array.from(document.querySelectorAll("#experience-container input")).map(el => el.value),
    modelType: selectedModel
  };

  saveToStorage("cvData", formData);
  generatePreview(formData);
  alert("CV enregistré avec succès !");
}

showStep(currentStep);
