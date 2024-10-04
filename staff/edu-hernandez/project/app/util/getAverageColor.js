export default function getAverageColor(imageSrc) {

    return new Promise((resolve, reject) => {
        if (!imageSrc) {
            return reject(new Error('there is no image onload'))
        }

        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = imageSrc

        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            canvas.width = img.width
            canvas.height = img.height

            ctx.drawImage(img, 0, 0, img.width, img.height)

            const imageData = ctx.getImageData(0, 0, img.width, img.height)
            const pixels = imageData.data

            let r = 0, g = 0, b = 0
            const totalPixels = pixels.length / 4

            for (let i = 0; i < pixels.length; i += 4) {
                r += pixels[i]
                g += pixels[i + 1]
                b += pixels[i + 2]
            }

            r = Math.floor(r / totalPixels)
            g = Math.floor(g / totalPixels)
            b = Math.floor(b / totalPixels)

            resolve({ r, g, b })
        }
        img.onerror = () => {
            reject(new Error('error loading the image.'))
        }
    })
}