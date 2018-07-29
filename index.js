const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
var message = new Discord.Client();
var database = require("./database.js")


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
 
  let args = message.content.split(" ").slice(1);
  // The list of if/else is replaced with those simple 2 lines:
 
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
 
});
client.on("message", message => {
  if(message.content == '<@467512139171495936>'){
var embedz = new Discord.RichEmbed()
.setAuthor('Eu amo panquecas!', message.author.displayAvatarURL)
.setColor(message.guild.member(message.author.id).displayHexColor)
.setDescription('OI! Está perdido/a? Digite n.help para saber mais!')
.setTimestamp()
.setFooter('NEKO')
message.channel.send({embed : embedz})
}})


const token = process.env.token;


client.login(client.login(process.env.token));



var xpCol = new Set()
let xpRDM = Math.round(Math.random() * 45)

client.on("message", message => {
    if (message.author.bot) return;
    if (xpCol.has(message.author.id)) return;
    database.Users.findOne({
        "_id": message.author.id
    }, function(erro, documento) {
        if (documento) {
            var unbug = 350 * documento.level + 1
            if (documento.xp > unbug) {
                documento.xp += xpRDM
                documento.level += 1
                message.reply(`**Você subiu para o level ${documento.level}**`);
                documento.xp = 0
                documento.save()
                xpCol.add(message.author.id)
                setTimeout(function() {
                    xpCol.delete(message.author.id)
                }, 30 * 1000)
            } else {
                if (message.guild.members.get(message.author.id).roles.get("462692320463290378")) {
                    documento.xp += xpRDM * 2
                    documento.save()
                    xpCol.add(message.author.id)
                    setTimeout(function() {
                        xpCol.delete(message.author.id)
                    }, 30 * 1000)
                } else {
                    documento.xp += xpRDM
                    documento.save()
                    xpCol.add(message.author.id)
                    setTimeout(function() {
                        xpCol.delete(message.author.id)
                    }, 30 * 1000)
                }
            }
        } else {
            var pessoa = new database.Users({
                _id: message.author.id,
                level: 0,
                xp: 0,
                coins: 0,
                conquistas: 0,
                mensagens: 0,
                msglevel: 0,
                invitetru: false,
                invitecode: "Nenhum",
                invitou: 0,
                warn: 0,
                rep: 0
            })

            pessoa.save()
        }
    });
});

client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return

    database.Guilds.findOne({
        "_id": message.guild.id
    }, function (serverro, servidorto) {

        if(servidorto) {

            if(servidorto.box) {

                if(servidorto.caixa) {} else {

                    var prc = Math.round(Math.random() * 7500)

                    if(prc == 1670) {
                        servidorto.caixa = true
                        servidorto.caixatipo = "Lendario"
                        servidorto.save()
                        message.reply("**Uma caixa lendaria foi dropada, use `n.getbox` para pegar.**");
                    } else if(prc == 153) {
                        servidorto.caixa = true
                        servidorto.caixatipo = "Epico"
                        servidorto.save()
                        message.reply("**Uma caixa epica foi dropada, use `n.getbox` para pegar.**");
                    } else if(prc == 527) {
                        servidorto.caixa = true
                        servidorto.caixatipo = "Raro"
                        servidorto.save()
                        message.reply("**Uma caixa rara foi dropada, use `n.getbox` para pegar.**");
                    } else if(prc == 2083) {
                        servidorto.caixa = true
                        servidorto.caixatipo = "Comum"
                        servidorto.save()
                        message.reply("**Uma caixa comum foi dropada, use `n.getbox` para pegar.**");
                    } else {}
                }
            } else {}
        }})
    });
