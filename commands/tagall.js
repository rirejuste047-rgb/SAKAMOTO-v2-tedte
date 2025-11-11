
// commands/tagall.js
export default async function tagallCommand(message, client) {
  try {
    const remoteJid = message.key.remoteJid;

    // Vérifie si c'est un groupe
    if (!remoteJid.endsWith("@g.us")) {
      return client.sendMessage(remoteJid, { text: "❌ Cette commande ne fonctionne que dans un groupe." }, { quoted: message });
    }

    // Récupère les participants du groupe
    const metadata = await client.groupMetadata(remoteJid);
    const participants = metadata.participants;

    // Prépare les mentions
    const mentions = participants.map(p => p.id);
    const mentionText = participants.map(p => `@p.id.split("@")[0]`).join(" ");

    const texte = `👥 *TAGALL*{mentionText}`;

    await client.sendMessage(remoteJid, {
      text: texte,
      mentions
    }, { quoted: message });

  } catch (err) {
    console.error("Erreur dans tagallCommand:", err);
    await client.sendMessage(message.key.remoteJid, { text: "❌ Erreur lors du tagall." }, { quoted: message });
  }
}
```

---

*Fonctionnalités :*
- Tag tous les membres du groupe avec `@user`.
- Utilise `mentions` pour les notifier réellement.
- Message d’erreur si ce n’est pas un groupe.
