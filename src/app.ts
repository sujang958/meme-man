import { XMLParser } from "fast-xml-parser"
import { logWithDate, sendMeme } from "./utils.js"
import { CronJob } from "cron"

const parser = new XMLParser()

const REDDIT_URL_PATTERN = /https:\/\/i\.redd\.it[^"]*/g

const fetchMeme = await fetch("https://www.reddit.com/r/ProgrammerHumor/.rss")
const XMLdata = await fetchMeme.text()

const obj = parser.parse(XMLdata)
const entries = obj.feed.entry as any[]

const images = entries
  .map((entry) => String(entry.content).match(REDDIT_URL_PATTERN))
  .filter((images): images is RegExpMatchArray => (images ? true : false))
  .flat(1)

const job = new CronJob("* 1 * * *", () => {
  images.forEach((url, i) => {
    setTimeout(sendMeme.bind(null, url), i * 1000)
  })
})

job.start()
logWithDate("Running")

process.on("unhandledRejection", logWithDate)
process.on("uncaughtException", logWithDate)
