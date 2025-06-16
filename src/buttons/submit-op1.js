import { ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import UserWallet from "../models/userWallet.js";

export default {
    customId: "submit-op1",
    execute: async interaction => {

        const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        const modal = new ModalBuilder()
            .setCustomId(`submit-${randomId}`)
            .setTitle("Submit Your Wallet Address")
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("walletAddress")
                        .setLabel("Enter your TON wallet address (non custodial)")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                )
            )

        await interaction.showModal(modal)

        const interactionFilter = i => i.customId === `submit-${randomId}`

        interaction.awaitModalSubmit({ time: 180_000, filter: interactionFilter }).then(async i => {
                const walletAddress = i.fields?.fields.get("walletAddress")?.value;
                if (!walletAddress) return i.reply({
                    content: "You need to enter a wallet address",
                    ephemeral: true
                })

                await i.deferReply({ ephemeral: true })

                const wallet = await UserWallet.updateOne({
                    userId: i.user.id,
                    operation: "op1"
                }, {
                    $set: {
                        walletAddress: walletAddress,
                    }
                }, {
                    upsert: true,
                    new: true
                })

                if (wallet) {
                    return i.editReply({
                        content: `Your wallet address has been submitted successfully. \`${walletAddress}\``,
                        ephemeral: true
                    })
                }

                return i.editReply({
                    content: "Something went wrong",
                    ephemeral: true
                })
        }).catch(err => {
        })
    }
}