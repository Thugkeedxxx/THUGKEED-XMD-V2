const axios = require('axios');

module.exports = {
    name: 'weather',
    description: 'Weather by city name',
    async execute(sock, chatId, msg, args) {
        if(!args.length) return sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 🌤️ Usage: !weather <city>\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });

        const city = args.join(' ');
        const apiKey = process.env.OPENWEATHER_API_KEY;

        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = res.data;
            const text = `
THUGKEED-XMD-V2 🌤️ Weather Info:
City: ${data.name}
Temp: ${data.main.temp}°C
Condition: ${data.weather[0].description}
Humidity: ${data.main.humidity}%
Channel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M
            `;
            await sock.sendMessage(chatId, { text });
        } catch(err) {
            await sock.sendMessage(chatId, { text: `THUGKEED-XMD-V2 ❌ Failed to fetch weather for "${city}".\nChannel: https://whatsapp.com/channel/0029VbB7a9v6LwHqDUERef0M` });
        }
    }
};