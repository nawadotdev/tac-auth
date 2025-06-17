import Auth from "../models/auth.js"

const ALIGNED_ROLED_ID = "1356991876544200745"

export default {
    customId: "unlink",
    execute : async interaction => {

        const member = interaction.member
        if (!member) return

        await Auth.deleteMany({ userId: interaction.user.id })

        if(!member._roles.includes(ALIGNED_ROLED_ID)){
            return await interaction.reply({
                content: "You don't have the aligned role",
                ephemeral: true
            })
        }

        try{
            await interaction.deferReply({  ephemeral: true })

            await member.roles.remove(ALIGNED_ROLED_ID) 

            await Auth.deleteMany({ userId: interaction.user.id })
            await interaction.editReply({
                content: `You have been unlinked your account and lost <@&${ALIGNED_ROLED_ID}>. Redo all the steps to get it back.`,
                ephemeral: true
            })
        }catch(err){
            console.log(err)
        }





    }
}