import "dotenv/config"
import { getTweet } from "./src/utils/post.js"
import { writeFileSync } from "fs"

getTweet("1907573820493332631").then((tweet) => {
    writeFileSync("tweet.json", JSON.stringify(tweet, null, 2))
})