const Discord = require('discord.js');
module.exports = (client) => {
    client.templateEmbed = function () {
        return new Discord.EmbedBuilder()
            .setAuthor({
                name: client.user.username,
                iconURL: client.user.avatarURL({ size: 1024 })
            })
            .setColor(client.config.colors.normal)
            .setFooter({
                text: client.config.discord.footer,
                iconURL: client.user.avatarURL({ size: 1024 })
            })
            .setTimestamp();
    }

    client.errorNormal = async function ({
        embed: embed = client.templateEmbed(),
        error: error,
        type: type,
        content: content,
        components: components
    }, interaction) {
        embed.setTitle(`Error!`)
        embed.setDescription(`Something went wrong!`)
        embed.addFields( 
            { name: "💬┆Error comment", value: `\`\`\`${error}\`\`\``},
        )
        embed.setColor(client.config.colors.error)
        return client.sendEmbed({
            embeds: [embed],
            content: content,
            components: components,
            type: type
        }, interaction)
    }
}