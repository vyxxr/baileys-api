const formatMessage = (message) => {
    const re = /extendedTextMessage|templateButtonReplyMessage|conversation|messageContextInfo|contactMessage/

    const isMedia = !re.test(message.messageType)
    const isGroup = message.key.remoteJid.endsWith('@g.us')

    let messageContent
    let type

    if (['extendedTextMessage', 'templateButtonReplyMessage'].indexOf(message.messageType) >= 0) {
        messageContent = Object.values(Object.values(message.message)[0])[0]
    } else if (message.messageType === 'messageContextInfo') {
        messageContent = Object.values(Object.values(message.message)[1])[1]
    } else if (message.messageType === 'contactMessage') {
        messageContent = Object.values(Object.values(message.message)[0])[1]
    }

    if (!isMedia) {
        if (message.type === 'contact') {
            type = 'contact'
        } else {
            type = 'text'
        }
    } else {
        type = message.type
    }

    let obj = {
        container: message.sessionId,
        session: message.sessionId.split('-')[1],
        device: message.device.replace(/(^[0-9]+).*$/g, '$1'),
        event: 'on-message',
        type: type,
        isMedia: isMedia,
        pushName: message.pushName,
        id: message.key.id,
        from: message.key.remoteJid.replace(/\D/g, ''),
        fromMe: message.key.fromMe,
        content: messageContent || message.message.conversation,
        isGroup: isGroup,
        timestamp: message.messageTimestamp?.low || message.messageTimestamp
    }

    if (isGroup) {
        obj = {
            ...obj,
            from: message.key.remoteJid,
            participant: message.key.participant.match(/\d+/g)[0]
        }
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