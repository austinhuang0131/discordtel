/* eslint-disable no-undef */
(async() => {
	let r = await require("./Database/init")()
		.then(() => winston.info("[Database] Successfully connected to the database."))
		.catch(err => winston.error(`[Database] An error occurred while initializing the database.\n${err}`));

	const tables = [
		"Accounts",
		"Blacklist",
		"Busy",
		"Calls",
		"Cooldowns",
		"Lottery",
		"Mailbox",
		"Numbers",
		"OldCalls",
		"Phonebook",
		"Strikes",
		"Whitelist",
	];

	let dblist = await r.dbList().run();
	if (!dblist.includes(db.db)) await r.dbCreate(db.db);
	let tablelist = await r.tableList().run();
	for (let i of tables) if (!tablelist.includes(i)) await r.tableCreate(i).run();


	require("./Mongo/database.js").initialize("mongodb://discordtel:g1Iwtzk9syKc@127.0.0.1/discordtel").then(() => {
		console.log("Database initialized!");
	}).catch(err => {
		console.log(`Failed to initialize Database`, err);
		process.exit(1);
	});

	let accounts = await Accounts.find({});
	for (let i of accounts) {
		console.log("moved acc" + i._id)
		await r.table("Users").insert({ id: i._id, balance: i.balance, daily: false });
	}

	let numbers = await Numbers.find({});
	for (let i of numbers) {
		console.log("moved num" + i._id)
		await r.table("Numbers").insert({
			id: i.number,
			channel: i._id,
		});
	}

	let blacklist = await Blacklist.find({});
	for (let i of blacklist) {
		console.log("moved black" + i._id)
		await r.table("Blacklist").insert({ id: i._id });
	}

	let mailbox = await Mailbox.find({});
	for (let i of mailbox) {
		console.log("moved mailbox" + i._id)
		await r.table("Mailbox").insert({ id: i._id, autoreply: i.settings.autoreply });
	}

	let phonebook = await Phonebook.find({});
	for (let i of phonebook) {
		console.log("moved phonebook" + i._id)
		await r.table("Phonebook").insert({ id: i._id, description: i.description });
	}

	let strikes = await Strikes.find({});
	for (let i of strikes) {
		console.log("moved strikes" + i._id)
		await r.table("Strikes").insert({ id: i._id, type: i.type, offender: i.offender, reason: i.reason, creator: i.creator });
	}
})();
