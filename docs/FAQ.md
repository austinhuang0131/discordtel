# FAQ
If this page does not answer your question, feel free to `>dial *611` from any DTel number.

* [Basics](#basics)
* [Advanced](#advanced)
* [Trivia](#trivia)

## Basics
* [Setup](#setup)
* [Call commands](#what-commands-can-i-use-during-a-call)
* [Renewal](#how-do-i-keep-my-number-alive)
* [Rules](#rules)

### Setup
#### How do I get a number?
Use `>wizard` to get a number. Follow the prompts.

#### Can I use this bot in DMs?
Yes! All features are equally available to server and DM numbers.

### How do I receive calls from people?
Anyone who knows your number can `>dial` it. To allow your number to receive random calls (`>rdial`), you need to be registered in the yellow pages. You can register in one of 2 ways:

* During `>wizard`, after entering your number, the bot will ask you to put a description. If provided, your number will be registered in the yellow pages.
* If you skipped the aforementioned step during your registration, you can `>dial *411`, then enter `2`. Follow the prompts.

You can also use `>promote` to promote your number in DTel's support server,nat a cost of 100 credits. (You can only promote every 7 days.)

#### How do I call a specific number?
`>dial <number>`

Letters will be converted to the corresponding number. For example, `>dial 0301DISCORD` will dial `03013472673`, which is the public payphone for the support server.

#### How do I find people to call?
* Join the support server and check out #promote-your-number.
* `>rdial` allows you to dial a random number on the yellow pages.
* You can `>dial *411`, then enter `1`, to search the yellow pages. You can either...
  * Enter a query (e.g. `roleplay`) to search numbers by their descriptions, or
  * Enter a page number (e.g. `2`) to browse the yellow pages.

### What commands can I use during a call?
* `>pickup` & `>hangup` (remember to hang up a call, or the bot will keep reminding you!)
* `>hold`: Puts the call on hold. Everything you say after the command will not be sent over, unless you remove the hold by using `>hold` again.
  * Tip: A quoted message (messages starting with `>`) will not be sent either.
* `>transfer <number>`: Transfer the call to another number. This is equivalent to you using `>hangup` and the other side using `>dial <number>`.
* `>pay <user (ID or mention)> <amount> [optional: message]`: Pay people in a call! Convenient for phoning restaurants or cafes. Roleplay ones, of course. (Fees apply; currently 27.1%, subject to change.)

### How do I keep my number active?
DTel will charge you in-bot credits to make sure all numbers are being actively used. A number, once expired, can no longer receive or make calls, until you
(or someone else) renew it. Numbers expired for more than one (1) month will be deleted.

To learn about how to get credits, see [here](./Payment). For each number, the bot will automatically try to deduct 500 credits from the *server owner's* account, within 24 hours *before* the number expires. If successful, the bot will renew the number for another month, otherwise a warning will be sent.

### Rules
These rules extend other applicable terms, including the Discord ToS and Community Guidelines.

* The following contents are prohibited on DTel *unless* both parties have explicitly consented to sending/receiving them:
  * NSFW
  * Advertisements
  * Shock contents
* No harassments in any form.
* DTel Staff reserves right to punish any user for any reason, including but not limited to the rules above.

## Advanced
* [Messaging](#messaging)
* [Blocking numbers](#how-do-i-stop-a-number-from-calling-me)
* [Removing your number](#how-do-i-remove-my-number)

### Messaging
You can send a message to any mailbox-enabled number by using `>message <number> <message>`. Each message costs 2 credits each.

To open/close your mailbox, or to see/manage messages, use `>mailbox`.

### How do I stop a number from calling me?
`>block <number>`

If the number is abusing, please report it to us by using `>dial *611`.

### How do I remove my number?
If you still plan to use DTel in your server: `>dial *611`. To request a refund for paid credits, please notify Customer Support in the call. No refunds if there is less than one (1) month left before the expiry.

If you kick the bot: Your number will be removed within 24 hours. No refund will be provided.

## Trivia
You don't need these to use the bot: these are just interesting facts.

### Why did you make this bot?
Why not?

* Some people miss the days when the internet wasn't *that* popular and people still called/texted each other on their  phones. This bot attempts to rebuild a similar experience.
* Roleplays are proven to be a cash cow for online platforms - refer to Roblox. (In reality, it didn't earn *that* much, but at least it *earns* without, say, paywalling like Mee6.)

### Why is it called DTel?
Because apparently we can't name it DiscordTel (which, by the way, was the bot's previous name prior to verification), otherwise we can't get it verifed by
Discord.

### Why are the numbers formatted like that?
* `0301` ~ `0309`: Regular server numbers. These can be acquired through `>wizard` in a server channel. The last digit is the respective shard ID +1.
* `0900`: Regular DM numbers. These can be acquired through `>wizard` in a DM channel.
* `0800`: Server numbers that are assigned for servers that provide a service. These are manually assigned by Bosses.

DTel numbers generally follow [the UK style](https://en.wikipedia.org/wiki/Telephone_numbers_in_the_United_Kingdom#Three-digit_area_codes) (4-digit prefix, 7-digit number), although special numbers (like `*611` being [support](https://en.wikipedia.org/wiki/6-1-1), `*411` being [directory](https://en.wikipedia.org/wiki/4-1-1), and `*233` = `*ADD` being [refill](https://www.t-mobile.com/support/plans-features/self-service-short-codes#thirdheading)) follow the North American style.

<script data-goatcounter="https://dtel.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
