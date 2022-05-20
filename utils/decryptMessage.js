import { downloadContentFromMessage } from '@adiwajshing/baileys'

const decryptMessage = (message, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fileMessage = message.message[Object.keys(message.message)[0]]
            // download stream
            const stream = await downloadContentFromMessage(fileMessage, type)
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }

            resolve([buffer, fileMessage.fileName, fileMessage.mimetype])
        } catch (error) {
            console.error('Error to descrypt file', error)
            reject()
        }

    })
}

export default decryptMessage