module.exports = async(client, channel, member) => {
	if (member.id === client.user.id) return;
	let callTo, callFrom;
	try {
		callTo = await Calls.findOne({ "to.channelID": channel.id });
		if (!callTo) throw new Error();
	} catch (err) {
		try {
			callFrom = await Calls.findOne({ "from.channelID": channel.id });
		} catch (err2) {
			return null;
		}
	}
	if (callTo) {
		client.channels.get(callTo.from.channelID).startTyping(100);
	} else if (callFrom) {
		client.channels.get(callFrom.to.channelID).startTyping(100);
	}
};