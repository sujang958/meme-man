import { XMLParser } from "fast-xml-parser"

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

console.log(images)
