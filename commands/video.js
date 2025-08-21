/**
 * THUGKEED-XMD-V2 Video Command - YT3 API
 * Author: THUGKEED
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'video',
    description: 'Download video from YouTube using YT3',
    async execute(sock, chatId, msg, args) {
        if(!args.length) {
            return await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 🎬\nUsage: !video <video name>\nJoin my channel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        }

        const query = args.join(' ');
        await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 🎬\nSearching for: "${query}"\nPlease wait...\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });

        try {
            const res = await axios.get(`https://yt3-api.vercel.app/api/yt3?search=${encodeURIComponent(query)}`);
            const video = res.data.result[0];

            if(!video) return await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ No results found for "${query}".\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });

            const filePath = path.join(__dirname, '../downloads', `${video.title.replace(/[^a-zA-Z0-9 ]/g, '')}.mp4`);

            const writer = fs.createWriteStream(filePath);
            const videoRes = await axios.get(video.video, { responseType: 'stream' });
            videoRes.data.pipe(writer);

            writer.on('finish', async () => {
                await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ✅ Video download complete!\n"${video.title}"\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
                await sock.sendMessage(chatId, { video: fs.readFileSync(filePath), mimetype: 'video/mp4', fileName: `${video.title}.mp4` });
                fs.unlinkSync(filePath);
            });

            writer.on('error', async () => {
                await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ Failed to download "${video.title}".\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
            });

        } catch(err) {
            console.error(err);
            await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ Error fetching video.\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        }
    }
};