import fs from "fs";
import path from "path";

const modeFile = path.join("./config", "mode.json");

// --- Lire le mode ---
export function getMode() {
  try {
    if (!fs.existsSync(modeFile)) return "public"; // mode par défaut
    const data = fs.readFileSync(modeFile, "utf-8");
    const json = JSON.parse(data);
    return json.mode || "public";
  } catch (e) {
    console.error("Erreur getMode:", e);
    return "public";
  }
}

// --- Définir le mode ---
export function setMode(newMode) {
  try {
    const mode = newMode.toLowerCase();
    if (!["public", "private"].includes(mode)) throw new Error("Mode invalide");
    fs.writeFileSync(modeFile, JSON.stringify({ mode }), "utf-8");
    return true;
  } catch (e) {
    console.error("Erreur setMode:", e);
    return false;
  }
}
