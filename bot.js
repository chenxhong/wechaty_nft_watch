/**
 * @author Hilbert Yi
 * @time 2022-01-11
 * @digest 入口文件
 */
const { Wechaty, WechatyPlugin } = require("wechaty");
const {PuppetPadlocal} = require("wechaty-puppet-padlocal");
// const config = require("./config");

// const token = config.PUPPET_TOKEN;
// const botName = config.BOTNAME;
const botName = 'botbot';

// 创建机器人
const bot = new Wechaty({
  puppet: new PuppetPadlocal({
    token:'puppet_padlocal_b1765e0894cc45afa9fdd569613b277c'
  }),
  name: botName
})
module.exports = bot;

//web协议
// const bot = new Wechaty({
//   name: "WeChat-Robot"
// });
