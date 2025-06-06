import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import addXp from "../utils/addXp.js";
import UserXp from "../models/userxp.js";

export default {
    command: new SlashCommandBuilder()
        .setName("xp")
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Manage XP")
        .addSubcommandGroup(group => group
            .setName("individual")
            .setDescription("Manage XP for an individual user")
            .addSubcommand(sub => sub
                .setName("add")
                .setDescription("Add XP to a user")
                .addUserOption(option => option
                    .setName("user")
                    .setDescription("The user to add XP to")
                    .setRequired(true)
                )
                .addIntegerOption(option => option
                    .setName("xp")
                    .setDescription("The amount of XP to add")
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName("reason")
                    .setDescription("The reason for adding XP")
                    .setRequired(true)
                ))
            .addSubcommand(sub => sub
                .setName("remove")
                .setDescription("Remove XP from a user")
                .addUserOption(option => option
                    .setName("user")
                    .setDescription("The user to remove XP from")
                    .setRequired(true)
                )
                .addIntegerOption(option => option
                    .setName("xp")
                    .setDescription("The amount of XP to remove")
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName("reason")
                    .setDescription("The reason for removing XP")
                    .setRequired(true)
                )
            )
        )
        // .addSubcommandGroup(group => group
        //     .setName("bulk")
        //     .setDescription("Manage XP for multiple users")
        //     .addSubcommand(sub => sub
        //         .setName("add")
        //         .setDescription("Add XP to multiple users")
        //         .addIntegerOption(option => option
        //             .setName("xp")
        //             .setDescription("The amount of XP to add")
        //             .setRequired(true)
        //         )
        //         .addStringOption(option => option
        //             .setName("reason")
        //             .setDescription("The reason for adding XP")
        //             .setRequired(true)
        //         )
        //         .addAttachmentOption(option => option
        //             .setName("file")
        //             .setDescription("The file containing the list of users")
        //             .setRequired(true)
        //         )
        //         .addStringOption(option => option
        //             .setName("filetype")
        //             .setDescription("The type of file")
        //             .setRequired(true)
        //             .addChoices(
        //                 { name: "CSV", value: "csv" },
        //                 { name: "JSON", value: "json" }
        //             )
        //         )
        //     )
        //     .addSubcommand(sub => sub
        //         .setName("remove")
        //         .setDescription("Remove XP from multiple users")
        //         .addIntegerOption(option => option
        //             .setName("xp")
        //             .setDescription("The amount of XP to remove")
        //             .setRequired(true)
        //         )
        //         .addStringOption(option => option
        //             .setName("reason")
        //             .setDescription("The reason for removing XP")
        //             .setRequired(true)
        //         )
        //         .addAttachmentOption(option => option
        //             .setName("file")
        //             .setDescription("The file containing the list of users")
        //             .setRequired(true)
        //         )
        //         .addStringOption(option => option
        //             .setName("filetype")
        //             .setDescription("The type of file")
        //             .setRequired(true)
        //             .addChoices(
        //                 { name: "CSV", value: "csv" },
        //                 { name: "JSON", value: "json" }
        //             )
        //         )
        //     )
        // )
        // .addSubcommandGroup(group => group
        //     .setName("bulk-separate")
        //     .setDescription("Manage XP for multiple users with different amount of XP")
        //     .addSubcommand(sub => sub
        //         .setName("add")
        //         .setDescription("Add XP to multiple users")
        //         .addStringOption(option => option
        //             .setName("reason")
        //             .setDescription("The reason for adding XP")
        //             .setRequired(true)
        //         )
        //         .addAttachmentOption(option => option
        //             .setName("file")
        //             .setDescription("The file containing the list of users")
        //             .setRequired(true)
        //         )
        //         .addStringOption(option => option
        //             .setName("filetype")
        //             .setDescription("The type of file")
        //             .setRequired(true)
        //             .addChoices(
        //                 { name: "CSV", value: "csv" },
        //                 { name: "JSON", value: "json" }
        //             )
        //         )
        //     )
        //     .addSubcommand(sub => sub
        //         .setName("remove")
        //         .setDescription("Remove XP from multiple users")
        //         .addStringOption(option => option
        //             .setName("reason")
        //             .setDescription("The reason for removing XP")
        //             .setRequired(true)
        //         )
        //         .addAttachmentOption(option => option
        //             .setName("file")
        //             .setDescription("The file containing the list of users")
        //             .setRequired(true)
        //         )
        //         .addStringOption(option => option
        //             .setName("filetype")
        //             .setDescription("The type of file")
        //             .setRequired(true)
        //             .addChoices(
        //                 { name: "CSV", value: "csv" },
        //                 { name: "JSON", value: "json" }
        //             )
        //         )
        //     )
        // )
        .addSubcommand(group => group
            .setName("leaderboard")
            .setDescription("Get the XP leaderboard")
            // .addSubcommand(sub => sub
            //     .setName("top50")
            //     .setDescription("Get the top 50 users with the most XP")
            // )
            // .addSubcommand(sub => sub
            //     .setName("top100")
            //     .setDescription("Get the top 100 users with the most XP")
            // )
        )
    ,
    execute: async interaction => {

        const group = interaction.options.getSubcommandGroup();
        const subcommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser("user");
        const xpAmount = interaction.options.getInteger("xp");
        const reason = interaction.options.getString("reason");
        const file = interaction.options.getAttachment("file");
        const filetype = interaction.options.getString("filetype");

        if (group == "individual") {
            if (subcommand == "add") {
                await interaction.reply({
                    content: `Adding ${xpAmount} XP to ${user.username} for ${reason}`,
                    ephemeral: true
                })

                await addXp(user.id, xpAmount, reason, interaction.user.id)

                await interaction.editReply({
                    content: `Added ${xpAmount} XP to ${user.username} for ${reason}`,
                    ephemeral: true
                })
            } else if (subcommand == "remove") {

                await interaction.reply({
                    content: `Removing ${xpAmount} XP from ${user.username} for ${reason}`,
                    ephemeral: true
                })

                const userXp = await UserXp.findOne({ userId: user.id });
                if (!userXp || userXp.xp < xpAmount) {
                    return await interaction.editReply({
                        content: `Error: ${user.username} does not have enough XP to remove ${xpAmount} XP`,
                        ephemeral: true
                    })
                }

                await addXp(user.id, -xpAmount, reason, interaction.user.id)

                await interaction.editReply({
                    content: `Removed ${xpAmount} XP from ${user.username} for ${reason}`,
                    ephemeral: true
                })
            }
        } else if (group == "bulk") {
            let users;
            try {
                users = await readFile(file.url, filetype);
            } catch (err) {
                return await interaction.reply({
                    content: `Error reading file: ${err.message}`,
                    ephemeral: true
                });
            }
            if (subcommand == "add") {
                await interaction.reply({
                    content: `Adding ${xpAmount} XP to multiple users for ${reason}`,
                    ephemeral: true
                })

                await addXp(null, xpAmount, reason, interaction.user.id, true, users);

                await interaction.editReply({
                    content: `Added ${xpAmount} XP to multiple users for ${reason}`,
                    ephemeral: true
                });
            } else if (subcommand == "remove") {
                await interaction.reply({
                    content: `Removing ${xpAmount} XP from multiple users for ${reason}`,
                    ephemeral: true
                })

                await addXp(null, -xpAmount, reason, interaction.user.id, true, users);

                await interaction.editReply({
                    content: `Removed ${xpAmount} XP from multiple users for ${reason}`,
                    ephemeral: true
                });
            }
        } else if (group == "bulk-separate") {
            let users;
            try {
                users = await readFile(file.url, filetype);
            } catch (err) {
                return await interaction.reply({
                    content: `Error reading file: ${err.message}`,
                    ephemeral: true
                });
            }

            if (users.some(user => !user.xp)) {
                return await interaction.reply({
                    content: `Error: No XP amount found for some users`,
                    ephemeral: true
                });
            }

            if (subcommand == "add") {
                await interaction.reply({
                    content: `Adding XP to multiple users for ${reason}`,
                    ephemeral: true
                })

                await addXp(null, null, reason, interaction.user.id, true, users);

                await interaction.editReply({
                    content: `Added XP to multiple users for ${reason}`,
                    ephemeral: true
                });
            } else if (subcommand == "remove") {
                await interaction.reply({
                    content: `Removing XP from multiple users for ${reason}`,
                    ephemeral: true
                })

                await addXp(null, null, reason, interaction.user.id, true, users);

                await interaction.editReply({
                    content: `Removed XP from multiple users for ${reason}`,
                    ephemeral: true
                });
            }
        } else if (subcommand == "leaderboard") {
            await sendLeaderboard(interaction, 0, false);
            setupCollector(interaction.channel, interaction.user.id);

        }
    }
}

const readFile = async (fileUrl, filetype) => {
    const users = [];

    const response = await fetch(fileUrl);
    const fileContent = await response.text();

    if (filetype === "csv") {
        const rows = fileContent.split('\n');

        const headers = rows[0].split(',');
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(',');
            if (row == "") continue;
            if (row.length < headers.length) {
                throw new Error("Invalid CSV format");
            }
            const user = {};
            for (let j = 0; j < headers.length; j++) {
                user[headers[j].trim()] = row[j]?.trim();
            }
            users.push(user)
        }



    } else if (filetype === "json") {
        let fileData
        try {
            fileData = JSON.parse(fileContent);
        } catch (err) {
            throw new Error("Invalid JSON format");
        }

        if (!Array.isArray(fileData)) {
            throw new Error("Invalid JSON format");
        }

        users.push(...fileData)
    }


    if (users.length == 0) {
        throw new Error("No users found");
    }

    if (users.some(user => !user.userId)) {
        throw new Error("Invalid user format");
    }

    return users;
}

const PAGE_SIZE = 10;

async function sendLeaderboard(interaction, page = 0, update = false) {
  if (page < 0) page = 0;
  const skip = page * PAGE_SIZE;

  const users = await UserXp.find()
    .sort({ xp: -1 })
    .skip(skip)
    .limit(PAGE_SIZE);

  if (users.length === 0) {
    if (update) {
      return interaction.update({ content: "No data on this page.", components: [], ephemeral: true, embeds: [] });
    } else {
      return interaction.reply({ content: "No data on this page.", components: [], ephemeral: true, embeds: [] });
    }
  }

  const embed = new EmbedBuilder()
    .setTitle("TAC Force Board")
    .setColor(0xFFD700); 

  const ranks = [];
  const userMentions = [];
  const xps = [];

  users.forEach((u, i) => {
    ranks.push(`**${skip + i + 1}**`);
    userMentions.push(`<@${u.userId}>`);
    xps.push(`**${u.xp}**`);
  });

  embed.addFields(
    { name: "Rank", value: ranks.join("\n"), inline: true },
    { name: "User", value: userMentions.join("\n"), inline: true },
    { name: "Snaps", value: xps.join("\n"), inline: true }
  )
  embed.setFooter({ text: `TAC.build ~ nawadotdev` })

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`xp_prev_${page}`)
      .setLabel("⬅️ Previous")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page === 0),
    new ButtonBuilder()
      .setCustomId(`xp_next_${page}`)
      .setLabel("Next ➡️")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(users.length < PAGE_SIZE)
  );

  if (update) {
    await interaction.update({ embeds: [embed], components: [row], ephemeral: true });
  } else {
    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  }
}

// Collector function remains same
function setupCollector(channel, userId) {
  const filter = (i) =>
    i.user.id === userId &&
    (i.customId.startsWith("xp_prev_") || i.customId.startsWith("xp_next_"));

  const collector = channel.createMessageComponentCollector({ filter, time: 60000 });

  collector.on("collect", async (interaction) => {
    const [_, direction, currentPageStr] = interaction.customId.split("_");
    let page = parseInt(currentPageStr);

    if (direction === "next") page++;
    else if (direction === "prev") page--;

    if (page < 0) page = 0;

    await sendLeaderboard(interaction, page, true);
  });
}
