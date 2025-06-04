import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
    command : new SlashCommandBuilder()
        .setName("init4")
        .setDescription("Initialize the bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute : async interaction => {
        
        try{
            
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("check-rank")
                    .setLabel("Check Rank")
                    .setStyle(ButtonStyle.Success),
            )

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x0099ff)
                        .setTitle("TAC Force Board")
                        .setDescription("Please click on the ‘Check Rank’ button below to know your rank in the TAC Force Board.\n\nNot all Discord activities earn ‘Snaps’. Read this for more #info about the TAC Snaps initiative.")
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