import Auth from "../models/auth.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js" 
import { generateCodeVerifier, generateCodeChallenge, generateAuthLink } from "../utils/twitter.js";

export default {
    customId : "auth",
    execute : async interaction => {

        //check user's pre auth requests, if there's any successfull auth, return
        const existingAuth = await Auth.findOne({userId : interaction.user.id, tweetUrl : { $exists : true }});
        if(existingAuth) {
            return interaction.reply({
                content : "You're already authenticated",
                ephemeral : true
            })
        }

        await Auth.deleteMany({userId : interaction.user.id});

        //create a unique state for the user, 16 char, all uppercase
        const state = Math.random().toString(36).substring(2, 18).toUpperCase();
        const verifier = generateCodeVerifier();

        //save the state to the db
        const preAuth = new Auth({
            state: state,
            userId: interaction.user.id,
            verifier,
            discordUsername: interaction.user.username
        })

        await preAuth.save();

        //create an auth link with the state
        const challenge = await generateCodeChallenge(verifier)
        const authLink = generateAuthLink(state, challenge);

        //redirect the user to the auth page
        interaction.reply({
            embeds : [
                new EmbedBuilder()
                .setTitle("Authentication")
                .setDescription("Click on Authenticate and link your Discord with your X account")
            ],
            components : [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Authenticate!")
                    .setURL(authLink)
                )
            ],
            ephemeral : true
        })

    }
}