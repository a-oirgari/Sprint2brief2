document.addEventListener("DOMContentLoaded", () => {
  const printBtn = document.getElementById("print-cv");
  const downloadBtn = document.getElementById("download-pdf");

  // Imprime uniquement le CV sélectionné
  printBtn.addEventListener("click", () => {
    const preview = document.getElementById("cv-preview");
    if (!preview) return;

    const chosen =
      preview.dataset.chosen === "B"
        ? preview.querySelector("#templateB_box")
        : preview.querySelector("#templateA_box");

    if (!chosen) {
      alert("Aucun CV à imprimer !");
      return;
    }

    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Impression du CV</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              background: white;
              color: black;
              padding: 2rem;
              font-family: sans-serif;
            }
            h3, h4 { color: #1e40af; }
            ul { margin-left: 1rem; }
          </style>
        </head>
        <body>
          ${chosen.outerHTML}
        </body>
      </html>
    `);
    win.document.close();
    win.onload = () => {
      win.focus();
      win.print();
    };
  });

  // Téléchargement PDF 
  downloadBtn.addEventListener("click", () => {
    const preview = document.getElementById("cv-preview");
    if (!preview) return;

    const chosen =
      preview.dataset.chosen === "B"
        ? preview.querySelector("#templateB_box")
        : preview.querySelector("#templateA_box");

    if (!chosen) {
      alert("Aucun aperçu de CV n’a été trouvé !");
      return;
    }

    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Mon CV</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              background: white;
              color: black;
              padding: 2rem;
              font-family: sans-serif;
            }
            h3, h4 { color: #1e40af; }
            ul { margin-left: 1rem; }
          </style>
        </head>
        <body>
          ${chosen.outerHTML}
        </body>
      </html>
    `);
    win.document.close();
    win.onload = () => {
      win.focus();
      win.print(); // Pour sauvegarder en PDF 
    };
  });
});
