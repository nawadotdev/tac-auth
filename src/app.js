import "dotenv/config"
import { Client, Events, GatewayIntentBits } from "discord.js"
import { connectDb } from "./lib/db.js"
import { putCommands, getCommands } from "./utils/commands.js"
import auth from "./buttons/auth.js"
import post from "./buttons/post.js"
import check from "./buttons/check.js"
import init from "./commands/init.js"
import init2 from "./commands/init2.js"
import init3 from "./commands/init3.js"
import Auth from "./models/auth.js"
import early from "./utils/early.js"
import Riddle from "./models/riddle.js"
import riddleStart from "./buttons/riddle-start.js"
import riddleGenerate from "./buttons/riddle-generate.js"
import riddleSubmit from "./buttons/riddle-submit.js"
import { checkRiddlePost } from "./utils/post.js"
import riddleAnswer from "./buttons/riddle-answer.js"
import riddleShow from "./buttons/riddle-show.js"
import unlink from "./buttons/unlink.js"
import xp from "./commands/xp.js"
import rank from "./commands/rank.js"
import { writeFileSync } from "fs"
import init4 from "./commands/init4.js"
import checkRank from "./buttons/check-rank.js"

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions]
})

const _commands = [
    {
        name: "init",
        description: "Initialize the bot",
        default_member_permissions: '8',
        type: 1
    },
    {
        name: "init2",
        description: "Initialize the bot",
        default_member_permissions: '8',
        type: 1
    },
    {
        name: "init3",
        description: "Initialize the bot",
        default_member_permissions: '8',
        type: 1
    },
    {
        name: "init4",
        description: "Initialize the bot",
        default_member_permissions: '8',
        type: 1
    },
    xp.command.toJSON(),
    rank.command.toJSON()
]

client.on(Events.ClientReady, async (cl) => {
    console.log(`Logged in as ${cl.user.tag}`)

    const commands = await getCommands(cl.user.id)
    if (commands.length != _commands.length) {
        await putCommands(cl.user.id, _commands)
    }

    await putCommands(cl.user.id, _commands)

    const guild = await cl.guilds.fetch("1313636846852640870")
    // const members = await guild.members.fetch()


})

client.on(Events.InteractionCreate, async interaction => {
    console.log(`Interaction: ${interaction.customId || interaction.commandName} by ${interaction.user.username} in ${interaction.guild.name} @ ${new Date().toISOString()}`)
    let action;
    if (interaction.isButton()) {
        const customId = interaction.customId

        if (customId == "auth") action = auth
        if (customId == "post") action = post
        if (customId == "unlink") action = unlink

        if (customId == "check") action = check

        if (customId == "riddle-start") action = riddleStart
        if (customId == "riddle-generate") action = riddleGenerate
        if (customId == "riddle-submit") action = riddleSubmit

        if (customId == "riddle-answer") action = riddleAnswer
        if (customId == "riddle-show") action = riddleShow

        if (customId == "check-rank") action = checkRank

    } else if (interaction.isCommand()) {
        if (interaction.commandName == "init") action = init
        if (interaction.commandName == "init2") action = init2
        if (interaction.commandName == "init3") action = init3
        if (interaction.commandName == "init4") action = init4

        if (interaction.commandName == "xp") action = xp
        if (interaction.commandName == "rank") action = rank

    }

    if (!action) return

    try {
        await action.execute(interaction)
    } catch (e) {
        console.error(e)
        interaction.followUp({
            content: "An error occurred",
            ephemeral: true
        }).catch(() => { })
    }

})

connectDb().then(async () => {
    client.login(process.env.BOT_TOKEN)
})
