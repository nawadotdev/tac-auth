import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

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
                embeds: [
                    new EmbedBuilder()
                    .setTitle("TAC Aligned")
                    .setDescription(`In order to be eligible for the TAC pilled campaign, please ensure you do the following:\n\n*⁠Follow https://x.com/TacBuild\n*⁠Click on ‘Authenticate’ and link your Discord and X account.\n*Click "Post on X" button.\n*Submit the link below and get the role 'Tac Aligned' role.`)
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