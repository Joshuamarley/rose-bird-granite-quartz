import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { LevelBar } from "@/components/level-bar"
import { guide, NOTES } from "@/lib/guide"
import { BY_CODE } from "@/lib/market"

export const Route = createFileRoute("/s/$code")({ component: StockPage })

function StockPage() {
  const { code } = Route.useParams()
  const stock = BY_CODE.get(code)
  const [held, setHeld] = useState(false)
  if (!stock) {
    return (
      <main className="mx-auto max-w-lg px-4 py-8">
        <p>没有这只。</p>
        <Link to="/" className="mt-4 inline-block min-h-11 text-cinnabar">
          返回札记
        </Link>
      </main>
    )
  }
  const g = guide(stock)
  const note = NOTES[stock.code]
  const entry =
    g.entryLow == null || g.entryHigh == null ? "没有" : `${g.entryLow.toFixed(2)} – ${g.entryHigh.toFixed(2)}`

  return (
    <main className="mx-auto min-h-screen max-w-lg px-4 pb-16 pt-4">
      <Link to="/" className="inline-flex min-h-11 items-center text-sm text-muted">
        返回札记
      </Link>
      <p className="text-xs text-cinnabar">
        {note ? `${note.line} · ${note.role}` : "不在昨天的核心池"} · {g.pattern}
      </p>
      <h1 className="mt-1 font-serif text-3xl">{stock.name}</h1>
      <p className="mt-1 font-sans text-sm text-muted">
        {stock.code} · 9月30日收 {stock.px.toFixed(2)} · {stock.chg > 0 ? "+" : ""}
        {stock.chg.toFixed(2)}% · 成交 {stock.amt} 亿
      </p>

      <section className="mt-4 rounded-2xl border border-line bg-card px-4 py-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat label="支撑" value={g.support == null ? "没有" : g.support.toFixed(2)} hint={g.support == null ? "全天没有回撤" : "日内最低"} />
          <Stat label="合适切入" value={entry} hint={g.where} />
          <Stat label="压力" value={g.pressure.toFixed(2)} hint="日内最高" />
        </div>
        <LevelBar lo={stock.lo} hi={stock.hi} px={stock.px} entryLow={g.entryLow} entryHigh={g.entryHigh} />
        <p className="mt-3 text-xs text-muted">褐色是切入带，红点是收盘。带在现价下面，就是先别追。</p>
      </section>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setHeld(false)}
          className={`min-h-11 flex-1 rounded-full text-sm ${held ? "border border-line bg-card" : "bg-ink text-paper"}`}
        >
          还没拿
        </button>
        <button
          type="button"
          onClick={() => setHeld(true)}
          className={`min-h-11 flex-1 rounded-full text-sm ${held ? "bg-ink text-paper" : "border border-line bg-card"}`}
        >
          已经拿着
        </button>
      </div>

      <section className="mt-4 space-y-3 text-sm leading-relaxed">
        <p>
          <span className="font-medium">现在。 </span>
          {held ? g.holding : g.action}
        </p>
        <p>
          <span className="font-medium">不要。 </span>
          {g.avoid}
        </p>
        <p className="text-xs text-muted">单只试错半成，确认后长短合计最多 2 成。这是看盘步骤，不是下单指令。行情停在 9 月 30 日收盘。</p>
      </section>
    </main>
  )
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-sans text-sm font-semibold leading-tight">{value}</p>
      <p className="mt-1 text-xs leading-snug text-brass">{hint}</p>
    </div>
  )
}
