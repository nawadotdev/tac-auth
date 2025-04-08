import "dotenv/config"
import { Client, Events, GatewayIntentBits } from "discord.js"
import { connectDb } from "./lib/db.js"
import { putCommands, getCommands } from "./utils/commands.js"
import auth from "./buttons/auth.js"
import post from "./buttons/post.js"
import check from "./buttons/check.js"
import init from "./commands/init.js"
import init2 from "./commands/init2.js"
import Auth from "./models/auth.js"

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
})

client.on(Events.ClientReady, async (cl) => {
    console.log(`Logged in as ${cl.user.tag}`)

    const commands = await getCommands(cl.user.id)
    if(!commands?.find(command => command.name == "init") || !commands?.find(command => command.name == "init2")) {
        await putCommands(cl.user.id)
    }

})

client.on(Events.InteractionCreate, async interaction => {

    let action;
    if (interaction.isButton()) {
        const customId = interaction.customId

        if (customId == "auth") action = auth
        if (customId == "post") action = post
        if (customId == "check") action = check

    } else if (interaction.isCommand()) {
        if (interaction.commandName == "init") {
            action = init
        }else if (interaction.commandName == "init2") {
            action = init2
        }
    }

    if (!action) return

    try {
        await action.execute(interaction)
    }catch(e) {
        console.error(e)
        interaction.followUp({
            content: "An error occurred",
            ephemerel: true
        })
    }

})

connectDb().then(async () => {
    client.login(process.env.BOT_TOKEN)
})
