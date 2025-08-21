/**
 * THUGKEED-XMD-V2 Music Command - YT3 API
 * Author: THUGKEED
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'music',
    description: 'Download music from YouTube using YT3',
    async execute(sock, chatId, msg, args) {
        if(!args.length) {
            return await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 🎵\nUsage: !music <song name>\nJoin my channel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        }

        const query = args.join(' ');
        await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 🎵\nSearching for: "${query}"\nPlease wait...\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });

        try {
            const res = await axios.get(`https://yt3-api.vercel.app/api/yt3?search=${encodeURIComponent(query)}`);
            const song = res.data.result[0];

            if(!song) return await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ No results found for "${query}".\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });

            const filePath = path.join(__dirname, '../downloads', `${song.title.replace(/[^a-zA-Z0-9 ]/g, '')}.mp3`);

            const writer = fs.createWriteStream(filePath);
            const audioRes = await axios.get(song.audio, { responseType: 'stream' });
            audioRes.data.pipe(writer);

            writer.on('finish', async () => {
                await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ✅ Download complete!\n"${song.title}"\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
                await sock.sendMessage(chatId, { audio: fs.readFileSync(filePath), mimetype: 'audio/mpeg', fileName: `${song.title}.mp3` });
                fs.unlinkSync(filePath);
            });

            writer.on('error', async () => {
                await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ Failed to download "${song.title}".\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
            });

        } catch(err) {
            console.error(err);
            await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ Error fetching song.\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        }
    }
};