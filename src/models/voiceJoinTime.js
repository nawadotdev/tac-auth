import { Schema, model } from "mongoose"

const voiceJoinTimeSchema = new Schema({
    userId: { type: String, required: true },
    channelId: { type: String, required: true },
    joinTime: { type: Number, required: true }
})

const VoiceJoinTime = model("VoiceJoinTime", voiceJoinTimeSchema)

export default VoiceJoinTime