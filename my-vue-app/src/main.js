import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: "input", // Type d'entrée pour l'utilisateur
      message: "Type in your URL:",
      name: "URL", // Nom de la propriété pour stocker la réponse
      validate: (input) => {
        // Vérifie que l'entrée n'est pas vide
        return input.trim() !== "" ? true : "URL cannot be empty.";
      },
    },
  ])
  .then((answers) => {
    const url = answers.URL; // Récupère la réponse de l'utilisateur
    try {
      // Génère un QR code et l'enregistre en tant que fichier SVG
      const qr_svg = qr.image(url, { type: 'svg' });
      const filePath = 'qr_img.svg';
      qr_svg.pipe(fs.createWriteStream(filePath));
      console.log(`QR code has been generated and saved to ${filePath}`);
    } catch (err) {
      console.error("An error occurred while generating the QR code:", err);
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("An error occurred:", error);
    }
  });
