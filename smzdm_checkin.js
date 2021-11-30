const axios = require('axios')

class Smzdm {
  constructor(options = {}) {
    if (!options.cookie) {
      throw new Error('smzdm cookie required')
    }

    this.client = axios.create({
      baseURL: 'https://zhiyou.smzdm.com',
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
        host: 'zhiyou.smzdm.com',
        cookie: options.cookie,
        Referer: 'https://www.smzdm.com/',
      },
    })
  }

  async run() {
    await this.checkin()
  }

  /**
   * 签到
   */
  async checkin() {
    let { data: body } = await this.client.get(
      '/user/checkin/jsonp_checkin',
      {},
    )
    let { error_code: errorCode, error_msg: errorMsg, data: checkInData } = body
    if (errorCode !== 0) {
      console.log(`签到失败: ${errorMsg}`)
      return
    }

    console.log(body)

    console.log(
      `连续签到 ${checkInData.continue_checkin_days} 天, 当前金币 ${checkInData.gold}`,
    )
  }
}

module.exports = Smzdm
