/*
 * @Author: isboyjc
 * @Date: 2020-07-01 19:26:06
 * @LastEditors: isboyjc
 * @LastEditTime: 2020-07-01 22:12:11
 * @Description: wechaty plugin 快捷移出群聊
 */
const DEFAULT_CONFIG = {
    keyword: ["飞机", "踢"],
    adminList: [],
    time: 3000,
    replyInfo: function (msg) {
      return `您可能违反了社群规则，并收到举报，${
        this.time / 1000
      }s后将您移出群聊，如有问题请联系管理！！！🚀\n\n移除原因：违反社群规则\n操作时间：${dateTimeFormat()}\n操作管理员：${msg
        .from()
        .name()}\n\nYou may have violated the community rules and received a report. After ${
        this.time / 1000
      }S, you will be removed from the group chat. If you have any questions, please contact the management！！！🚀\n\nReason for removal：Violation of community rules\nOperation time：${dateTimeFormat()}\nOperation administrator：${msg
        .from()
        .name()}`
    },
    replyDone: "done",
    replyNoPermission: "",
  }
  
  module.exports = function WechatyRoomRemove(config = {}) {
    config = Object.assign({}, DEFAULT_CONFIG, config)
  
    if (typeof config.keyword === "string") config.keyword = [config.keyword]
    if (typeof config.replyInfo === "string") {
      let info = config.replyInfo
      config.replyInfo = () => info
    }
  
    return (bot) => {
      // 消息监听
      bot.on("message", async (msg) => {
        if (msg.self()) return
  
        // 校验消息类型为文本 且 来自群聊
        if (msg.type() === bot.Message.Type.Text && msg.room()) {
          // 获取群聊实例
          const room = await msg.room()
  
          // 是否为@的用户列表
          if (msg.mentionList()) {
            // 获取在群中@的用户列表
            let contactList = await msg.mentionList()
            let sendText = msg.text(),
              aite = ""
            for (let i = 0; i < contactList.length; i++) {
              // 获取@ +  群聊别称 || 名字
              let name =
                (await room.alias(contactList[i])) || contactList[i].name()
              aite = "@" + name
              // 匹配删除名字信息
              sendText = sendText.replace(aite, "")
            }
            // 删除首尾空格
            sendText = sendText.replace(/(^\s*)|(\s*$)/g, "")
  
            if (config.keyword.some((v) => v === sendText)) {
              if (config.adminList.some((v) => v.id == msg.from().id)) {
                room.say(config.replyInfo(msg), ...contactList)
  
                setTimeout(async () => {
                  contactList.map(async (item) => {
                    try {
                      await room.del(item)
                    } catch (e) {
                      console.error(e)
                    }
  
                    room.say(config.replyDone)
                  })
                }, config.time)
              } else {
                if (config.replyNoPermission) {
                  room.say(config.replyNoPermission, msg.from())
                }
              }
            }
          }
        }
      })
    }
  }
  
  /**
   * @description 日期时间转格式
   * @param {Object} date 时间，非必选，默认当前时间
   * @return {String}
   */
  function dateTimeFormat(date = new Date()) {
    let year = date.getFullYear() //获取当前年份
    let mon = date.getMonth() + 1 //获取当前月份
    let da = date.getDate() //获取当前日
    let day = date.getDay() //获取当前星期几
    let h = date.getHours() //获取小时
    let m = date.getMinutes() //获取分钟
    let s = date.getSeconds() //获取秒
  
    //判断当数字小于等于9时 显示 01 02 ----- 08 09
    if (mon >= 1 && mon <= 9) {
      mon = "0" + mon
    }
  
    if (da >= 0 && da <= 9) {
      da = "0" + da
    }
  
    if (h >= 0 && h <= 9) {
      h = "0" + h
    }
  
    if (m >= 0 && m <= 9) {
      m = "0" + m
    }
  
    if (s >= 0 && s <= 9) {
      s = "0" + s
    }
  
    switch (day) {
      case 1:
        day = "一"
        break
      case 2:
        day = "二"
        break
      case 3:
        day = "三"
        break
      case 4:
        day = "四"
        break
      case 5:
        day = "五"
        break
      case 6:
        day = "六"
        break
      default:
        day = "日"
    }
    return `${year}-${mon}-${da} ${h}:${m}:${s} 星期${day}`
  }





// bot.js  -- 入口文件
//   /*
//  * @Author: isboyjc
//  * @Date: 2020-07-01 19:25:53
//  * @LastEditors: isboyjc
//  * @LastEditTime: 2020-07-01 22:05:51
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
//   keyword: ["飞机", "踢", "慢走", "不送"],
//   adminList: [
//     {
//       name: "isboyjc",
//       id: "wxid_nrsh4yc8yupm22",
//     },
//     {
//       name: "工具人小杨",
//       id: "wxid_vkovzba0b0c212",
//     },
//     {
//       name: "便便",
//       id: "wxid_4mnet5yeqo5d21",
//     },
//   ],
//   time: 3000,
//   replyDone: "移除成功",
//   replyNoPermission: "您暂时没有权限哦，联系管理员吧😊",
// }

// // 使用插件
// bot.use(WechatyRoomRemove(options))

// bot
//   .on("scan", (qrcode, status) => {
//     Qrterminal.generate(qrcode, { small: true })
//   })
//   .start()



// 介绍
// wechaty-room-remove
// Wechaty Plugin Contrib Powered by Wechaty

// Quick automatic removal from group chat

// 快捷自动移出群聊

// 开始
// 简介
// 你可以在群聊中@一个违规的人并携带你所设置的关键字，机器人监听到后会帮你快捷的移除他并且给出提示，这比手动删除群聊中某一个人要方便的多

// 安装
// npm install wechaty-room-remove

// or

// yarn add wechaty-room-remove
// 使用
// const WechatyRoomRemove = require("wechaty-room-remove")

// bot.use(WechatyRoomRemove(options))
// 如上所示

// 使用插件只要按需传入配置对象 options 即可

// Options 参数属性	类型	简介
// keyword	String|Array	触发移除该用户的关键字，只有一个可以使用字符串类型，多个关键字使用数组类型，默认为 ["飞机", "踢"]
// time	Number	触发移除后的延时/ms，默认3000，即3s
// adminList	Array	可触发命令的管理员列表，一个数组对象，单个数组对象属性请看下面配置示例
// replyInfo	String|Function	移除前@提示该用户的一句话，可为字符串类型，也可以是函数类型，函数类型时，有一个参数msg，即当前消息实例，函数最终需返回一个字符串function(msg){return ...}，此项有默认值，请看下文示例
// replyDone	String	移除成功提示，字符串类型，默认成功时返回done
// replyNoPermission	String	无权限移除成员时机器人的回复，即当一个不在adminList配置中的用户发出命令时回复，默认不做出回复
// 我们来看 adminList 数组的配置示例

// adminList: [
//   {
//     // 管理员昵称，用以区分，可选
//     name: "isboyjc",
//     // 管理员id，必填
//     id: "wxid_nrsh4yc8yupm22",
//   },
//   {
//     name: "工具人小杨",
//     id: "wxid_vkovzba0b0c212",
//   },
//   ...
// ]
// 示例
// const { Wechaty } = require("wechaty")
// const { PuppetPadplus } = require("wechaty-puppet-padplus")
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
//   // 触发关键字数组
//   keyword: ["飞机", "踢", "慢走", "不送"],
//   // 管理员列表
//   adminList: [
//     {
//       name: "isboyjc",
//       id: "wxid_nrsh4yc8yupm22",
//     },
//     {
//       name: "工具人小杨",
//       id: "wxid_vkovzba0b0c212",
//     },
//     {
//       name: "便便",
//       id: "wxid_4mnet5yeqo5d21",
//     },
//   ],
//   // 延时
//   time: 3000,
//   // 移除前提示，以下配置是默认配置，这里用来展示函数类型配置
//   // 可根据函数回调中msg消息实例参数自由发挥，也可直接填写一段字符串
//   replyInfo: function (msg) {
//     return `您可能违反了社群规则，并收到举报，${this.time / 1000}s后将您移出群聊，如有问题请联系管理！！！🚀\n\n移除原因：违反社群规则\n操作时间：${dateTimeFormat()}\n操作管理员：${msg.from().name()}\n\nYou may have violated the community rules and received a report. After ${this.time / 1000}S, you will be removed from the group chat. If you have any questions, please contact the management！！！🚀\n\nReason for removal：Violation of community rules\nOperation time：${dateTimeFormat()}\nOperation administrator：${msg.from().name()}`
//   },
//   // 移除成功后提示
//   replyDone: "移除成功",
//   // 无权限人员触发命令后回复，可选项，默认不进行回复
//   replyNoPermission: "您暂时没有权限哦，联系管理员吧😊",
// }

// // 使用插件
// bot.use(WechatyRoomRemove(options))

// bot
//   .on("scan", (qrcode, status) => {
//     Qrterminal.generate(qrcode, { small: true })
//   })
//   .start()

// /**
//  * @description 日期时间转格式
//  * @param {Object} date 时间，非必选，默认当前时间
//  * @return {String}
//  */
// function dateTimeFormat(date = new Date()) {
//   ...
// }