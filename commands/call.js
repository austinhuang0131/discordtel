const fs = require("fs");
var calls = JSON.parse(fs.readFileSync("../json/call.json", "utf8"));
var fouroneone = JSON.parse(fs.readFileSync("./json/fouroneone.json", "utf8"));
var numbers = JSON.parse(fs.readFileSync("./json/.json", "utf8"));
var accounts = JSON.parse(fs.readFileSync("./json/account.json", "utf8"));
const Discord = require("discord.js");

module.exports = async(bot, message, args) => {
	let number = args;
	let mynumber = numbers.find(n => n.channel === message.channel.id);
	let ffoDocument = fouroneone.find(i => i.user === message.author.id);
	if (number === "") {
		message.reply("Damn son, you forgot the number! `>dial <Number>`");
		return;
	}
	if (number === "*ROM") {
		number = "03015050505";
	}
	if (number === "*233") {
		let account = accounts.find(a => a.user === message.author.id);
		if (!account) {
			account = { user: message.author.id, balance: 0 };
			accounts.push(account);
			fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
			message.reply("You don't have an account created... Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
		}
		if (account.balance < 500) {
			message.channel.sendEmbed(new Discord.RichEmbed()
				.setTitle("Current Number Status")
				.setDescription("You have less than 500 credits which means you cannot renew at all.")
				.addField("Number", mynumber.number)
				.addField("Expiration", `${mynumber.year}/${mynumber.month}`)
				.addField("Your Balance", account.balance)
				.addField("Recharging", "http://discordtel.readthedocs.io/en/latest/Payment/"));
			fouroneone.push({ user: message.author.id, status: "0" });
			return;
		} else if (!mynumber) {
			message.channel.sendEmbed(new Discord.RichEmbed()
				.setColor("#007FFF")
				.setTitle("Current Account Status")
				.addField("Your Balance", account.balance)
				.addField("Recharging", "http://discordtel.readthedocs.io/en/latest/Payment/"));
			return;
		} else {
			message.channel.sendEmbed(new Discord.RichEmbed()
				.setColor("#007FFF")
				.setTitle("Current Number Status")
				.setDescription("Type the amount of months you want to renew your number.")
				.addField("Number", mynumber.number)
				.addField("Expiration", `${mynumber.year}/${mynumber.month}`)
				.addField("Your Balance", account.balance)
				.addField("Recharging", "http://discordtel.readthedocs.io/en/latest/Payment/")
				.setFooter("To hang up, press `0`."));
			ffoDocument.status = "4";
			return;
		}
	}
	number = number.replace(/(a|b|c)/ig, "2").replace(/(d|e|f)/ig, "3").replace(/(g|h|i)/ig, "4")
		.replace(/(j|k|l)/ig, "5")
		.replace(/(m|n|o)/ig, "6")
		.replace(/(p|q|r|s)/ig, "7")
		.replace(/(t|u|v)/ig, "8")
		.replace(/(w|x|y|z)/ig, "9")
		.replace(/-/ig, "")
		.replace("(", "")
		.replace(")", "")
		.replace(" ", "");
	if (number === "*611") {
		number = "08006113835";
	} else if (number === "*611" && message.channel.guild !== undefined && message.channel.guild.id === "281815661317980160") {
		message.reply(":x: You are unable to call *611 here because Customer Support is literally at your doorstep.");
		return;
	}
	var yourchannel = numbers.find(item => item.number === number);
	if (yourchannel === undefined) {
		message.reply(":x: Dialing error: Requested number does not exist. Call `*411` to check numbers.");
		return;
	} else if (yourchannel.year < new Date().getFullYear()) {
		message.reply(":x: Dialing error: The number you've dialed has expired. Contact the number owner to renew it.");
		return;
	} else if (yourchannel.year === new Date().getFullYear() && yourchannel.month <= new Date().getMonth()) {
		message.reply(":x: Dialing error: The number you've dialed has expired. Contact the number owner to renew it.");
		return;
	}
	yourchannel = yourchannel.channel;
	if (mynumber === undefined) {
		message.reply(":x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service.");
		return;
	}
	if (number === mynumber.number) {
		message.reply(":thinking: I am wondering why you are calling yourself.");
		return;
	}
	if (mynumber.year === new Date().getFullYear() && mynumber.month <= new Date().getMonth()) {
		message.reply(":x: Billing error: Your number is expired. Renew your number by dialing `*233`.");
		return;
	}
	if (mynumber.year < new Date().getFullYear()) {
		message.reply(":x: Billing error: Your number is expired. Renew your number by dialing `*233`.");
		return;
	}
	mynumber = mynumber.number;
	var mychannel = message.channel.id;
	if (bot.channels.get(yourchannel) === undefined) {
		message.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted, hidden from the bot, or it left the corresponding server. Please dial `*611` for further instructions.");
		return;
	}
	var yourcall = calls.find(item => {
		if (item.from.number === number) {
			return item.from.number === number;
		} else if (item.to.number === number) {
			return item.to.number === number;
		}
	});
	if (yourcall) {
		message.reply(":x: Dialing error: The number you dialed is already in a call.");
		return;
	} else if (number === "08006113835") {
		bot.channels.get(yourchannel).send("<@&281815839936741377>");
	}
	message.reply(":telephone: Dialing... You are able to `>hangup`.");
	bot.channels.get("282253502779228160").send(`:telephone: A **normal** call is established between channel ${message.channel.id} and channel ${yourchannel} by __${message.author.username}#${message.author.discriminator}__ (${message.author.id}).`);
	calls.push({ from: { channel: mychannel, number: mynumber }, to: { channel: yourchannel, number: number }, status: false, time: Date.now() });
	fs.readFileSync("../json/call.json", JSON.stringify(calls), "utf8");
	bot.channels.get(yourchannel).send(`You received a call from \`(${mynumber.split("")[0]}${mynumber.split("")[1]}${mynumber.split("")[2]}${mynumber.split("")[3]}) ${mynumber.split("")[4]}${mynumber.split("")[5]}${mynumber.split("")[6]}-${mynumber.split("")[7]}${mynumber.split("")[8]}${mynumber.split("")[9]}${mynumber.split("")[10]}\`. Type \`>pickup\` or \`>hangup\`.`);
	setTimeout(() => {
		var call = calls.find(item => item.from.channel === message.channel.id);
		if (call !== undefined) {
			call = calls.find(item => {
				if (item.from.channel === message.channel.id) {
					return item.from.channel === message.channel.id;
				} else if (item.to.channel === message.channel.id) {
					return item.to.channel === message.channel.id;
				} else { return undefined; }
			});
			if (call.status === false && call.time <= Date.now() - 120000) {
				message.reply(":negative_squared_cross_mark: This call has expired (2 minutes).");
				bot.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
				calls.splice(calls.indexOf(call), 1);
				fs.readFileSync("../json/call.json", JSON.stringify(calls), "utf8");
				if (!mailbox_storage.find(a => a.channel === call.to.channel)) {
					bot.channels.get(call.from.channel).send(":x: Call ended; their mailbox isn't setup");
					return;
				}
				bot.channels.get(call.from.channel).send(`:x: ${mailbox_storage.find(a => a.channel === call.to.channel).settings.autoreply}`);
				bot.channels.get(call.from.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
				recentCall[call.from.channel] = call.to.number;
				bot.channels.get("282253502779228160").send(`:telephone: The call between channel ${call.from.channel} and channel ${call.to.channel} is expired.`);
			}
		}
	}, 120000);
};
