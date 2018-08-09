
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
const currentMonth = () => {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var date = new Date();
    var currentMonth = month[date.getMonth()];
    return currentMonth;
}

const checkUserLocation = (message, rtm, web) => {
    const text = message.text.toLowerCase();
    if (text.includes("bos") || text.includes("boston")) {
        rtm.sendMessage(`Hello, <@${message.user}>! You signed up for Boston Coffee Date`, message.channel)
        web.chat.postMessage({ channel: message.user, text: 'Hello there, do you want to particpate in ' + currentMonth() })
            .then((res, msg) => {
                // `res` contains information about the posted message
                console.log('Message sent: ', res.ts);
                console.log(`Sent response message: ${msg}`)
            })
            .catch(console.error);
            
    } else if (text.includes("jersey") || text.includes("nj")) {
        rtm.sendMessage(`Hello, <@${message.user}>! You signed up for New Jersey Coffee Date`, message.channel)
            .then((msg) => console.log(`Sent response message: ${msg}`))
            .catch(console.error);
    } else if (text.includes("new york") || text.includes("ny")) {
        rtm.sendMessage(`Hello, <@${message.user}>! You signed up for New York Coffee Date`, message.channel)
            .then((msg) => console.log(`Sent response message: ${msg}`))
            .catch(console.error);
    } else {
        rtm.sendMessage(`<@${message.user}>, invalid location, please specify "boston", "new york", or "new jersey"`, message.channel)
            .then((msg) => console.log(`Sent response message: ${msg}`))
            .catch(console.error);
    }
}


module.exports = {
    handleEvent, checkUserLocation
}
