const bodyParser = require('body-parser');
const config = require('./config');
const express = require('express');
const handleEvent = require('./slack-event-handler');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    // Make sure the payload has a token field matching our slack bot token
    if (req.body.token && req.body.token === config.slackAccessToken) {
        res.sendStatus(200);
        console.log(req.body.text);
        handleEvent(req.body.event);
        handleOptin(req.query, res);
    } else {
        // Token is null or does not match, return forbidden
        res.sendStatus(403);
    }
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
