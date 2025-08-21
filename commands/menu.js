const settings = require('../settings');
const fs = require('fs');
const path = require('path');
const os = require('os');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function helpCommand(sock, chatId, message) {
        const start = Date.now();
        await sock.sendMessage(chatId, { text: '_Loading THUGKEED-XMD-V2 please wait..._' }, { quoted: message });
        const end = Date.now();
        const ping = Math.round((end - start) / 2);

        const uptimeInSeconds = process.uptime();
        const uptimeFormatted = formatTime(uptimeInSeconds);
    const helpMessage = `
👋🏻╔════════════════════╗
║ ⚡ THUGKEED-XMD-V2 ⚡ ║
╠════════════════════╣
🎵 Music: !music <song name>
🎬 Video: !video <video name>
🖼️ Image: !image <prompt>
🖼️ Sticker: !sticker <reply to media>
😂 Meme: !meme
😂 Joke: !joke
🌤️ Weather: !weather <city>
💱 Currency: !currency <amount> <from> <to>
⏳ Timer: !timer <seconds>
📜 Help: !help
📊 Stats: !stats
🤵 Owner: !owner
💻 Repo: !repo
⏱️ Ping: !ping

🔥 Auto-react & Auto-record enabled
🌐 Channel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M
╚════════════════════╝
        `;

    try {
        const imagePath = path.join(__dirname, '../assets/menu_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: '',
                        serverMessageId: -1
                    }
                }
            },{ quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: '𝐉ᴜɴᴇ 𝐌ᴅ',
                        serverMessageId: -1
                    } 
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
