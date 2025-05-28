import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import UserXp from "../models/userxp.js";

export default {
    command : new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Check your rank"),
    execute : async interaction => {

        try{
            const userXp = await UserXp.findOne({userId : interaction.user.id});
            const rank = await UserXp.countDocuments({xp : {$gt : userXp.xp}}) + 1;


            await interaction.reply({
                embeds : [
                    new EmbedBuilder()
                    .setTitle(`${interaction.user.username} Stats`)
                    .setColor(0xf1c40f)
                    .addFields(
                        {
                            name : "Rank",
                            value : `**${rank}**`,
                            inline : true
                        },
                        {
                            name : "XP",
                            value : `**${userXp.xp}**`,
                            inline : true
                        }
                    )
                    .setFooter({ text: `TAC.build ~ nawadotdev` })
                ],
                ephemeral : true
            })
        } catch(err){
            console.error(err)
            interaction.reply({
                content: "An error occurred",
                ephemeral: true
            })
        }

    }
}