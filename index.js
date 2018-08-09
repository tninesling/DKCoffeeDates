const { RTMClient,WebClient } = require('@slack/client');

const token = 'xoxb-414091595655-413066763106-YD3P4JJsp4xLa5RFoKPwlBrR';
const web = new WebClient(token);

const rtm = new RTMClient(token);
rtm.start();

web.channels.list()
  .then((res) => {
    const channel = res.channels.find(c => c.is_member);

    if (channel) {
      rtm.sendMessage('See you at 4:30 in Cannons - Bring Coffee', channel.id)
        .then((msg) => console.log(`Message sent to channel ${channel.name} with ts:${msg.ts}`))
        .catch(console.error);
    } else {
      console.log('This bot does not belong to any channel, invite it to at least one and try again');
    }
  });

rtm.on('message', (message) => {
    console.log(message);
    var text = message.text.toLowerCase();
    if (text.includes("bos") || text.includes("boston")) {
        rtm.sendMessage(`Hello, <@${message.user}>! You signed up for Boston Coffee Date`, message.channel)
            .then((msg) => console.log(`Sent response message: ${msg}`))
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
    // For structure of `event`, see https://api.slack.com/events/message
    console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
  });