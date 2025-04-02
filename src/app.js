import "dotenv/config"
import { Client, Events, GatewayIntentBits } from "discord.js"
import { connectDb } from "./lib/db.js"
import auth from "./buttons/auth.js"
import post from "./buttons/post.js"
import init from "./commands/init.js"
import { putCommands, getCommands } from "./utils/commands.js"
import { writeFileSync } from "fs"
import Auth from "./models/auth.js"

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
})

client.on(Events.ClientReady, async (cl) => {
    console.log(`Logged in as ${cl.user.tag}`)

    const commands = await getCommands(cl.user.id)
    if(!commands?.find(command => command.name == "init")) {
        await putCommands(cl.user.id)
    }

    const guild = await cl.guilds.fetch("1313636846852640870")
    const members = await guild.members.fetch()

    let str = ""
    members.forEach(member => {
        str += `${member.user.id}\n`
    })

    writeFileSync("members.txt", str)
})

// client.on(Events.InteractionCreate, async interaction => {

//     let action;
//     if (interaction.isButton()) {
//         const customId = interaction.customId

//         if (customId == "auth") action = auth
//         if (customId == "post") action = post

//     } else if (interaction.isCommand()) {
//         if (interaction.commandName == "init") {
//             action = init
//         }
//     }

//     if (!action) return

//     try {
//         await action.execute(interaction)
//     }catch(e) {
//         console.error(e)
//         interaction.followUp({
//             content: "An error occurred",
//             ephemerel: true
//         })
//     }

// })

connectDb().then(async () => {
    //client.login(process.env.BOT_TOKEN)
    const auth = await Auth.find()
    console.log(auth.length)
})
