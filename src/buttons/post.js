import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import Auth from "../models/auth.js";
import { checkPost } from "../utils/post.js"

export default {
    customId: "post",
    execute: async interaction => {

        const existingAuth = await Auth.findOne({ userId: interaction.user.id, id: { $exists: true } });

        if (!existingAuth) {
            return interaction.reply({
                content: "You need to authenticate first",
                ephemeral: true
            })
        }

        const successfullAuth = await Auth.findOne({ userId: interaction.user.id, tweetUrl: { $exists: true, $ne: null } });
        const userHasRole = interaction.member._roles?.includes("1356991876544200745")
        if (successfullAuth && userHasRole) {
            return interaction.reply({
                content: "You've already submitted a post",
                ephemeral: true
            })
        }

        if (successfullAuth && !userHasRole) {
            await Auth.findByIdAndUpdate(successfullAuth._id, {
                $set: {
                    tweetUrl: null
                }
            })
        }

        const randomId = Math.random().toString(36).substring(2, 8);

        const modal = new ModalBuilder()
            .setCustomId(`post-${randomId}`)
            .setTitle("Post Proof")
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("link")
                        .setPlaceholder("Enter the link of your post")
                        .setLabel("Link")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                )
            )

        await interaction.showModal(modal)

        const interactionFilter = i => i.customId === `post-${randomId}`

        interaction.awaitModalSubmit({ time: 180_000, filter: interactionFilter }).then(async i => {
            try {
                const link = i.fields?.fields.get("link")?.value;
                if (!link) return i.reply({
                    content: "You need to enter a link",
                    ephemeral: true
                })

                await i.deferReply({ ephemeral: true })

                const postValid = await checkPost(existingAuth, link)

                if (!postValid) return i.editReply({
                    content: "The post is not valid",
                })

                await Auth.findByIdAndUpdate(existingAuth._id, {
                    $set: {
                        tweetUrl: link
                    }
                })

                await interaction.member.roles.add("1356991876544200745")

                await i.editReply({
                    content: "Post added successfully",
                    ephemeral: true
                })
            } catch (err) {
                const errCode = Math.floor(Math.random() * 1000000)
                console.log(`Error code : ${errCode}`)
                console.log(err)
                await i.editReply({
                    content: `An error occured. Please try again. Error code : ${errCode}`,
                    ephemeral: true
                })
            }

        }).catch(e => {
        })

    }
}