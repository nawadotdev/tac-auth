import { EmbedBuilder } from "discord.js"
import RiddleUser from "../models/riddle-user.js"

export default {
    customId: "riddle-show",
    execute : async interaction => {

        const userRiddle1Answers = await RiddleUser.find({ userId: interaction.user.id, riddleId: 1 })
        const userRiddle2Answers = await RiddleUser.find({ userId: interaction.user.id, riddleId: 2 })

        if(userRiddle1Answers.length == 0 && userRiddle2Answers.length == 0) {
            return await interaction.reply({
                content: "You haven't submitted any answers yet",
                ephemeral: true
            })
        }

        const embed = new EmbedBuilder()
        .setTitle("Riddle Answers")
        .setColor("#00FF00")
        .setFooter({ text: "TAC.build ~ nawadotdev" })

        if(userRiddle1Answers.length) {
            embed.addFields({ name: "Riddle 1", value: `${userRiddle1Answers.map(answer => (`- ${answer.riddleAnswer}`)).join("\n")}` })
        }

        if(userRiddle2Answers.length) {
            embed.addFields({ name: "Riddle 2", value: `${userRiddle2Answers.map(answer => (`- ${answer.riddleAnswer}`)).join("\n")}` })
        }

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        })

    }
}