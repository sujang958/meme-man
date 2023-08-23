import "dotenv/config"

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
