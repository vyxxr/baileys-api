const formatMessage = (message) => {
    const re = /extendedTextMessage|templateButtonReplyMessage|conversation|messageContextInfo/

    const isMedia = !re.test(message.messageType)

    let messageContent

    if (['extendedTextMessage', 'templateButtonReplyMessage'].indexOf(message.messageType) >= 0) {
        messageContent = Object.values(Object.values(message.message)[0])[0]
    } else if (message.messageType === 'messageContextInfo') {
        messageContent = Object.values(Object.values(message.message)[1])[1]
    }

    let obj = {
        container: message.sessionId,
        session: message.sessionId.split('-')[1],
        device: message.device.replace(/(^[0-9]+).*$/g, '$1'),
        event: 'on-message',
        type: !isMedia ? 'text' : message.type,
        isMedia: isMedia,
        pushName: message.pushName,
        id: message.key.id,
        from: message.key.remoteJid.replace(/\D/g, ''),
        fromMe: message.key.fromMe,
        content: messageContent || message.message.conversation,
        isGroup: message.key.remoteJid.endsWith('@g.us'),
        timestamp: message.messageTimestamp?.low || message.messageTimestamp
    }

    if (isMedia) {
        obj = {
            ...obj,
            blob: message.blob,
            filename: message.filename || "",
            mimetype: message.mimetype
        }
    }

    return obj
}

export default formatMessage