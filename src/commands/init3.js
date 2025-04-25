import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
    command: new SlashCommandBuilder()
        .setName("init3")
        .setDescription("Initialize the bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async interaction => {

        try {

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("riddle-answer")
                    .setLabel("Submit Answer")
                    .setEmoji("🎮")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("riddle-show")
                    .setLabel("Show Answers")
                    .setEmoji("📜")
                    .setStyle(ButtonStyle.Success),
                // new ButtonBuilder()
                //     .setCustomId("riddle-generate")
                //     .setLabel("Generate Image")
                //     .setEmoji("🎨")
                //     .setStyle(ButtonStyle.Success),
                // new ButtonBuilder()
                //     .setCustomId("riddle-submit")
                //     .setLabel("Submit X Link")
                //     .setEmoji("✅")
                //     .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Contact Developer")
                    .setURL("https://x.com/nawadotdev")
            )

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("TAC Easter Egg Riddles")
                        .addFields(
                            {
                                name: "How To Play",
                                value: `1️⃣ Read both the riddles carefully.\n2️⃣ Once the answers are ready, click the ‘🎮Submit Answer’ button. \n3️⃣ Enter your answers in the appropriate input box and click ‘Submit.’\n4️⃣ Not happy with your attempt? Click ‘🎮 Submit Answer’ button again to re-submit your answers.\nYou can take up to 5 attempts by following the same process.\nBoth of your submitted answers must be correct in the respective attempt to win the easter hunt. ✅\nSay you get Riddle #1 right, but answer Riddle #2 incorrectly in the same attempt. Such an attempt won’t count as a win. 🚫\n5️⃣ To review answers for any attempt, click the ‘Show Answers’ button.
`
                            },
                            {
                                name: "Riddle #1",
                                value: "Think of a place where numbers dance. A club where a genius once took his chance. This secret math code is now part of TAC’s lore What's the number we're looking for?",
                            },
                            {
                                name: "Riddle #2",
                                value: "Between ancient peaks where magic flows. A mystic city's name still glows. In this realm of spells and ancient stone. A founder's early tales are told."
                            }
                        )
                        .setFooter({ text: "TAC.build ~ nawadotdev" })
                ],
                components: [row]
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