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

// Validation Regex + navigation
nextBtn.addEventListener("click", () => {

  // Étape 1 : Validation uniquement sur les informations personnelles
  if (currentStep === 0) {
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const nameRegex = /^[a-zA-Z]{2,}(?:\s[a-zA-Z]{2,}){1,2}$/;
    const phoneRegex = /^(?:0[67])[0-9]{8}$/;

    if (!nameRegex.test(fullName)) {
      alert("Le nom complet doit contenir entre 2 et 3 mots .");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Le numéro de téléphone doit commencer par 06 ou 07 et contenir exactement 10 chiffres.");
      return;
    }
  }

  // --- navigation  ---
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);

    // Si on passe à la dernière étape, on génère le CV automatiquement
    if (currentStep === steps.length - 1) {
      const savedData = loadFromStorage("cvData");
      if (savedData) generatePreview(savedData);
    }
  } else {
    collectData();
    const savedData = loadFromStorage("cvData");
    generatePreview(savedData);
    showStep(currentStep); // Afficher l’aperçu
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

function collectData() {
  // Récupérer chaque bloc d'expérience
  const expBlocks = document.querySelectorAll("#experience-container > div");

  const experiences = Array.from(expBlocks).map(block => {
    const inputs = block.querySelectorAll("input");
    return {
      poste: inputs[0]?.value || "",
      entreprise: inputs[1]?.value || "",
      annees: inputs[2]?.value || "",
    };
  });

  const eduBlocks = document.querySelectorAll("#education-container > div");
  const educations = Array.from(eduBlocks).map(block => {
    const inputs = block.querySelectorAll("input");
    return {
      diplome: inputs[0]?.value || "",
      ecole: inputs[1]?.value || "",
      annees: inputs[2]?.value || "",
    };
  });

  const formData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    linkedin: document.getElementById("linkedin").value,
    github: document.getElementById("github").value,
    skills: Array.from(document.querySelectorAll("#skills-container input")).map(el => el.value),
    educations: educations,
    experiences: experiences,
    modelType: selectedModel
  };

  saveToStorage("cvData", formData);
  generatePreview(formData);

  // Message de confirmation
  const saveMsg = document.createElement("div");
  saveMsg.textContent = "✅ CV sauvegardé avec succès !";
  saveMsg.style.cssText = `
    background-color: #16a34a;
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    text-align: center;
    margin-top: 10px;
    transition: opacity 0.5s ease-in-out;
  `;
  document.querySelector(".form-step.active")?.appendChild(saveMsg);
  setTimeout(() => (saveMsg.style.opacity = 0), 2000);
  setTimeout(() => saveMsg.remove(), 2500);
}

showStep(currentStep);
