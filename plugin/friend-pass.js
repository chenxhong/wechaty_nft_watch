/*
 * @Author: isboyjc
 * @Date: 2020-05-30 19:10:06
 * @LastEditors: isboyjc
 * @LastEditTime: 2020-06-14 19:07:51
 * @Description: wechaty plugin 好友申请自动通过
 */
const DEFAULT_CONFIG = {
    blackId: [],
    keyword: [],
    reply: "",
  }
const PASSALL = false
  
module.exports = function WechatyFriendPass(config = {}) {
  config = Object.assign({}, DEFAULT_CONFIG, config)

  if (config.keyword === "*") PASSALL = true
  if (typeof config.keyword === "string") config.keyword = [config.keyword]
  if (typeof config.blackId === "string") config.blackId = [config.blackId]

  return (bot) => {
    // 好友添加监听
    bot.on("friendship", async (friendship) => {
      // 校验是否存在黑名单中
      if (config.blackId.some((v) => v == friendship.payload.contactId)) return

      let logMsg
      switch (friendship.type()) {
        // 新的好友请求
        case bot.Friendship.Type.Receive:
          if (config.keyword.some((v) => v == friendship.hello()) || PASSALL) {
            logMsg = `自动通过验证，因为验证消息是"${friendship.hello()}"`
            // 通过验证
            await friendship.accept()
          } else {
            logMsg = "不自动通过，因为验证消息是: " + friendship.hello()
          }
          break

        // 友谊确认
        case bot.Friendship.Type.Confirm:
          logMsg = "已通过好友申请：" + friendship.contact().name()

          if (config.reply) {
            friendship.contact().say(config.reply)
          }
          break
      }
      console.log(logMsg)
    })
  }
}


//   bot.js  -- 入口文件

//   /*
//  * @Author: isboyjc
//  * @Date: 2020-06-13 22:38:02
//  * @LastEditors: isboyjc
//  * @LastEditTime: 2020-06-14 19:07:40
//  * @Description: file content
//  */

// // Wechaty核心包
// const { Wechaty } = require("wechaty")
// // padplus协议包
// const { PuppetPadplus } = require("wechaty-puppet-padplus")
// // qr码
// const Qrterminal = require("qrcode-terminal")
// // 插件 WechatyFriendPass
// const WechatyFriendPass = require("../index")

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
//   keyword: [
//     "加群",
//     "前端",
//     "后端",
//     "全栈",
//     "公众号",
//     "cesium",
//     "github",
//     "wechaty",
//   ],
//   reply: `你好，我是机器人小助手圈子 \n\n 加入技术交流群请回复【加群】\n 联系小主请回复【123】`,
//   blackId: [],
// }

// // 使用插件
// bot.use(WechatyFriendPass(options))

// bot
//   .on("scan", (qrcode, status) => {
//     Qrterminal.generate(qrcode, { small: true })
//   })
//   .start()



// 介绍
// wechaty-friend-pass
// Wechaty Plugin Contrib Powered by Wechaty

// Wechat friend application passes automatically

// 微信好友申请自动通过

// 开始
// 简介
// 你是否想要自己的微信机器人自动通过好友请求，或者设置一些关键字，通过好友申请时备注的关键字来校验是否要自动通过该好友申请，并且通过好友申请时自动回复一段话

// 如果是的话，那么你可以使用这个插件，虽然是一个很简单的功能但是使用 plugin 可以使我们的代码更简洁

// 到这里它的功能你应该了解了，那么我们来看看它如何使用

// 安装
// npm install wechaty-friend-pass

// or

// yarn add wechaty-friend-pass
// 使用
// const WechatyFriendPass = require("wechaty-friend-pass")

// bot.use(WechatyFriendPass(options))
// 如上所示

// 使用插件只要按需传入配置对象 options 即可

// Options 参数属性	类型	简介
// keyword	String|Array	好友请求时备注自动通过的关键字，只有一个可以使用字符串类型，多个关键字使用数组类型，全部通过不用校验传入字符串 "*" 即可，不传即都不自动通过
// blackId	String|Array	用户黑名单 ID，该项可填写用户的 ID 来识别用户，让此用户不被自动通过，也可不填
// reply	String	自动通过用户好友申请后自动回复一句话，为空或不填则通过后不回复
// 示例
// const { Wechaty } = require("wechaty")
// const { PuppetPadplus } = require("wechaty-puppet-padplus")
// const Qrterminal = require("qrcode-terminal")
// // 引入插件 WechatyFriendPass
// const WechatyFriendPass = require("wechaty-friend-pass")

// // 初始化 bot
// const bot = new Wechaty({
//   puppet: new PuppetPadplus({
//     token: PUPPET_PADPLUS_TOKEN,
//   }),
//   name: ROBOT_NAME,
// })

// // 插件配置对象
// const options = {
//   keyword: ["加群", "前端", "后端", "全栈"],
//   blackId: ["*******", "*******"],
//   reply:
//     "你好，我是机器人小助手圈子 \n 加入技术交流群请回复【加群】\n 联系小主请回复【123】",
// }

// // 使用插件
// bot.use(WechatyFriendPass(options))

// bot
//   .on("scan", (qrcode, status) => {
//     Qrterminal.generate(qrcode, { small: true })
//   })
//   .start()