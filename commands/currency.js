const axios = require('axios');

module.exports = {
    name: 'currency',
    description: 'Currency converter',
    async execute(sock, chatId, msg, args) {
        if(args.length < 3) return sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 💱 Usage: !currency <amount> <from> <to>\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });

        const [amount, from, to] = args;
        try {
            const res = await axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
            const result = res.data.result;
            await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 💱 ${amount} ${from} = ${result.toFixed(2)} ${to}\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        } catch(err) {
            await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ Failed to convert currency.\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        }
    }
};