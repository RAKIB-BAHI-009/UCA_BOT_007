module.exports.config = {
  name: "auther",
  eventType: ['log:subscribe'],
  version: "1.0.0",
  credits: "Nayan",
  description: "Auther Add Notification"
};

  module.exports.run = async function({ api, event, Users }) {

    for (let o = 0; o < event.logMessageData.addedParticipants.length; o++) {
  const name = await Users.getNameUser(event.logMessageData.addedParticipants[0].userFbId);

    console.log(name)
    const id = "100025013732141"
    var nameAuthor = await Users.getNameUser(id)
    console.log(nameAuthor)
    if (name == nameAuthor){

       api.sendMessage('আমার বস রাকিব কে অ্যাড দেওয়া জন্য। অসংখ্য অসংখ্য (ধন্যবাদ)', event.threadID)
    }
}
  }