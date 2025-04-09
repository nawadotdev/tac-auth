import { EmbedBuilder } from "discord.js"
import early from "../utils/early.js"

const EARLY_ROLE_ID = "1358890848980307978"
const ALIGNED_ROLED_ID = "1356991876544200745"
const ALIGNED_CHANNEL_ID = "1356999863568437339"

export default {
    customId: "check",
    execute: async interaction => {

        try {
            const member = interaction.member
            const guild = interaction.guild

            if (!member || !guild) return

            const isUserEarly = early(interaction.user?.id)
            const isUserAligned = member._roles?.includes(ALIGNED_ROLED_ID)

            if (isUserEarly && isUserAligned) {
                if (!member._roles?.includes(EARLY_ROLE_ID)) {
                    await member.roles.add(EARLY_ROLE_ID)
                }
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Green")
                            .setDescription(`Congrats, you have claimed the <@&${EARLY_ROLE_ID}> role + you have the <@&${ALIGNED_ROLED_ID}> role. Let your TAC Pilled journey begin.`)
                            .setFooter({ text: "TAC.build ~ nawadotdev" })
                    ],
                    ephemeral: true
                })
            } else if (isUserEarly && !isUserAligned) {
                if (!member._roles?.includes(EARLY_ROLE_ID)) {
                    await member.roles.add(EARLY_ROLE_ID)
                }
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Yellow")
                            .setDescription(`Congrats, you received the <@&${EARLY_ROLE_ID}> role but you haven't claimed the <@&${ALIGNED_ROLED_ID}> role. Get it here <#${ALIGNED_CHANNEL_ID}> and begin your journey. `)
                            .setFooter({ text: "TAC.build ~ nawadotdev" })
                    ],
                    ephemeral: true
                })
            } else if (!isUserEarly && !isUserAligned) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`You weren't early enough to claim the <@&${EARLY_ROLE_ID}> role but you aren't late to kick start your Tac Pilled journey, claim the role: <#${ALIGNED_CHANNEL_ID}>`)
                            .setFooter({ text: "TAC.build ~ nawadotdev" })
                    ],
                    ephemeral: true
                })
            } else {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`You weren't early enough to claim the <@&${EARLY_ROLE_ID}> role but you are eligible to participate in the TAC pilled campaign as you are <@&${ALIGNED_ROLED_ID}>. Start creating content related to TAC on X asap!`)
                            .setFooter({ text: "TAC.build ~ nawadotdev" })
                    ],
                    ephemeral: true
                })
            }



        } catch (err) {
            console.error(err)
            interaction.reply({
                content: "An error occurred",
                ephemeral: true
            })
        }

    }
}