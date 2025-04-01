import { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
    command : new SlashCommandBuilder()
        .setName("init")
        .setDescription("Initialize the bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute : async interaction => {
        
        try{
            
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("auth")
                    .setLabel("Authenticate")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("post")
                    .setLabel("Post Proof")
                    .setStyle(ButtonStyle.Primary)
            )

            await interaction.reply({
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