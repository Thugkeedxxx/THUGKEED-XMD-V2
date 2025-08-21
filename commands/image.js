/**
 * THUGKEED-XMD-V2 Image Command
 * Author: THUGKEED
 */

const axios = require('axios');

module.exports = {
    name: 'image',
    description: 'Generate images using AI',
    async execute(sock, chatId, msg, args) {
        if(!args.length) {
            return await sock.sendMessage(chatId, { 
                text: `THUGKEED-XMD-V2 🖼️\nUsage: !image <prompt>\nJoin my channel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M`
            });
        }

        const prompt = args.join(' ');
        await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 🖼️\nGenerating image for: "${prompt}"\nPlease wait...\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });

        try {
            const response = await axios.post('https://api.openai.com/v1/images/generations', {
                prompt: prompt,
                n: 1,
                size: "512x512"
            }, {
                headers: { 
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            const imageUrl = response.data.data[0].url;

            await sock.sendMessage(chatId, { 
                text: `THUGKEED-XMD-V2 ✅\nImage generated for: "${prompt}"\nJoin my channel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M`
            });

            await sock.sendMessage(chatId, { image: { url: imageUrl }, caption: `THUGKEED-XMD-V2 🖼️` });

        } catch(err) {
            console.error(err);
            await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌\nFailed to generate image.\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        }
    }
};