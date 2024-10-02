const express = require('express');
const axios = require('axios');
const randomUseragent = require('random-useragent');

const url = "https://glitch.com/edit/#!/bloom-vivacious-industry?path=package.json%3A8%3A0";

const app = express();
const port = process.env.PORT || 3000;

function getRandomStayTime() {
    return Math.floor(Math.random() * (57000 - 48000 + 1)) + 48000;
}

function getRandomInterval() {
    return Math.floor(Math.random() * (289000 - 272000 + 1)) + 272000;
}

async function visitUrl() {
    const userAgent = randomUseragent.getRandom();
    console.log(`Visiting URL with User-Agent: ${userAgent}`);

    try {
        await axios.get(url, {
            headers: {
                'User-Agent': userAgent
            }
        });
        console.log(`Visited ${url} successfully`);
        
        const stayTime = getRandomStayTime();
        console.log(`Staying on the page for ${(stayTime / 1000).toFixed(2)} seconds...\n`);
        await new Promise(resolve => setTimeout(resolve, stayTime));

    } catch (error) {
        console.error('Error visiting URL:', error);
    }

    const nextInterval = getRandomInterval();
    console.log(`Waiting for ${(nextInterval / 1000 / 60).toFixed(2)} minutes before the next visit...\n`);

    setTimeout(visitUrl, nextInterval);
}

app.get('/', (req, res) => {
    res.send('Bot is running automatically in the background.');
});

visitUrl();

app.listen(port, () => {
    console.log(`Bot server running at http://localhost:${port}`);
});
