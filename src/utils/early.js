import fs from "fs";
import path from "path";

const __dirname = path.resolve();


export default (userId) => {

    const earlyMembers = fs.readFileSync(path.join(__dirname, "members.txt"), "utf-8").split("\n").map(line => line.trim()).filter(line => line.length > 0);
    const isEarlyMember = earlyMembers.includes(userId);

    return isEarlyMember;

}