const axios = require('axios');

module.exports = {
    name: 'joke',
    description: 'Random joke',
    async execute(sock, chatId, msg, args) {
        try {
            const res = await axios.get('https://v2.jokeapi.dev/joke/Any');
            const joke = res.data;
            let text = joke.type === 'single' ? joke.joke : `${joke.setup}\n${joke.delivery}`;

            await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 😂 Joke:\n${text}\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        } catch(err) {
            await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ Failed to fetch joke.\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        }
    }
};