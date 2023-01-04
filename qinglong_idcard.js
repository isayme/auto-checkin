const { chromium } = require('playwright');

const { sendNotify } = require('./sendNotify')

const cardName = process.env.IDCARD_NAME
const cardId = process.env.IDCARD_ID

async function main() {
  const browser = await chromium.launch() 
  const page = await browser.newPage()
  
  await page.goto('https://tysfrz.jsga.gov.cn/idQuery/index.html', {
    waitUntil: 'domcontentloaded',
  })

  await page.locator('#card_name').fill(cardName)
  await page.locator('#card_id').fill(cardId)

  await page.locator('.btnSer').click()

  await page.waitForLoadState('networkidle')

  let status = await page.locator('.context').first().innerText()
  console.log(status)
  
  await sendNotify(status)
  
  await browser.close()
}

main()
