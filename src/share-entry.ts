import raw from "@/data/market.json"
import { NOTES, guide, type Stock } from "@/lib/guide"

type Raw = [string, string, string, number, number, number, number, number, number, number]

export const STOCKS: Stock[] = (raw as Raw[]).map((r) => ({
  code: r[0],
  name: r[1].replace(/\s/g, ""),
  board: r[2],
  chg: r[3],
  amt: r[4],
  px: r[5],
  hi: r[6],
  lo: r[7],
  turn: r[8],
  st: r[9] === 1,
}))

export { NOTES, guide }
