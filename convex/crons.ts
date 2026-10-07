import { cronJobs } from "convex/server"
import { internal } from "./_generated/api"

const crons = cronJobs()

// Flip scheduled articles live once their publish time has passed.
crons.interval(
  "publish scheduled articles",
  { minutes: 5 },
  internal.articles.publishScheduledArticles
)

export default crons
