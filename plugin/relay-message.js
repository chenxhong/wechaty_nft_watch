/*
 * @Author: isboyjc
 * @Date: 2020-05-30 19:10:06
 * @LastEditors: isboyjc
 * @LastEditTime: 2020-06-14 19:07:51
 * @Description: wechaty plugin 好友申请自动通过
 */

const DEFAULT_CONFIG = {
    listening_names: [],
    listening_alias: [],
    relay: "",
}

module.exports = function WechatyRelayMsg(config = {}) {
    config = Object.assign({}, DEFAULT_CONFIG, config)

    return (bot) => {
        // 监听消息事件
        bot.on("message", async (msg) => {
            // 获取房间对象与消息发送者对象
            let from_room = msg.room()  
            let from_talker = msg.talker()
            if (msg.type() === bot.Message.Type.Text) {
                if (from_room) {
                  console.log('message', `${from_room + from_talker} :`, msg.text())
                  //监听群里某个人说话，并转发到个人
                  t_name = from_talker.name()
                  t_alias = await from_talker.alias()
                  arr_names = config.listening_names
                  arr_alias = config.listening_alias
                  if (arr_alias.includes(t_alias) || arr_names.includes(t_name)) {
                    if (config.relay){
                        // console.log('接收者', config.relay, typeof config.relay)
                        relay_alias = config.relay
                        cxh = await bot.Contact.find({ alias: relay_alias })
                        cxh.say(msg.text())
                        console.log('消息转发', t_alias || t_name, msg.text())
                    }else{
                        console.log('请设置消息转发接收者的微信名称或者备注')
                        return
                    }
                  }
                } else {
                  console.log('message', `${from_talker} :`, msg.text())
                }
                if (msg.text() === 'ding') {
                  await msg.say('dong')
                  console.log('message', `${msg.talker()}回复 :dong`)
                }
              } else {
                if (!msg.self()) {
                  console.log('message', `${from_talker} :图片或文件，请于微信中查看`)
                }
              }
        })
    }
}