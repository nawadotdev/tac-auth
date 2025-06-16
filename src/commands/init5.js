import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
    command : new SlashCommandBuilder()
        .setName("init5")
        .setDescription("Initialize the bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute : async interaction => {
        
        try{
            
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("submit-op1")
                    .setLabel("Submit Wallet Address")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("check-op1")
                    .setLabel("Check Wallet Address")
                    .setStyle(ButtonStyle.Primary),
            )

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x0099ff)
                        .setTitle("First Force Guaranteed Spots Community Raffle")
                        .setDescription("Congrats! You are qualified for the guaranteed phase raffle. Please submit your TON wallet and await for the raffle results.\n\nWallets holding 30 TON have a higher chance of winning the raffle.")
                        .setFooter({ text: "TAC.build ~ nawadotdev"})
                ],
                components: [row]
            })

        }catch(err){
            console.error(err)
            interaction.reply({
                content: "An error occurred",
                ephemeral: true
            })
        }

    }
}