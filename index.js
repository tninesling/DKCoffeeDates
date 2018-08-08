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
    // For structure of `event`, see https://api.slack.com/events/message
    rtm.sendMessage(`Hello, <@${message.user}>!`, message.channel)
    .then((msg) => console.log(`Sent response message: ${msg}`))
    .catch(console.error);
    console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
  });
