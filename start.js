/*
 * @Author:cxh
 * @Create: 2022-07-27 16:05:08
 * @LastEditTime: 2022-07-27 16:05:08
 * @Description: 入口文件，启动机器人实例
 */
// const login = require("./listeners/on-login"); 
const scan = require("./listeners/on-scan");

const bot = require("./bot");
const { Contact } = require("wechaty");
const WechatyRelayMsg = require('./plugin/relay-message')

// async function onMessage(msg) {
//   let romm = msg.room()
//   let talkerr = msg.talker()
//   if (msg.type() === bot.Message.Type.Text) {
//     if (romm) {
//       //监听群里某个人说话，并转发到个人
//       console.log('message', `${romm + talkerr} :`, msg.text())
//       t_name = talkerr.name()
//       t_alias = await talkerr.alias()
//       arr_names = ['q',]
//       arr_alias = ['机智的杰尼君', '晓洪']

//       if (arr_alias.includes(t_alias) || arr_names.includes(t_name)) {
//         let contract_fillter = { 
//           alias: "晓洪",
//           name: '晓洪'
//         }
//         cxh = await bot.Contact.find(contract_fillter)
//         if (msg.type() === bot.Message.Type.Text) {
//           cxh.say(msg.text())
//         }
//         console.log('消息转发', t_alias || t_name, msg.text())
//       }
//     } else {
//       console.log('message', `${talkerr} :`, msg.text())
//     }
//     if (msg.text() === 'ding') {
//       await msg.say('dong')
//       console.log('message', `${msg.talker()}回复 :dong`)
//     }
//   } else {
//     if (!msg.self()) {
//       console.log('message', `${talkerr} :图片或文件，请于微信中查看`)
//     }
//   }


// }

const relay_msg_options = {
  listening_names: [
    "q",
  ],
  listening_alias: [
    "晓洪",
    "机智的杰尼君"
  ],
  relay: "晓洪",
}

function onLogin(user) {
  console.log('StarterBot', '%s login', user)
}

bot.on("scan", scan);

bot.on("login", onLogin);

// 监听消息事件，群消息中的某个人（listening_names，listening_alias）发消息之后，直接由机器人转发给（relay）用户
bot.use(WechatyRelayMsg(relay_msg_options))

// 监听链上土狗，并转发给（relay）用户
bot.use(WechatyRelayMsg(relay_msg_options))

// bot.on("message", onMessage);


// bot.on("friendship", friendship);

// bot.on("room-join", roomJoin);

// bot.on("room-leave", roomLeave);

bot.start().then(() => console.log("开始登陆微信")).catch(e => console.error(e));
