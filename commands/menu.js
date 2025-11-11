
// commands/menu.js
const commandsInfo = {
  ping: "Test de latence",
  hello: "Dire bonjour",
  sticker: "Créer un sticker depuis une image",
  play: "Jouer un audio",
  menu: "Afficher ce menu",
};

export default async function menuCommand(message, client) {
  try {
    const remoteJid = message.key.remoteJid;

    let menuText = "╔═══════════════════════\n║      𝐃𝐎𝐅𝐋𝐀𝐌𝐈𝐍𝐆𝐎 𝐌𝐄𝐍𝐔\n╠═══════════════════════\n";

    for (const [cmd, desc] of Object.entries(commandsInfo)) {
      menuText += `║ • .cmd.padEnd(8) —{desc}\n`;
    }

    menuText += "╚═══════════════════════";

    await client.sendMessage(remoteJid, {
      image: { url: "https://files.catbox.moe/x7fi39.jpg" },
      caption: menuText,
    }, { quoted: message });

  } catch (err) {
    console.error("Erreur dans menuCommand:", err);
  }
}
