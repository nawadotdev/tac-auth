import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import RiddleUser from "../models/riddle-user.js"
import { generateRiddleImage } from "../utils/image.js"

export default {
    customId: "riddle-generate",
    execute: async interaction => {

        const user = await RiddleUser.findOne({ userId: interaction.user.id })

        if(!user || user?.riddleId < 2) {
            return await interaction.reply({
                content: "You need to complete the riddle challange first",
                ephemeral: true
            })
        }

        const image = await generateRiddleImage(interaction.user.username, interaction.user.displayAvatarURL())
        await interaction.reply({
            content: "Here is your riddle card",
            files: [image],
            ephemeral: true
        })

        // const avatarUrl = interaction.user.displayAvatarURL() 
        // const imageLink = `https://link.tac.build/api/riddle-card?username=${interaction.user.username}&avatar=${avatarUrl}`
        // const url = `https://x.com/intent/post?text=${encodeURIComponent(imageLink)}`;

        // await interaction.reply({
        //     content: imageLink,
        //     components: [
        //         new ActionRowBuilder()
        //         .addComponents(
        //             new ButtonBuilder()
        //             .setStyle(ButtonStyle.Link)
        //             .setLabel("Post on X")
        //             .setURL(url)
        //         )
        //     ],
        //     ephemeral: true
        // })
    }
}