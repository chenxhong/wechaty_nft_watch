/*
 * @Author: isboyjc
 * @Date: 2020-05-31 16:38:19
 * @LastEditors: isboyjc
 * @LastEditTime: 2020-05-31 19:10:06
 * @Description: wechaty plugin 加入房间邀请
 */
const DEFAULT_CONFIG = {
    keyword: ["加群"],
    reply: "",
    roomList: [],
  }
  
  module.exports = function WechatyRoomInvite(config = {}) {
    config = Object.assign({}, DEFAULT_CONFIG, config)
  
    if (typeof config.keyword === "string") config.keyword = [config.keyword]
  
    return (bot) => {
      // 消息监听
      bot.on("message", async (msg) => {
        if (msg.self()) return
  
        for (let i = 0; i < config.roomList.length; i++) {
          if (
            config.roomList[i].name == msg.text() ||
            config.roomList[i].alias == msg.text()
          ) {
            if (config.roomList[i].close == true) {
              msg.say("此群已关闭自动拉取功能")
              return
            }
            await roomInvite(bot, msg, config.roomList[i].roomId)
            return
          }
        }
  
        if (msg.type() === bot.Message.Type.Text && !msg.room()) {
          // 校验关键字
          if (config.keyword.some((c) => c == msg.text())) {
            if (config.roomList.length == 1) {
              await roomInvite(bot, msg, config.roomList[0].roomId)
              return
            }
  
            let info
            if (config.reply) {
              info = config.reply
            } else {
              info = `当前${bot.options.name}为小主管理的群聊有${config.roomList.length}个，回复群聊名或编号(【】中为编号)即可加入哦\n\n`
              config.roomList.map((item) => {
                info += `【${item.alias}】${item.name} (${item.label})\n`
              })
            }
            msg.say(info)
          }
        }
      })
    }
  }
  
  /**
   * @description 房间邀请
   * @param {Object} bot 实例对象
   * @param {Object} msg 消息实例
   * @param {Object} roomId 房间id
   * @return {}
   */
  async function roomInvite(bot, msg, roomId) {
    // 通过群聊id获取到该群聊实例
    const room = await bot.Room.find({ id: roomId })
  
    // 判断是否在房间中 在-提示并结束
    if (await room.has(msg.from())) {
      await msg.say("您已经在房间中了")
      return
    }
  
    // 发送群邀请
    await room.add(msg.from())
    await msg.say("已发送群邀请")
    return
  }


/* 入口文件

// Wechaty核心包
const { Wechaty } = require("wechaty")
// padplus协议包
const { PuppetPadplus } = require("wechaty-puppet-padplus")
// qr码
const Qrterminal = require("qrcode-terminal")
// 插件 WechatyRoomInvite
const WechatyRoomInvite = require("../index")

// 初始化 bot
const bot = new Wechaty({
  puppet: new PuppetPadplus({
    // 机器人padplus协议token
    token: PUPPET_PADPLUS_TOKEN,
  }),
  // 机器人名字
  name: ROBOT_NAME,
})

const options = {
  keyword: ["加群", "入群", "群"],
  roomList: [
    {
      name: "Web圈0x01",
      roomId: "10614174865@chatroom",
      alias: "A01",
      label: "推荐",
    },
    {
      name: "Web圈0x02",
      roomId: "22825376327@chatroom",
      alias: "A02",
      label: "新群",
    },
    {
      name: "微信机器人",
      roomId: "24661539197@chatroom",
      alias: "A04",
      label: "推荐",
    },
    {
      name: "男神开门群",
      roomId: "22275855499@chatroom",
      alias: "A05",
      label: "测试",
      close: true,
    },
  ],
  reply: "",
}

// 使用插件
bot.use(WechatyRoomInvite(options))

bot
  .on("scan", (qrcode, status) => {
    Qrterminal.generate(qrcode, { small: true })
  })
  .start()
  */


// 介绍
//   wechaty-room-invite
//   Wechaty Plugin Contrib Powered by Wechaty
  
//   Invite user to rooms by keyword
  
//   通过关键字邀请用户进入房间
  
//   开始
//   简介
//   你可以向机器人发送某些关键字，机器人会通过这些关键字邀请你进入对应的房间，当然，可以是多个房间
  
//   安装
//   npm install wechaty-room-invite
  
//   or
  
//   yarn add wechaty-room-invite
//   使用
//   const WechatyRoomInvite = require("wechaty-room-invite")
  
//   bot.use(WechatyRoomInvite(options))
//   如上所示
  
//   使用插件只要按需传入配置对象 options 即可
  
//   Options 参数属性	类型	简介
//   keyword	String|Array	触发邀请该用户的关键字，只有一个可以使用字符串类型，多个关键字使用数组类型
//   roomList	Array	机器人管理的群聊列表，该项为必填项，数组对象中具体配置请看下面示例
//   reply	String	roomList 数组长度大于 1 时，视为管理多个群聊，那么 keyword 触发后会回复用户当前管理的群聊列表数据供用户选择进入某一个群，这个群聊数据列表为一段由 roomList 配置生成的话，roomList 数组长度等于 1 时，keyword 触发将会直接拉起群邀请，那么此字段也无用，reply 字段不是必选项，管理多个群聊时，建议直接使用默认文字，默认流程可看最后示例图片
//   我们来看 roomList 数组的配置示例
  
//   roomList: [
//     {
//       // 群聊名字，管理多个群聊时用户可通过群聊名字选择某个群聊
//       name: "微信机器人",
//       // 群聊id
//       roomId: "22275855499@chatroom",
//       // 群聊别名，建议简短，管理多个群聊时用户可通过别名选择某个群聊，叫它[编号]可能更好
//       alias: "A05",
//       // 标签，用于在管理多个群聊时给各个群聊做一个简单的标识，方便用户选择
//       label: "新群",
//       // 是否关闭进入，如果为true，则触发该群时，会提示该群不可进入
//       close: true,
//     },
//     ...
//   ]
//   示例
//   const { Wechaty } = require("wechaty")
//   const { PuppetPadplus } = require("wechaty-puppet-padplus")
//   const Qrterminal = require("qrcode-terminal")
//   // 插件 WechatyRoomInvite
//   const WechatyRoomInvite = require("wechaty-room-invite")
  
//   // 初始化 bot
//   const bot = new Wechaty({
//     puppet: new PuppetPadplus({
//       // 机器人padplus协议token
//       token: PUPPET_PADPLUS_TOKEN,
//     }),
//     // 机器人名字
//     name: ROBOT_NAME,
//   })
  
//   // 插件参数配置
//   const options = {
//     keyword: ["加群", "入群", "群"],
//     roomList: [
//       {
//         name: "Web圈0x01",
//         roomId: "10614174865@chatroom",
//         alias: "A01",
//         label: "推荐",
//       },
//       {
//         name: "Web圈0x02",
//         roomId: "22825376327@chatroom",
//         alias: "A02",
//         label: "新群",
//       },
//       {
//         name: "微信机器人",
//         roomId: "24661539197@chatroom",
//         alias: "A04",
//         label: "推荐",
//       },
//       {
//         name: "男神开门群",
//         roomId: "22275855499@chatroom",
//         alias: "A05",
//         label: "测试",
//         close: true,
//       },
//     ],
//     reply: "",
//   }
  
//   // 使用插件
//   bot.use(WechatyRoomInvite(options))
  
//   bot
//     .on("scan", (qrcode, status) => {
//       Qrterminal.generate(qrcode, { small: true })
//     })
//     .start()