// utils/premium.js
import fs from "fs";
import path from "path";
import { DATA_DIR } from "./config.js";

const DIR = path.resolve(DATA_DIR || "./data");
const FILE = path.join(DIR, "premium.json");

// assure le dossier
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

// initialise le fichier si manquant
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({ premium: [] }, null, 2), "utf8");

function readData() {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return { premium: [] };
  }
}

function writeData(obj) {
  fs.writeFileSync(FILE, JSON.stringify(obj, null, 2), "utf8");
}

export function listPremium() {
  const data = readData();
  return Array.isArray(data.premium) ? data.premium : [];
}

export function isPremium(jid) {
  if (!jid) return false;
  const norm = normalizeJid(jid);
  const list = listPremium();
  return list.includes(norm);
}

export function addPremium(jid, meta = {}) {
  if (!jid) throw new Error("jid required");
  const norm = normalizeJid(jid);
  const data = readData();
  if (!Array.isArray(data.premium)) data.premium = [];
  if (!data.premium.includes(norm)) {
    data.premium.push(norm);
    writeData(data);
    return true;
  }
  return false; // déjà premium
}

export function removePremium(jid) {
  if (!jid) throw new Error("jid required");
  const norm = normalizeJid(jid);
  const data = readData();
  if (!Array.isArray(data.premium)) data.premium = [];
  const idx = data.premium.indexOf(norm);
  if (idx !== -1) {
    data.premium.splice(idx, 1);
    writeData(data);
    return true;
  }
  return false;
}

export function normalizeJid(jid) {
  if (!jid) return jid;
  // accepte différents formats : 22507XXX ou 22507XXX@s.whatsapp.net or @user
  let s = String(jid).trim();
  s = s.replace(/^@/, "");
  if (!s.includes("@")) {
    // si contient + ou espace, keep digits
    const digits = s.replace(/\D/g, "");
    return `${digits}@s.whatsapp.net`;
  }
  return s;
}
