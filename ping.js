
 mn/nsxrdatsynncunce
 mn/nsxrdaul async tsyntcuncptioommand(message, client) {
  try {
    const remoteJid = message.key.remoteJid;
    const start = Date.now();

    // Envoyer "Ping..."
    const sentMsg = await client.sendMessage(remoteJid, { text: "🏓 Ping..." }, { quoted: message });

    // Calculer le temps écoulé
    const latency = Date.now() - start;

    // Éditer le message pour afficher le ping
    await client.sendMessage(remoteJid, { text: `🏓 Pong! Latence : ${latency} ms` }, { quoted: message });
  } catch (err) {
    console.error("Erreur dans pinCommand:", err);
  }
}
