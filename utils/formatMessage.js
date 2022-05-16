const formatMessage = (message) => {
    const type = message.messageType.split(/(?=[A-Z])/)[0]
    const re = /extendedTextMessage|templateButtonReplyMessage|conversation|messageContextInfo/

    let messageContent

    if (['extendedTextMessage', 'templateButtonReplyMessage'].indexOf(message.messageType) >= 0) {
        messageContent = Object.values(Object.values(message.message)[0])[0]
    } else if (message.messageType === 'messageContextInfo') {
        messageContent = Object.values(Object.values(message.message)[1])[1]
    }

    const obj = {
        container: message.sessionId,
        session: message.sessionId.split('-')[1],
        device: message.device.replace(/(^[0-9]+).*$/g, '$1'),
        event: 'on-message',
        type: re.test(message.messageType) ? 'text' : type,
        isMedia: !re.test(message.messageType),
        pushName: message.pushName,
        id: message.key.id,
        from: message.key.remoteJid.replace(/\D/g, ''),
        fromMe: message.key.fromMe,
        content: messageContent || message.message.conversation,
        isGroup: message.key.remoteJid.endsWith('@g.us'),
        timestamp: message.messageTimestamp?.low || message.messageTimestamp
    }

    return obj
}

export default formatMessage