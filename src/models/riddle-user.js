import { model, Schema } from "mongoose"

const riddleUserSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    riddleId: {
        type: Number,
        required: true
    },
    riddleAnswer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const RiddleUser = model("RiddleUser", riddleUserSchema)

export default RiddleUser
