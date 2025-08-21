/**
 * THUGKEED-XMD-V2 Ping Command
 * Author: THUGKEED
 */

module.exports = {
    name: 'ping',
    description: 'Check bot status',
    async execute(sock, chatId, msg, args) {
        const start = Date.now();
        await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ⏱️\nPinging...` });
        const end = Date.now();
        await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ✅ Pong!\nResponse time: ${end - start}ms\nJoin my channel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
    }
};