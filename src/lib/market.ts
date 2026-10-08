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

export const BY_CODE = new Map(STOCKS.map((s) => [s.code, s]))

export const CORE_ORDER = [
  "603127",
  "603259",
  "600276",
  "301047",
  "603200",
  "002074",
  "600241",
  "000011",
  "000002",
  "002244",
  "600418",
  "300413",
  "000678",
  "002242",
  "600825",
  "002050",
  "300750",
  "300408",
  "601208",
  "301486",
]

export function searchStocks(q: string) {
  const query = q.trim()
  if (!query) return []
  return STOCKS.filter((s) => (s.code + s.name).includes(query)).slice(0, 12)
}

export function coreStocks(line: string) {
  return CORE_ORDER.map((code) => BY_CODE.get(code))
    .filter((s): s is Stock => !!s)
    .filter((s) => {
      const note = NOTES[s.code]
      if (!note) return false
      if (line === "全部") return true
      if (line === "辅助") return note.line === "辅助" || note.line === "观察" || note.line === "高度"
      return note.line === line
    })
}

export function entryText(s: Stock) {
  const g = guide(s)
  if (g.entryLow == null || g.entryHigh == null) return "没有"
  return `${g.entryLow.toFixed(2)}–${g.entryHigh.toFixed(2)}`
}

export { guide, NOTES }
