const { RTMClient,WebClient } = require('@slack/client');
const {checkUserLocation, addUserToJsonFile} = require('./slack-event-handler');


const token = 'xoxb-414091595655-413066763106-YD3P4JJsp4xLa5RFoKPwlBrR';
const web = new WebClient(token);

const rtm = new RTMClient(token);
rtm.start();

rtm.on('message', (message) => {
    
    checkUserLocation(message, rtm, web);
    addUserToJsonFile(message);
    
  });
  const userArray = [
    boston = ['chelsey', 'cat', 'taylor', 'alex', 'jason'], 
    new_york = ['dad','mom','friend'],
    new_jersey =['conor','jack', 'jackie', 'christine'],
  ];
  const json = JSON.stringify(userArray);

  
