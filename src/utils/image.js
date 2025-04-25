import { createCanvas, loadImage } from "canvas"
import sharp from "sharp"

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

const downloadImage = async (url) => {

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const data = await sharp(Buffer.from(buffer)).png().toBuffer();
    return data;
  
  }

export const generateRiddleImage = async (username) => {

    const canvas = createCanvas(1920, 1080);
    const ctx = canvas.getContext("2d");
  
    const image = await loadImage("./background.png")
    ctx.drawImage(image, 0, 0, 1920, 1080);
  
    ctx.font = 'bold 64px "DM Sans"';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`@${username}`, 950, 300);

  
    return canvas.toBuffer("image/png");
  }