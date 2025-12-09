import sharp from 'sharp';

export function saveAvatar (imageBuffer, imageName, destFolder) {
    return sharp(imageBuffer)
        .jpeg()
        .resize({
            fit: 'inside',
            width: 1920,
            height: 1080
        })
        .toFile(`${destFolder}/${imageName}.jpg`);
}