import { model, Schema } from "mongoose"

const riddleSchema = new Schema({
    riddleId : {
        type: Number,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
})

const Riddle = model("Riddle", riddleSchema)

export default Riddle