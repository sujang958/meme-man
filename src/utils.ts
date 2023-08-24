import "dotenv/config"
import { XMLParser } from "fast-xml-parser"

if (!("DISCORD_WEBHOOK_URL" in process.env)) process.exit(1)

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_WEBHOOK_URL: string
    }
  }
}

export const logWithDate = console.log.bind(null, new Date())

export const sendMeme = async (url: string) => {
  const res = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "r/ProgrammerHumor",
      content: url,
    }),
  })

  logWithDate("Sending a meme")
  logWithDate(res.statusText, await res.text())
}

const parser = new XMLParser()

const REDDIT_URL_PATTERN = /https:\/\/i\.redd\.it[^"]*/g

export const fetchMemes = async () => {
  const fetchMeme = await fetch("https://www.reddit.com/r/ProgrammerHumor/.rss")
  const XMLdata = await fetchMeme.text()

  const obj = parser.parse(XMLdata)
  const entries = obj.feed.entry as any[]

  const images = entries
    .map((entry) => String(entry.content).match(REDDIT_URL_PATTERN))
    .filter((images): images is RegExpMatchArray => (images ? true : false))
    .flat(1)

  return images
}
