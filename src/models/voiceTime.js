import { Schema, model } from "mongoose"

const voiceTimeSchema = new Schema({
    userId: { type: String, required: true },
    channelId: { type: String, required: true },
    voiceTime: { type: Number, required: true }
})

const VoiceTime = model("VoiceTime", voiceTimeSchema)

export default VoiceTime