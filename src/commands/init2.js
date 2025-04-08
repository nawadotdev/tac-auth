import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
    command : new SlashCommandBuilder()
        .setName("init2")
        .setDescription("Initialize the bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute : async interaction => {
        
        try{
            
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("check")
                    .setLabel("Check")
                    .setStyle(ButtonStyle.Success),
            )

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("TAC Pilled")
                    .setDescription(`Early members form the core community so we want to award a small multiplier to such members. Please use the checker below to claim the role.\n\nNote: These Discord roles are multipliers and will be applicable only on top of the base KAITO score. Please ensure you are active on X and have claimed the TAC aligned role. `)
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