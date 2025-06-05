import UserXp from "../models/userxp.js";
import { EmbedBuilder } from "discord.js";

export default {
    customId: "check-rank",
    execute: async interaction => {

        try {
            const userXp = await UserXp.findOne({ userId: interaction.user.id });

            if (!userXp) {
                return interaction.reply({
                    content: "You haven't earned any snaps yet.",
                    ephemeral: true
                })
            }

            const rank = await UserXp.countDocuments({ xp: { $gt: userXp.xp } }) + 1;

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.user.username} Stats`)
                        .setColor(0xf1c40f)
                        .addFields(
                            {
                                name: "Rank",
                                value: `**${rank}**`,
                                inline: true
                            },
                            {
                                name: "Snaps",
                                value: `**${userXp.xp}**`,
                                inline: true
                            }
                        )
                        .setFooter({ text: `TAC.build ~ nawadotdev` })
                ],
                ephemeral: true
            })
        } catch (err) {
            console.error(err)
            interaction.reply({
                content: "An error occurred",
                ephemeral: true
            })
        }


    }
}