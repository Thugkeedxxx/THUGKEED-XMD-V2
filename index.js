require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { default: makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion } = require('@adiwajshing/baileys');
const yt3 = require('yt3');
const menuText = require('./menu');

// Config
const PAIR_SITE_URL = process.env.PAIR_SITE;
const BOT_CREDS_PATH = path.join(__dirname, 'creds.json');

const BOT_IMAGE = 'https://your-assets.com/bot-image.png';
const REPO_IMAGE = 'https://your-assets.com/repo-image.png';
const MENU_MP3 = 'https://your-assets.com/menu-sound.mp3';

// Fetch creds from pair site
async function fetchCreds() {
    try {
        console.log('⏳ Fetching latest creds from pair site...');
        const response = await axios.get(PAIR_SITE_URL, { responseType: 'json' });
        if(response.data) {
            fs.writeFileSync(BOT_CREDS_PATH, JSON.stringify(response.data, null, 2));
            console.log('✅ creds.json updated successfully!');
        }
    } catch (err) {
        console.error('❌ Error fetching creds:', err.message);
    }
}

// Start bot
async function startBot() {
    await fetchCreds();

    const [version] = await fetchLatestBaileysVersion();
    const { state, saveState } = useSingleFileAuthState(BOT_CREDS_PATH);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        version
    });

    sock.ev.on('creds.update', saveState);
    sock.ev.on('connection.update', update => {
        if(update.connection === 'open') console.log('✅ THUGKEED-XMD-V2 connected!');
    });

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];
        if(!msg.message || msg.key.fromMe) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        const from = msg.key.remoteJid;

        // Auto react & auto record
        await sock.sendMessage(from, { react: { text: '🔥', key: msg.key } });
        await sock.sendPresenceUpdate('recording', from);

        if(text.startsWith('!')) {
            const args = text.slice(1).trim().split(/ +/);
            const cmd = args.shift().toLowerCase();

            switch(cmd) {
                case 'menu':
                    // Send bot image
                    await sock.sendMessage(from, { image: { url: BOT_IMAGE }, caption: menuText() });
                    // Send repo image
                    await sock.sendMessage(from, { image: { url: REPO_IMAGE }, caption: 'Repo: THUGKEED-XMD-V2' });
                    // Send menu MP3
                    await sock.sendMessage(from, { audio: { url: MENU_MP3 }, mimetype: 'audio/mpeg' });
                    break;

                case 'ping':
                    await sock.sendMessage(from, { text: `🏓 Pong! Bot online.\nChannel: ${process.env.CHANNEL_LINK}` });
                    break;

                case 'play':
                    if(!args.length) return sock.sendMessage(from, { text: '❌ Usage: !play <song name>' });
                    const songName = args.join(' ');
                    await sock.sendMessage(from, { text: `🎵 Downloading "${songName}" via YT3...` });
                    try {
                        const info = await yt3(songName);
                        await sock.sendMessage(from, { text: `✅ Song ready: ${info.audio}` });
                        // Optional: send bot image when song ready
                        await sock.sendMessage(from, { image: { url: BOT_IMAGE }, caption: `🎶 Downloaded via THUGKEED-XMD-V2` });
                    } catch(err) {
                        await sock.sendMessage(from, { text: `❌ Error downloading song: ${err.message}` });
                    }
                    break;

                case 'owner':
                    await sock.sendMessage(from, { text: `👑 Bot Owner: THUGKEED\nChannel: ${process.env.CHANNEL_LINK}` });
                    break;

                default:
                    await sock.sendMessage(from, { text: '❌ Unknown command. Use !menu to see commands.' });
            }
        }
    });
}

// Start bot
startBot();

// Auto-refresh creds every 30 min
setInterval(async () => { await fetchCreds(); }, 30*60*1000);