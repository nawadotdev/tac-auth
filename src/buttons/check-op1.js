import UserWallet from "../models/userwallet.js"

export default {
    customId: "check-op1",
    execute: async interaction => {

        await interaction.deferReply({ ephemeral: true })

        const userWallet = await UserWallet.findOne({ userId: interaction.user.id, operation: "op1" })

        if (!userWallet) {
            return interaction.editReply({
                content: "You haven't submitted your wallet address",
                ephemeral: true
            })
        } else {
            return interaction.editReply({
                content: `Your wallet address is \`${userWallet.walletAddress}\``,
                ephemeral: true
            })
        }
    }
}