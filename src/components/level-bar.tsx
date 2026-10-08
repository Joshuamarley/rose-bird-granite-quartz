type Props = {
  lo: number
  hi: number
  px: number
  entryLow: number | null
  entryHigh: number | null
}

export function LevelBar({ lo, hi, px, entryLow, entryHigh }: Props) {
  const span = Math.max(hi - lo, 0.01)
  const pct = (v: number) => Math.min(100, Math.max(0, ((v - lo) / span) * 100))
  const band =
    entryLow != null && entryHigh != null
      ? { left: pct(entryLow), width: Math.max(pct(entryHigh) - pct(entryLow), 1.5) }
      : null
  return (
    <div className="pt-3">
      <div className="relative h-2 rounded-full bg-line">
        {band ? (
          <div
            className="absolute top-0 h-2 rounded-full bg-brass/50"
            style={{ left: `${band.left}%`, width: `${band.width}%` }}
          />
        ) : null}
        <div
          className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-card bg-cinnabar"
          style={{ left: `calc(${pct(px)}% - 6px)` }}
        />
      </div>
      <div className="mt-2 flex justify-between font-sans text-xs text-muted">
        <span>低 {lo.toFixed(2)}</span>
        <span>现价 {px.toFixed(2)}</span>
        <span>高 {hi.toFixed(2)}</span>
      </div>
    </div>
  )
}
