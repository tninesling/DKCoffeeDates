
const handleEvent = (event) => {
    switch (event.type) {
        case 'app_mention':
            // do app menntion stuff
            break;
        case 'message':
            // do message stuff
            break;
        default:
            console.log(`We don't know how to handle event type ${event.type}`);
    }
}

const handleOptin = (query, res) => {
    if (query.text) {
        let data = {
            response_type: 'in_channel',
            text: 'You have now opted in for ' + query.text,
        }
        res.json(data);
    }
}

module.exports = {
    handleEvent,
    handleOptin
}
