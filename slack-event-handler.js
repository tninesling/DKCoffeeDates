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

module.exports = {
    handleEvent
}
