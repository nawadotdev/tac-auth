import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

const ALIGNED_CHANNEL_ID = "1356999863568437339"

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
                    .setTitle("TAC Pilled Campaign: Early Role Claim")
                    .setDescription(`Early members form the core community so we want to award a small multiplier to such members. Please use the checker below to claim the role.\n\nNote: These Discord roles are multipliers and will be applicable only on top of the base KAITO score. Please ensure you are active on X and have claimed the TAC aligned (<#${ALIGNED_CHANNEL_ID}>) role.`)
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