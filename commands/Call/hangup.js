module.exports = async(client, msg, suffix) => {
	let call = await Calls.find(c => c.to.channel == msg.channel.id || c.from.channel == msg.channel.id);
	if (!call) return;

	await Calls.newGet(call.id).delete();
	await msg.reply(":negative_squared_cross_mark: You hung up the call.");
	await client.apiSend(":x: The other side hung up the call.", msg.channel.id === call.from.channel ? call.to.channel : call.from.channel);
	await client.log(`:negative_squared_cross_mark: The call between channel ${call.from.channel} and channel ${call.to.channel} was hung up by __${msg.author.tag}__ (${msg.author.id}) on the ${msg.channel.id === call.from.channel ? "from" : "to"} side.`);

	// add stop typing things later?
};
