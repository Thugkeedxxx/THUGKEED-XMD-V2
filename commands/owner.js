/**
 * THUGKEED-XMD-V2 Owner Command
 * Author: THUGKEED
 */

module.exports = {
    name: 'owner',
    description: 'Show bot owner info',
    async execute(sock, chatId, msg, args) {
        const ownerText = `
THUGKEED-XMD-V2 🤵 Bot Owner Info:

Name: THUGKEED
WhatsApp Channel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M
GitHub: https://github.com/thugkeedxxx
`;

        await sock.sendMessage(chatId, { text: ownerText });
    }
};