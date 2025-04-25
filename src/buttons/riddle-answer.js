import { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import RiddleUser from "../models/riddle-user.js"

export default {
    customId: "riddle-answer",
    execute : async interaction => {

        const randomId = Math.random().toString(36).substring(2, 10)

        const userRiddle1Answers = await RiddleUser.find({ userId: interaction.user.id, riddleId: 1 })
        const userRiddle2Answers = await RiddleUser.find({ userId: interaction.user.id, riddleId: 2 })

        if(userRiddle1Answers.length >= 5 && userRiddle2Answers.length >= 5) {
            return await interaction.reply({
                content: "You have already submitted 5 answers for both riddles.",
                ephemeral: true
            })
        }

        const modal = new ModalBuilder()
        .setCustomId(randomId)
        .setTitle("Submit Answer")

        if(userRiddle1Answers.length < 5){
            modal.addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setLabel("Riddle #1 Answer")
                        .setCustomId("riddle1")
                        .setPlaceholder("Enter your answer here")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(false)
                )
            )
        }

        if(userRiddle2Answers.length < 5){
            modal.addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setLabel("Riddle #2 Answer")
                        .setCustomId("riddle2")
                        .setPlaceholder("Enter your answer here")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(false)
                )
            )
        }

        await interaction.showModal(modal)
        const filter = i => i.customId === randomId && i.user.id === interaction.user.id

        await interaction.awaitModalSubmit({ filter, time: 120_000 }).then(async i => {

            const riddle1 = i.fields?.fields.get("riddle1")?.value;
            const riddle2 = i.fields?.fields.get("riddle2")?.value;

            await i.deferReply({ ephemeral: true })

            let embedDescription = ""

            if(userRiddle1Answers.length < 5 && riddle1){
                const riddle1Answer = new RiddleUser({
                    userId: i.user.id,
                    riddleId: 1,
                    riddleAnswer: riddle1
                })
                await riddle1Answer.save()
                embedDescription += `1️⃣ Congratulations! Your answer for Riddle #1 has been submitted.\n`
            }else if(userRiddle1Answers.length >= 5 && riddle1){
                embedDescription += `1️⃣ You have already submitted 5 answers for Riddle #1.\n`
            }

            if(userRiddle2Answers.length < 5 && riddle2){
                const riddle2Answer = new RiddleUser({
                    userId: i.user.id,
                    riddleId: 2,
                    riddleAnswer: riddle2
                })
                await riddle2Answer.save()
                embedDescription += `2️⃣ Congratulations! Your answer for Riddle #2 has been submitted.\n`
            }else if(userRiddle2Answers.length >= 5 && riddle2){
                embedDescription += `2️⃣ You have already submitted 5 answers for Riddle #2.\n`
            }

            if(!riddle1 && !riddle2){
                embedDescription += `You didn't submit any answer.\n`
            }

            await i.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Riddle Answers")
                        .setDescription(embedDescription)
                        .setFooter({ text: "TAC.build ~ nawadotdev" })
                ],
                ephemeral: true
            })



            
        })

    }
}