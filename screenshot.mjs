import { chromium } from "playwright"

const browser = await chromium.launch({ timeout: 0 })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto("http://localhost:3000/wires", { waitUntil: "networkidle" })
await page.waitForTimeout(500)
await page.screenshot({ path: "screenshot.png", fullPage: false })
await browser.close()
console.log("done")
