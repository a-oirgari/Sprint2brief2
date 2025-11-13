function safeArray(arr) {
  return Array.isArray(arr) ? arr.filter(v => v && String(v).trim()) : [];
}

function getStoredCvData() {
  try {
    return typeof loadFromStorage === "function" ? loadFromStorage("cvData") : null;
  } catch (e) {
    return null;
  }
}

function applyPrintStyleForSelection(selectedId) {
  const styleId = "preview-print-style";
  let styleEl = document.getElementById(styleId);
  const css = `
    @media print {
      #cv-preview .template-box { display: none !important; }
      #cv-preview #${selectedId} { display: block !important; }
    }
  `;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
}

function renderTemplateA(d) {
  const skills = safeArray(d.skills)
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join("");
  const exps = safeArray(d.experiences)
    .map((exp) => {
      if (typeof exp === "object") {
        return `<li><strong>${escapeHtml(exp.poste || "")}</strong> — ${escapeHtml(exp.entreprise || "")} (${escapeHtml(exp.annees || "")})</li>`;
      }
      return `<li>${escapeHtml(exp)}</li>`;
    })
    .join("");

  return `
    <div class="p-4" id="templateA_inner">
      <div class="flex flex-col gap-2 text-gray-100">
        <h3 class="text-2xl font-bold text-indigo-400">${escapeHtml(
    d.fullName || ""
  )}</h3>
        <p>${escapeHtml(d.email || "")}${d.email && d.phone ? " | " : ""
    }${escapeHtml(d.phone || "")}</p>
        <p>${escapeHtml(d.address || "")}</p>
        <p>
          ${d.linkedin
      ? `<a href="${escapeAttr(
        d.linkedin
      )}" class="text-indigo-300 underline" target="_blank">LinkedIn</a>`
      : ""
    }
          ${d.linkedin && d.github ? " | " : ""}
          ${d.github
      ? `<a href="${escapeAttr(
        d.github
      )}" class="text-indigo-300 underline" target="_blank">GitHub</a>`
      : ""
    }
        </p>
        <hr class="my-3 border-gray-500">
        <h4 class="text-lg font-semibold text-indigo-400">Compétences</h4>
        <ul class="list-disc list-inside">${skills || "<li>(Aucune compétence)</li>"
    }</ul>
        <h4 class="text-lg font-semibold text-indigo-400 mt-4">Études / Formations</h4>
        <ul class="list-disc list-inside">
          ${safeArray(d.educations)
              .map(edu => {
                if (typeof edu === "object") {
                  return `<li><strong>${escapeHtml(edu.diplome || "")}</strong> — ${escapeHtml(edu.ecole || "")} (${escapeHtml(edu.annees || "")})</li>`;
                }
                return `<li>${escapeHtml(edu)}</li>`;
              })
              .join("") || "<li>(Aucune formation)</li>"
            }
        </ul>

        <h4 class="text-lg font-semibold text-indigo-400 mt-4">Expériences</h4>
        <ul class="list-disc list-inside">${exps || "<li>(Aucune expérience)</li>"
    }</ul>
      </div>
    </div>
  `;
}

function renderTemplateB(d) {
  const skills = safeArray(d.skills)
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join("");
  const exps = safeArray(d.experiences)
    .map((exp) => {
      if (typeof exp === "object") {
        return `<li><strong>${escapeHtml(exp.poste || "")}</strong> — ${escapeHtml(exp.entreprise || "")} (${escapeHtml(exp.annees || "")})</li>`;
      }
      return `<li>${escapeHtml(exp)}</li>`;
    })
    .join("");

  return `
    <div class="p-4" id="templateB_inner">
      <div class="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden">
        <aside class="bg-indigo-700 text-white p-4 flex-1 flex flex-col items-start justify-center">
          <h3 class="text-2xl font-bold mb-2">${escapeHtml(
    d.fullName || ""
  )}</h3>
          <p class="text-sm">${escapeHtml(d.email || "")}</p>
          <p class="text-sm">${escapeHtml(d.phone || "")}</p>
          <div class="mt-2 flex flex-col text-xs">
            ${d.linkedin
      ? `<a href="${escapeAttr(
        d.linkedin
      )}" target="_blank" class="underline">LinkedIn</a>`
      : ""
    }
            ${d.github
      ? `<a href="${escapeAttr(
        d.github
      )}" target="_blank" class="underline">GitHub</a>`
      : ""
    }
          </div>
        </aside>
        <main class="flex-[2] p-6 text-gray-100">
          
          <p class="text-sm text-gray-300 mb-4">${escapeHtml(d.address || "")}</p>

          <section class="mb-4">
            <h4 class="text-xl font-semibold text-indigo-400 border-b border-gray-600 mb-2">Compétences</h4>
            <ul class="list-disc list-inside text-gray-200 text-sm leading-relaxed">${skills || "<li>(Aucune compétence)</li>"
    }</ul>
          </section>
          <section>
          <h4 class="text-lg font-semibold text-indigo-400 mt-4">Études / Formations</h4>
    <ul class="list-disc list-inside">
      ${
        safeArray(d.educations)
          .map(edu => {
            if (typeof edu === "object") {
              return `<li><strong>${escapeHtml(edu.diplome || "")}</strong> — ${escapeHtml(edu.ecole || "")} (${escapeHtml(edu.annees || "")})</li>`;
            }
            return `<li>${escapeHtml(edu)}</li>`;
          })
          .join("") || "<li>(Aucune formation)</li>"
      }
    </ul>

            <h4 class="text-xl font-semibold text-indigo-400 border-b border-gray-600 mb-2">Expériences</h4>
            <ul class="list-disc list-inside text-gray-200 text-sm leading-relaxed">${exps || "<li>(Aucune expérience)</li>"
    }</ul>
          </section>
        </main>
      </div>
    </div>
  `;
}

// utilitaires
function escapeHtml(str) {
  return String(str || "").replace(/[&<>"]/g, (c) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
function escapeAttr(str) {
  return String(str || "").replace(/"/g, "&quot;");
}

function setSelectedVisual(previewEl, which) {
  const aBox = previewEl.querySelector("#templateA_box");
  const bBox = previewEl.querySelector("#templateB_box");
  if (which === "A") {
    aBox.classList.add("selected");
    bBox.classList.remove("selected");
    aBox.style.display = "";
    bBox.style.display = "none";
    previewEl.dataset.chosen = "A";
    applyPrintStyleForSelection("templateA_box");
  } else {
    bBox.classList.add("selected");
    aBox.classList.remove("selected");
    bBox.style.display = "";
    aBox.style.display = "none";
    previewEl.dataset.chosen = "B";
    applyPrintStyleForSelection("templateB_box");
  }
}

function generatePreview(formData) {
  const data =
    formData && typeof formData === "object"
      ? formData
      : getStoredCvData() || {};
  const preview = document.getElementById("cv-preview");
  if (!preview) return;

  data.skills = safeArray(data.skills || []);
  data.experiences = safeArray(data.experiences || []);

  const htmlA = renderTemplateA(data);
  const htmlB = renderTemplateB(data);

  preview.innerHTML = `
    <div id="templates_wrapper" class="flex flex-col md:flex-row gap-4">
      <div id="templateA_box" class="template-box flex-1 bg-gray-900 rounded-lg p-2">
        <strong class="block mb-2 text-gray-300">Modèle A — Classique</strong>
        ${htmlA}
      </div>

      <div id="templateB_box" class="template-box flex-1 bg-gray-900 rounded-lg p-2">
        <strong class="block mb-2 text-gray-300">Modèle B — Moderne</strong>
        ${htmlB}
      </div>
    </div>
  `;

  const prevSelected =
    (typeof loadFromStorage === "function"
      ? loadFromStorage("selectedModel")
      : null) || data.modelType || "1";
  const chosen = String(prevSelected) === "2" ? "B" : "A";

  setTimeout(() => {
    setSelectedVisual(preview, chosen);
    if (typeof saveToStorage === "function")
      saveToStorage("selectedModel", chosen === "A" ? "1" : "2");
  }, 0);
}
