import { EmbedBuilder } from "discord.js"
import RiddleUser from "../models/riddle-user.js"

export default {
    customId: "riddle-show",
    execute : async interaction => {

        const userRiddle1Answers = await RiddleUser.find({ userId: interaction.user.id, riddleId: 1 }).sort({ createdAt: -1 })
        const latestAnswer = userRiddle1Answers[0]?.riddleAnswer
        const userRiddle2Answers = await RiddleUser.find({ userId: interaction.user.id, riddleId: 2 })
        const latestAnswer2 = userRiddle2Answers[0]?.riddleAnswer

        if(userRiddle1Answers == null && userRiddle2Answers == null) {
            return await interaction.reply({
                content: "You haven't submitted any answers yet",
                ephemeral: true
            })
        }

        const embed = new EmbedBuilder()
        .setTitle("Riddle Answers")
        .setColor("#00FF00")
        .setFooter({ text: "TAC.build ~ nawadotdev" })

        if(latestAnswer) {
            embed.addFields({ name: "Riddle 1", value: `${latestAnswer}` })
        }

        if(userRiddle2Answers) {
            embed.addFields({ name: "Riddle 2", value: `${latestAnswer2}` })
        }

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        })

    }
}