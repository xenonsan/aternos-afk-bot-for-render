const mineflayer = require('mineflayer');
const fs = require('fs');
const keepAlive = require("./keep_alive");

// Initialize web server
keepAlive();

let config = {};
try {
    const rawdata = fs.readFileSync('config.json');
    config = JSON.parse(rawdata);
} catch (e) {
    console.log("Could not read config.json, using environment variables.");
}

const host = process.env.SERVER_IP || config.ip || "yourip.aternos.me";
const port = process.env.SERVER_PORT || config.port || 25565;
const username = process.env.BOT_NAME || config.name || "afk_bot";
const version = process.env.VERSION || config.version || false;

let bot;

function createBot() {
    const botOptions = {
        host: host,
        port: parseInt(port),
        username: username,
    };

    if (version) {
        botOptions.version = version;
    }

    bot = mineflayer.createBot(botOptions);

    let lasttime = -1;
    let moving = 0;
    let connected = 0;
    const actions = ['forward', 'back', 'left', 'right'];
    const pi = Math.PI;
    const moveinterval = 2; // 2 second movement interval
    const maxrandom = 5; // 0-5 seconds added to movement interval (randomly)

    bot.on('login', () => {
        console.log(`[${new Date().toISOString()}] Bot Logged In: ${username}`);
    });

    bot.on('spawn', () => {
        connected = 1;
        console.log(`[${new Date().toISOString()}] Bot Spawned in the server`);
    });

    bot.on('time', () => {
        if (connected < 1) return;

        if (lasttime < 0) {
            lasttime = bot.time.age;
        } else {
            const randomadd = Math.random() * maxrandom * 20;
            const interval = moveinterval * 20 + randomadd;
            if (bot.time.age - lasttime > interval) {
                if (moving == 1) {
                    actions.forEach(a => bot.setControlState(a, false));
                    moving = 0;
                    lasttime = bot.time.age;
                } else {
                    const yaw = Math.random() * pi - (0.5 * pi);
                    const pitch = Math.random() * pi - (0.5 * pi);
                    bot.look(yaw, pitch, false);
                    const lastaction = actions[Math.floor(Math.random() * actions.length)];
                    bot.setControlState(lastaction, true);
                    moving = 1;
                    lasttime = bot.time.age;
                    bot.activateItem();
                }
            }
        }
    });

    bot.on('error', (err) => {
        console.log(`[${new Date().toISOString()}] Error: ${err.message}`);
    });

    bot.on('kicked', (reason) => {
        console.log(`[${new Date().toISOString()}] Kicked: ${reason}`);
    });

    bot.on('end', () => {
        console.log(`[${new Date().toISOString()}] Bot disconnected. Reconnecting in 30 seconds...`);
        connected = 0;
        setTimeout(createBot, 30000);
    });
}

createBot();

