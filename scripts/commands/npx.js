const fs = require("fs");
module.exports = {
  config:{
	name: "raisa",
        version: "1.0.1",
        prefix: false,
	permssion: 0,
	credits: "nayan", 
	description: "Fun",
	category: "no prefix",
	usages: "😅",
        cooldowns: 5, 
},

handleEvent: function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
  const content = event.body ? event.body : '';
  const body = content.toLowerCase();
	if (body.indexOf(" ")==0 || body.indexOf("raisa")==0 || body.indexOf("সখের নারী")==0 || body.indexOf("রাইসা")==0) {
		var msg = {
				body: "< মানুষ ছেড়ে গেলেও তার স্মৃতি ছেড়ে যায় না..!!😅",
				attachment: fs.createReadStream(__dirname + `/Rakib/r.mp3`)
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("😅", event.messageID, (err) => {}, true)
		}
	},
	start: function({ nayan }) {

  }
}
