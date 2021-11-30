/**
 * new Env('掘金签到')
 * cron: 3 1 10 * * *
 */

const Juejin = require('./juejin_checkin')

const juejin = new Juejin({
  cookie: process.env.JUEJIN_COOKIE,
})

juejin.run()
