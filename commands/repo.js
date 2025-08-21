/**
 * THUGKEED-XMD-V2 Repo Command
 * Author: THUGKEED
 */

module.exports = {
    name: 'repo',
    description: 'Show GitHub repository',
    async execute(sock, chatId, msg, args) {
        await sock.sendMessage(chatId, { 
            text: `THUGKEED-XMD-V2 💻 GitHub Repository:\nhttps://github.com/thugkeedxxx/LONATI-XMD-V2\nJoin my channel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M`
        });
    }
};