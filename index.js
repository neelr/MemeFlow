const discord = require('discord.js');
const testChannel = "575022379756027904";
require("custom-env").env()
rip = false;
const client = new discord.Client();
const snekfetch = require('snekfetch');
thingy = async (client, message, args) => {
    try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/dankmemes/new/.json')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        .setFooter("Memes provided by r/dankmemes")
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
}
client.on('ready', () => {
    console.log('MemeSpam is on and connected');
    client.user.setActivity('memes are in da house', { type: 'PLAYING' })
    try {
        client.channels.get(testChannel).send('MEMEM BOT IS IN DA HOUSEEEEEEE');
    } catch {
        console.log("This is not debug mode..... yeet");
    }
});
function waiter(msg) {
    console.log("BOOP");
}
client.on('message', (message) => {
    if (message.content == "{}start") {
        message.channel.send("THE MEMEFLOW HAS BEGUN!!!!!!!!!!!!!!!")
        mannn = setInterval(function() {
            thingy(client,message,rip)
            if (rip) {
		message.channel.send("STOPPPEDDDD!!!!");
		rip = false;
                clearInterval(mannn);
            }
        },10000);
    } else if (message.content == "{}stop") {
        rip = true;
        message.channel.send("Memeflow will soon stop....")
    }if (message.content == "{}help") {
			message.channel.send("**SIMPLE...** \n `{}start` for memeflow \n `{}stop` to stop it \n **KEEEP BEING A MEMEMEMEMEM!!!!!**")
		}
        
});

client.login(process.env.TOKEN);
