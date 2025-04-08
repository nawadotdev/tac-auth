import "dotenv/config"
import { REST, Routes } from "discord.js"

const token = process.env.BOT_TOKEN
const rest = new REST().setToken(token)

export const putCommands = async (clientId) => {

    const commands = [
        {
            name: "init",
            description: "Initialize the bot",
            default_member_permissions: '8',
            type: 1
        },
        {
            name : "init2",
            description: "Initialize the bot",
            default_member_permissions: '8',
            type: 1
        }
    ]

    try {
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        )

        console.log("Successfully registered application commands")
    } catch (e) {
        console.error(e)
    }

}

export const getCommands = async (clientId) => {

    try {
        const result = await rest.get(
            Routes.applicationCommands(clientId)
        )

        return result
    } catch (e) {
        console.error(e)
    }

}