import "dotenv/config";
import { connectDb } from "./src/lib/db.js";
import auth from "./src/buttons/auth.js";

connectDb().then(async () => {
    auth.execute({ user : {
        id : "1234",
        username : "1234"
    } })
})