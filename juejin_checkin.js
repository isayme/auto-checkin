/**
 * new Env('掘金签到')
 * cron: 3 1 10 * * *
 */

const axios = require('axios')

class Juejin {
  constructor(options = {}) {
    let baseUrl = options.baseUrl || 'http://api.juejin.cn'

    if (!options.cookie) {
      throw new Error('juejin cookie required')
    }

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        cookie: options.cookie,
      },
    })
  }

  async run() {
    await this.checkin()
    await this.drawLottery()
  }

  /**
   * 签到
   */
  async checkin() {
    {
      let { data: body } = await this.client.get(
        '/growth_api/v1/get_today_status',
      )
      let { err_no: errNo, data: hasCheckin } = body
      if (errNo !== 0) {
        console.log('获取签到状态失败')
        return
      }

      if (hasCheckin) {
        console.log('今日已签到')
        return
      }
    }

    {
      let { data: body } = await this.client.post('/growth_api/v1/check_in')
      let { err_no: errNo, data: checkinData } = body
      if (errNo !== 0) {
        console.log('签到失败')
        return
      }

      console.log(
        `签到成功：新增积分 ${checkinData.incr_point}, 当前总积分 ${checkinData.sum_point}`,
      )
    }
  }

  /**
   * 抽奖
   */
  async drawLottery() {
    {
      let { data: body } = await this.client.get(
        '/growth_api/v1/lottery_config/get',
      )
      let { err_no: errNo, data: lotteryStatus } = body
      if (errNo !== 0) {
        console.log('获取抽奖状态失败')
        return
      }
      if (lotteryStatus.free_count <= 0) {
        console.log('暂无免费抽奖机会')
        return
      }
    }

    {
      let { data: body } = await this.client.post('/growth_api/v1/lottery/draw')
      let { err_no: errNo, data: lotteryResult } = body
      if (errNo !== 0) {
        console.log('抽奖失败')
        return
      }

      console.log(`抽奖成功, 获得 ${lotteryResult.lottery_name}`)
    }
  }
}

const juejin = new Juejin({
  cookie: process.env.JUEJIN_COOKIE,
})

juejin.run()