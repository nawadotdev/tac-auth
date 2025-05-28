import UserXp from "../models/userxp.js"

export default async (userId, xpToAdd, reason, by, isBulk = false, bulkData = []) => {
    if (isBulk) {

        const bulkOps = bulkData.map(user => {
            const logEntry = {
                date: new Date(),
                xp: user.xp,
                reason: reason,
                by: by
            }

            return {
                updateOne: {
                    filter: { userId: user.userId },
                    update: {
                        $inc: { xp: user.xp },
                        $push: { logs: logEntry }
                    },
                    upsert: true
                }
            }
        });


        const result = await UserXp.bulkWrite(bulkOps);
        return result;
    } else {

        const logEntry = {
            date: new Date(),
            xp: xpToAdd,
            reason: reason,
            by: by
        }

        const updatedDoc = await UserXp.findOneAndUpdate(
            { userId },
            {
                $inc: { xp: xpToAdd },
                $push: { logs: logEntry }
            },
            {
                new: true,
                upsert: true
            }
        )

        return updatedDoc;
    }
}
