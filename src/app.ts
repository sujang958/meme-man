import { fetchMemes, logWithDate, sendMeme } from "./utils.js"
import { CronJob } from "cron"

const job = new CronJob("* 1 * * *", async () => {
  const images = await fetchMemes()
  images.forEach((url, i) => {
    setTimeout(sendMeme.bind(null, url), i * 1000)
  })
})

job.start()
logWithDate("Running")

process.on("unhandledRejection", logWithDate)
process.on("uncaughtException", logWithDate)
