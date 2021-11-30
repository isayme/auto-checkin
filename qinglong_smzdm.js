/**
 * new Env('什么值得买签到')
 * cron: 3 5 10 * * *
 */

const Smzdm = require('./smzdm_checkin')

const cookie = process.env.SMZDM_COOKIE
const smzdm = new Smzdm({ cookie })
smzdm.run()
