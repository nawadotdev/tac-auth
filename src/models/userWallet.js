import { model, Schema } from "mongoose"

const userWalletSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
    },
    operation: {
        type: String,
        required: true,
    }
})

const UserWallet = model("UserWallet", userWalletSchema)

export default UserWallet