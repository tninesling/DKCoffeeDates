const { RTMClient,WebClient } = require('@slack/client');
const {checkUserLocation,pairUsers} = require('./slack-event-handler');
const fs = require('fs');

const token = 'xoxb-414091595655-413066763106-YD3P4JJsp4xLa5RFoKPwlBrR';
const web = new WebClient(token);

const rtm = new RTMClient(token);
rtm.start();

rtm.on('message', (message) => {
    
    checkUserLocation(message, rtm, web);
    
  });
const userArray = {
    boston: ['chelsey', 'cat', 'taylor', 'alex', 'jason', 'add'],
    new_york: ['dad', 'mom', 'friend'],
    new_jersey: ['conor', 'jack', 'jackie', 'christine'],
};
const json = JSON.stringify(userArray);

fs.writeFile('users.json', json, (err) => {
      if (err) throw err;
      console.log('done');
})

if ((new Date).getDay() == 15) {
    
}
