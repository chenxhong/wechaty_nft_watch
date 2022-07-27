/*
 * @Author: isboyjc
 * @Date: 2020-05-31 10:41:54
 * @LastEditors: isboyjc
 * @LastEditTime: 2020-06-14 22:57:55
 * @Description: wechaty plugin 房间加入欢迎
 */
const DEFAULT_CONFIG = {
    reply: "你好，欢迎你的加入!",
  }
  
  module.exports = function WechatyRoomWelcome(config = {}) {
    config = Object.assign({}, DEFAULT_CONFIG, config)
  
    return (bot) => {
      bot.on("room-join", async (room, inviteeList, inviter) => {
        if (!config.reply) return
  
        if (typeof config.reply === "string")
          inviteeList.map((c) => room.say(config.reply, c))
  
        if (Array.isArray(config.reply)) {
          config.reply.map((item) => {
            if (item.roomId == room.id) {
              inviteeList.map((c) => {
                room.say(item.reply, c)
              })
            }
          })
        }
      })
    }
  }




// bot.js  -- 入口文件
//   /*
//  * @Author: isboyjc
//  * @Date: 2020-06-14 22:55:52
//  * @LastEditors: isboyjc
//  * @LastEditTime: 2020-06-14 23:03:08
//  * @Description: file content
//  */

// // Wechaty核心包
// const { Wechaty } = require("wechaty")
// // padplus协议包
// const { PuppetPadplus } = require("wechaty-puppet-padplus")
// // qr码
// const Qrterminal = require("qrcode-terminal")
// // 插件 WechatyRoomWelcome
// const WechatyRoomWelcome = require("../index")

// // 初始化 bot
// const bot = new Wechaty({
//   puppet: new PuppetPadplus({
//     // 机器人padplus协议token
//     token: PUPPET_PADPLUS_TOKEN,
//   }),
//   // 机器人名字
//   name: ROBOT_NAME,
// })

// const options = {
//   reply: [
//     {
//       name: "Web圈0x01",
//       roomId: "10614174865@chatroom",
//       reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
//     },
//     {
//       name: "Web圈0x02",
//       roomId: "22825376327@chatroom",
//       reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
//     },
//     {
//       name: "每日算法",
//       roomId: "21705489152@chatroom",
//       reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
//     },
//     {
//       name: "微信机器人",
//       roomId: "24661539197@chatroom",
//       reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
//     },
//     {
//       name: "男神开门群",
//       roomId: "22275855499@chatroom",
//       reply: "男神你好，欢迎加入",
//     },
//   ],
// }

// // 使用插件
// bot.use(WechatyRoomWelcome(options))

// bot
//   .on("scan", (qrcode, status) => {
//     Qrterminal.generate(qrcode, { small: true })
//   })
//   .start()



// 介绍
// wechaty-room-welcome
// Wechaty Plugin Contrib Powered by Wechaty

// Welcome to the room

// 加入房间欢迎

// 开始
// 简介
// 这是一个及其简单的插件，功能也只有一个，那就是用于监听群聊中新人员的加入，随后回复一个入群欢迎，可管理多个群聊

// 安装
// npm install wechaty-room-welcome

// or

// yarn add wechaty-room-welcome
// 使用
// const WechatyRoomWelcome = require("wechaty-room-welcome")

// bot.use(WechatyRoomWelcome(options))
// options 参数是一个对象，只有一个属性 reply

// Options 参数属性	类型	简介
// reply	String|Array	reply参数为字符串时，机器人加入的所有群聊监听到新的加入都将回复此欢迎语，当为数组时，可自由配置管理的每个群聊要回复什么欢迎语，为数组类型的具体配置请看下文示例
// reply 数组格式示例

// reply: [
//   {
//     // 群聊名
//     name: "微信机器人",
//     // 群聊id
//     roomId: "24661539197@chatroom",
//     // 入群回复的欢迎词
//     reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！😊`,
//   },
// 	...
// ]
// 示例
// const { Wechaty } = require("wechaty")
// const { PuppetPadplus } = require("wechaty-puppet-padplus")
// const Qrterminal = require("qrcode-terminal")
// const WechatyRoomWelcome = require("wechaty-room-welcome")

// // 初始化 bot
// const bot = new Wechaty({
//   puppet: new PuppetPadplus({
//     // 机器人padplus协议token
//     token: PUPPET_PADPLUS_TOKEN,
//   }),
//   // 机器人名字
//   name: ROBOT_NAME,
// })

// const options = {
//   reply: [
//     {
//       name: "Web圈0x01",
//       roomId: "10614174865@chatroom",
//       reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ 😊`,
//     },
//     {
//       name: "Web圈0x02",
//       roomId: "22825376327@chatroom",
//       reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！😊`,
//     },
//     {
//       name: "每日算法",
//       roomId: "21705489152@chatroom",
//       reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！😊`,
//     },
//     {
//       name: "微信机器人",
//       roomId: "24661539197@chatroom",
//       reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！😊`,
//     },
//     {
//       name: "男神开门群",
//       roomId: "22275855499@chatroom",
//       reply: "男神你好，欢迎加入",
//     },
//   ],
// }

// // 使用插件
// bot.use(WechatyRoomWelcome(options))

// bot
//   .on("scan", (qrcode, status) => {
//     Qrterminal.generate(qrcode, { small: true })
//   })
//   .start()