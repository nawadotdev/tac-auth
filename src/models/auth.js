import { model, Schema } from "mongoose";

const authSchema = new Schema({
    discordUsername: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        unique: true
    },
    verifier: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    tweetUrl : {
        type: String
    },
    token : {
        type: String
    },
    isDownloaded : {
        type: Boolean,
        default: false
    }
})

const Auth = model("Auth", authSchema)

export default Auth
