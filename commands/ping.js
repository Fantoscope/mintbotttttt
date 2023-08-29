module.exports = {
    name: 'ping',
    description: 'pong',
    category: 'testing',
    async execute(message, args, prefix, bot) {
        message.reply(`pong! arguments: ${args}`)
    }
}