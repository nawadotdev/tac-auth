import { createCanvas, loadImage } from "canvas"
import { writeFileSync } from "fs"

export const createImage = async (auth) => {

    const canvas = createCanvas(1920, 1080)
    const ctx = canvas.getContext("2d")

    const image = await loadImage("./base.jpg")

    ctx.drawImage(image, 0, 0, 1920, 1080)

    ctx.font = "bold 50px DM Sans"
    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.fillText(`@${auth.username}`, 960, 700)

    return ctx.getImageData(0, 0, 1920, 1080)

}