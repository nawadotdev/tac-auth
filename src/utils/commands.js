import "dotenv/config"
import { REST, Routes } from "discord.js"
import xp from "../commands/xp.js"

const token = process.env.BOT_TOKEN
const rest = new REST().setToken(token)

export const putCommands = async (clientId, commands) => {



    try {
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        )

        console.log(data)

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