const number = await question("📱 Entrez votre numéro (ex: 241020000): ");
      const code = await client.requestPairingCode(number);
      console.log(`✅ CODE DE PAIRAGE: ${code}`);
    }

    client.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "open") {
        console.log("✅ BOT CONNECTÉ AVEC SUCCÈS !");
      } else if (connection === "close") {
        const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
        if (statusCode === DisconnectReason.loggedOut) {
          console.log("❌ Session expirée. Supprimez le dossier 'session' et reconnectez-vous.");
          process.exit(0);
        } else {
          console.log("⚠️ Déconnexion détectée, tentative de reconnexion...");
          startBot();
        }
      }
    });

    client.ev.on("messages.upsert", async ({ messages }) => {
      const msg = messages[0];
      if (!msg.message || msg.key.remoteJid === "status@broadcast" || msg.key.fromMe) return;
      try {
        await handleCommand(msg, client);
      } catch (err) {
        console.error("❌ Erreur dans le handler de commande :", err);
      }
    });

    client.ev.on("creds.update", saveCreds);
  } catch (err) {
