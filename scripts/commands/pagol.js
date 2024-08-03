module.exports.config = {
  name: "cipa", 
  version: "1.0.0", 
  permission: 0,
  credits: "Nayan",
  description: "",
  prefix: 'awto',
  category: "cipa", 
  usages: "cipa @", 
  cooldowns: 5,
  dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/canvas/`;
    if (!fs.existsSync(dirMaterial + "canvas")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "point.png")) request("https://i.imgur.com/tWypVTn.png").pipe(fs.createWriteStream(dirMaterial + "point.png"));
}

async function makeImage({ one, two }) {    
    const axios = require("axios");
    const fs = require("fs-extra");
    const path = require("path");
    const jimp = require("jimp");
    const __root = path.resolve(__dirname, "cache", "canvas");

    let point_image = await jimp.read(__root + "/point.png");
    let pathImg = __root + `/point_${one}.png`;
    let avatarOne = __root + `/avt_${one}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    point_image.composite(circleOne.resize(57, 57), 205, 162)

    let raw = await point_image.getBufferAsync("image/png");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);

    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args, client }) {
    const fs = require("fs-extra");
    let { threadID, messageID, senderID } = event;
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("চিপাবাজ ১ জন কে মেনশন করেন cipa @", event.threadID, event.messageID);
    else {
        var one  = mention;
        return makeImage({ one }).then(path => api.sendMessage({ body: event.mentions[mention].replace("@", "") + " এ এক নাম্বারের চিপাবাজ..!!😁", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
}
