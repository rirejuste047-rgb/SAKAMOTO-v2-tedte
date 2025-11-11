
import fs from "fs";
import path from "path";
import url from "url";
import { getMode } from "./utils/mode.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// --- Chargement automatique des commandes ---
const commands = new Map();
const commandsPath = path.join(__dirname, "commands");

const files = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of files) {
  const commandName = file.replace(".js", "");
  try {
    const module = await import(`./commands/file`);
    // Support export default ou export nommé
    const commandFunc = module.default || module[`{commandName}Command`] || module.command;
    if (typeof commandFunc === "function") {
      commands.set(commandName, commandFunc);
    } else {
      console.warn(`Commande commandName ne contient pas de fonction exportée.`);
     catch (err) 
    console.error(`Erreur en important la commande{commandName}:`, err);
  }
}

// --- Import du module react (réaction avant commande) ---
let react = null;
try {
  const reactModule = await import("./commands/react.js");
