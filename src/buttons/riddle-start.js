import Riddle from "../models/riddle.js"
import RiddleUser from "../models/riddle-user.js"
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"

const generateImageButton = new ButtonBuilder()
    .setCustomId("riddle-generate")
    .setLabel("Generate Image")
    .setEmoji("🎨")
    .setStyle(ButtonStyle.Success)

const riddleEmbed = (question, id) => new EmbedBuilder()
    .setTitle(`Riddle #${id + 1}`)
    .setDescription(`${question}\n\nYou will have 2 minutes to enter answer after clicking the button.`)
    .setFooter({ text: "TAC.build ~ nawadotdev" })

const answerButton = (customId) => new ButtonBuilder()
    .setCustomId(`answer-${customId}`)
    .setLabel("Answer")
    .setStyle(ButtonStyle.Primary)

const nextButton = (customId) => new ButtonBuilder()
    .setCustomId(`next-${customId}`)
    .setLabel("Next Riddle")
    .setStyle(ButtonStyle.Primary)

const randomizer = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default {
    customId: "riddle-start",
    execute: async interaction => {

        try {

            await interaction.deferReply({ ephemeral: true })

            let user = await RiddleUser.findOne({ userId: interaction.user.id })

            if (!user) user = await RiddleUser.create({ userId: interaction.user.id })

            if (user.riddleId > 1) {
                return await interaction.editReply({
                    content: "Congratulations! You have already completed all riddles. Generate image and post it on X!",
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                generateImageButton
                            )
                    ]
                })
            }

            if (user.riddleId == 0) {
                await riddleOne(interaction, user)
            }

            if (user.riddleId == 1) {
                await riddleTwo(interaction, user)
            }

        } catch (err) {
            console.log(err)
        }

    }
}

const riddleOne = async (interaction, user) => {
    let riddle = await Riddle.findOne({ riddleId: 0 })
    let riddleDone = false
    if (!riddle) {
        return await interaction.editReply({
            content: "Riddle not found, contact the developer.",
        })
    }
    let embed = riddleEmbed(riddle.question, 0)
    let randomId = randomizer()
    await interaction.editReply({
        embeds: [embed],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    answerButton(randomId),
                )
        ]
    })

    const collectorFilter = i => i.customId == `answer-${randomId}`
    const collector = interaction.channel.createMessageComponentCollector({ filter: collectorFilter, time: 300_000 });

    collector.on("collect", async i => {

        let randomId = randomizer()
        let modal = new ModalBuilder()
            .setCustomId(`riddle-answer-${randomId}`)
            .setTitle("Riddle Answer")
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId("answer")
                            .setStyle(TextInputStyle.Short)
                            .setLabel("Answer")
                            .setPlaceholder("Write your answer here!")
                            .setRequired(true)
                    )
            )

        await i.showModal(modal)
        const filter = i => i.customId == `riddle-answer-${randomId}` && i.user.id == interaction.user.id
        await i.awaitModalSubmit({ filter, time: 120_000 }).then(async m => {
            await m.deferReply({ ephemeral: true })
            const answer = m.fields?.fields.get("answer")?.value;
            if (!answer) {
                await m.editReply({
                    content: "Please enter an answer.",
                    ephemeral: true
                })
            }
            if (answer.toLowerCase() != riddle.answer.toLowerCase()) {
                await m.editReply({
                    content: "Wrong answer, try again!",
                    ephemeral: true
                }).then(() => {
                    setTimeout(() => {
                        m.deleteReply().catch(() => { })
                    }, 5000)
                })
            }
            if (answer.toLowerCase() == riddle.answer.toLowerCase()) {
                let randomId = randomizer()
                await m.editReply({
                    content: "Correct answer! You have completed Riddle #1.",
                    ephemeral: true,
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                nextButton(randomId)
                            )
                    ]
                })
                user.riddleId = 1
                user.save()
                riddleDone = true

                
                let collectorFilter = i => i.customId == `next-${randomId}`
                let collector = interaction.channel.createMessageComponentCollector({ filter: collectorFilter, time: 300_000, max: 1 });
                collector.on("collect", async x => {
                    await riddleTwo(interaction, user)
                })


            }
        }).catch(() => { })

    })

    collector.on("end", async collected => {
        if (!riddleDone) {
            return await interaction.editReply({
                content: "Riddle #1 not solved, try again! (You should re-click start button if you can't answer it in 5 mins.)",
                ephemeral: true,
                components: []
            }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply().catch(() => { })
                }, 5000)
            })
        }
    })
}

const riddleTwo = async (interaction, user) => {
    let riddle = await Riddle.findOne({ riddleId: 1 })
    let riddleDone = false
    if (!riddle) {
        return await interaction.editReply({
            content: "Riddle not found, contact the developer.",
        })
    }
    let embed = riddleEmbed(riddle.question, 1)
    let randomId = randomizer()
    await interaction.editReply({
        embeds: [embed],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    answerButton(randomId),
                )
        ]
    })

    const collectorFilter = i => i.customId == `answer-${randomId}`
    const collector = interaction.channel.createMessageComponentCollector({ filter: collectorFilter, time: 300_000 });

    collector.on("collect", async i => {
        let randomId = randomizer()
        let modal = new ModalBuilder()
            .setCustomId(`riddle-answer-${randomId}`)
            .setTitle("Riddle Answer")
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId("answer")
                            .setStyle(TextInputStyle.Short)
                            .setLabel("Answer")
                            .setPlaceholder("Write your answer here!")
                            .setRequired(true)
                    )
            )

        await i.showModal(modal)
        const filter = i => i.customId == `riddle-answer-${randomId}` && i.user.id == interaction.user.id
        await i.awaitModalSubmit({ filter, time: 120_000 }).then(async m => {
            const answer = m.fields?.fields.get("answer")?.value;
            if (!answer) {
                await m.reply({
                    content: "Please enter an answer.",
                    ephemeral: true
                })
            }
            if (answer.toLowerCase() != riddle.answer.toLowerCase()) {
                await m.reply({
                    content: "Wrong answer, try again!",
                    ephemeral: true
                }).then(() => {
                    setTimeout(() => {
                        m.deleteReply().catch(() => { })
                    }, 5000)
                })
            }
            if (answer.toLowerCase() == riddle.answer.toLowerCase()) {
                await m.deferUpdate()
                await interaction.editReply({
                    content: "Correct answer! You have completed Riddle #2! Generate image and post on X!",
                    ephemeral: true,
                    embeds: [],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                generateImageButton
                            )
                    ]
                })
                user.riddleId = 2
                riddleDone = true
                await user.save()
                collector.stop()
            }
        }).catch(() => { })

    })

    collector.on("end", async collected => {
        if (!riddleDone)
            return await interaction.editReply({
                content: "Riddle #2 not solved, try again! (You should re-click start button if you can't answer it in 5 mins.)",
                ephemeral: true,
                components: []
            }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply().catch(() => { })
                }, 5000)
            })
    })

}