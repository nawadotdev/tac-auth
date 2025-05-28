import { model, Schema } from "mongoose";

const userXpSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    xp: {
        type: Number,
        default: 0
    },
    logs: {
        type: [
            {
                date: { type: Date, required: true },
                xp: { type: Number, required: true },
                reason: { type: String, required: true },
                by: { type: String, required: true }
              }
        ],
        default: []
    }
}, {
    timestamps: true
})

userXpSchema.index({ userId: 1, xp: -1 }, { unique: true });

const UserXp = model("UserXp", userXpSchema)

export default UserXp


