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
                        .setDescription("Please click on the ‘Check Rank’ button below to check your rank in the TAC Force Board.\n\nNot all Discord activities earn ‘Snaps’. Read the <#1379084827914928220> channel to learn more about the TAC Snaps initiative.\n\nSnaps are awarded on a 24-48 hour basis and hence you don’t have to check it every hour.")
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