module.exports = {
    name: 'timer',
    description: 'Countdown timer',
    async execute(sock, chatId, msg, args) {
        if(!args.length || isNaN(args[0])) return sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ⏳ Usage: !timer <seconds>\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });

        const seconds = parseInt(args[0]);
        await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ⏳ Timer started: ${seconds} sec\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });

        setTimeout(() => sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ⏰ Timer finished!\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` }), seconds*1000);
    }
};