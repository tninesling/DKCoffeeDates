const fs = require('fs');
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
        addUserToJsonFile(message.user, "boston");
        sendDirectMessage(message.user, 'Hello there, you are signed up for ' + currentMonth() + ' Boston coffee date', web);
            
    } else if (text.includes("jersey") || text.includes("nj")) {
        addUserToJsonFile(message.user, "new_jersey");
        sendDirectMessage(message.user, 'Hello there, you are signed up for ' + currentMonth() + ' New Jersey coffee date', web);

    } else if (text.includes("new york") || text.includes("ny")) {
        addUserToJsonFile(message.user, "new_york");
        sendDirectMessage(message.user, 'Hello there, you are signed up for ' + currentMonth() + ' New York coffee date', web);
    } else if (text.includes("pair users for coffee")) {
        pairUsers(web);
    }
    else {
        rtm.sendMessage(`<@${message.user}>, invalid location, please specify "boston", "new york", or "new jersey"`, message.channel)
            .then((msg) => console.log(`Sent response message: ${msg}`))
            .catch(console.error);
    }
}

const sendDirectMessage = (user, msgText, web) => {
    web.chat.postMessage({ channel: user, text: msgText })
        .then((res, msg) => {
            console.log(`Sent response message: ${msg}`)
        })
        .catch(console.error);
}

const selectUser = (array) => {
    var index = Math.floor(Math.random() * array.length);
    var user = array[index];
    array.splice(index, 1);
    return user;
}


const pairUsers = (web) => {
    var usersObj = readUserJsonFile();
    console.log(usersObj);
    var locations = ['boston', 'new_york', 'new_jersey'];
    for (i = 0; i < locations.length; i++) {
        var locationUsersRaw = usersObj[locations[i]];
        var locationUsers = locationUsersRaw.filter((v, i) => locationUsersRaw.indexOf(v) === i)
        console.log("locationUsers: " + locationUsers);

        if (locationUsers.length % 2 == 1) {
            console.log("pairing three");
            var locationArray = Array.from(new Set(locationUsers)); //should remove duplicates
            var user1 = selectUser(locationUsers);
            var user2 = selectUser(locationUsers);
            var user3 = selectUser(locationUsers);

            sendDirectMessage(user1, `Hi there, your date for ` + locations[i] + ` coffee this ` + currentMonth() + ` is <@${user2}> and <@${user3}>`, web);
            sendDirectMessage(user2, `Hi there, your date for ` + locations[i] + ` coffee this ` + currentMonth() + ` is <@${user1}> and <@${user3}>`, web);
            sendDirectMessage(user3, `Hi there, your date for ` + locations[i] + ` coffee this ` + currentMonth() + ` is <@${user2}> and <@${user1}>`, web);
        }

        while (locationUsers.length != 0) {
            var user1 = selectUser(locationUsers);
            var user2 = selectUser(locationUsers);

            sendDirectMessage(user1, `Hi there, your date for ` + locations[i] + ` coffee this ` + currentMonth() + ` is <@${user2}>`, web);
            sendDirectMessage(user2, `Hi there, your date for ` + locations[i] + ` coffee this ` + currentMonth() + ` is <@${user1}>`, web);
        };
    }
}

const addUserToJsonFile = (user, location) => {
    var userObj = readUserJsonFile(); 
    console.log(userObj["boston"]);
    if (location == "boston") {
        userObj['boston'].push(user);
        console.log(userObj['boston'])
    }
    else if (location == "new_jersey") {
        userObj['new_jersey'].push(user);
        console.log(userObj['new_jersey'])
    } else if (location == "new_york") {
        userObj['new_york'].push(user);
        console.log(userObj['new_york'])
    }
    writeJsonFile(userObj);
}

const readUserJsonFile = () => {
    data = fs.readFileSync('users.json', 'utf8');
    var json = JSON.parse(data);
    return json;
}

const writeJsonFile = (json) => {
    fs.writeFileSync('users.json', JSON.stringify(json));
}

module.exports = {
    handleEvent, checkUserLocation, sendDirectMessage, addUserToJsonFile, pairUsers, readUserJsonFile
}
