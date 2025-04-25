import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import RiddleUser from "../models/riddle-user.js"
import { checkRiddlePost } from "../utils/post.js"

export default {
    customId: "riddle-submit",
    execute: async interaction => {

        const user = await RiddleUser.findOne({ userId: interaction.user.id })

        if (!user || user?.riddleId < 2) {
            return await interaction.reply({
                content: "You need to complete the riddle challange first",
                ephemeral: true
            })
        }

        if (user.postUrl) {
            return await interaction.reply({
                content: "You have already submitted your post",
                ephemeral: true
            })
        }

        const randomId = Math.random().toString(36).substring(2, 10)
        const modal = new ModalBuilder()
            .setCustomId(randomId)
            .setTitle("Submit X Link")
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setLabel("Post Link")
                        .setCustomId("link")
                        .setPlaceholder("Enter your post link here")
                        .setRequired(true)
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                )
            )

        await interaction.showModal(modal)
        const filter = i => i.customId === randomId && i.user.id === interaction.user.id

        await interaction.awaitModalSubmit({ filter, time: 120_000 }).then(async i => {

            const link = i.fields?.fields.get("link")?.value;
            await i.deferReply({ ephemeral: true })

            const postValid = await checkRiddlePost(interaction.user.username, link)

            if (!postValid) {
                return await i.editReply({
                    content: "The post link is invalid, please check it and try again",
                    ephemeral: true
                })
            }

            await RiddleUser.updateOne({ userId: interaction.user.id }, { postUrl: link })

            await i.editReply({
                content: "Your post link has been submitted",
                ephemeral: true
            })

        }).catch(() => { })

    }
}