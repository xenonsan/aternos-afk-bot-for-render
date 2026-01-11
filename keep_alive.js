const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('AFK Bot is running!');
});

function keepAlive() {
    app.listen(port, () => {
        console.log(`Server is now ready on port ${port}`);
    });
}

module.exports = keepAlive;
