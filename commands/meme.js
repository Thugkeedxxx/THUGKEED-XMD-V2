const axios = require('axios');

module.exports = {
    name: 'meme',
    description: 'Random meme',
    async execute(sock, chatId, msg, args) {
        try {
            const res = await axios.get('https://meme-api.com/gimme');
            const meme = res.data;

            await sock.sendMessage(chatId, {
                image: { url: meme.url },
                caption: `THUGKEED-XMD-V2 😂 ${meme.title}\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M`
            });
        } catch(err) {
            await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ Failed to fetch meme.\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        }
    }
};