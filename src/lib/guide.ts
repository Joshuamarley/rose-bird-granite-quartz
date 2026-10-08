export type Stock = {
  code: string
  name: string
  board: string
  chg: number
  amt: number
  px: number
  hi: number
  lo: number
  turn: number
  st: boolean
}

export type Note = {
  line: string
  role: string
  extra: string
}

export type Guide = {
  pressure: number
  support: number | null
  entryLow: number | null
  entryHigh: number | null
  pattern: string
  where: string
  action: string
  avoid: string
  holding: string
}

export const NOTES: Record<string, Note> = {
  "603127": {
    line: "医药",
    role: "主线核心",
    extra: "价格回到带里还不够，还要竞价有真实成交、医药至少两只延续、药明同步转强。孤立封板就放弃。",
  },
  "603259": {
    line: "医药",
    role: "容量核心",
    extra: "167.34 仍低于 9 月 23 日收盘 167.95，这是修复不是加速。放量不涨，或跌破 159.40，就减。",
  },
  "600276": {
    line: "医药",
    role: "容量支点",
    extra: "只在医药一起走、回踩还有人接时看。假期消息高开低走就放弃。二期数据不是获批。",
  },
  "301047": {
    line: "医药",
    role: "弹性观察",
    extra: "165 没站住。只看湿实验订单能不能兑现，不把它当药明。",
  },
  "603200": {
    line: "锂电",
    role: "换手核心",
    extra: "还要换手后不掉队、国轩重新走强、2 板有延续。爆量后没有溢价，或跌破 41.48，放弃。",
  },
  "002074": {
    line: "锂电",
    role: "容量核心",
    extra: "30.49 高开回到 29.50，承接还没确认。只有洗霸还在、自己守住低点再向上，才试错。",
  },
  "600241": {
    line: "锂电",
    role: "3 板标尺",
    extra: "成交只有 0.75 亿。不排队。就它强、材料和容量转弱，不接力。",
  },
  "000011": {
    line: "地产",
    role: "反核核心",
    extra: "从 10.02 拉到 12.24，分歧很大。节后不能低开低走，还要万科和滨江一起接。",
  },
  "000002": {
    line: "地产",
    role: "容量核心",
    extra: "只看深物业、滨江和它自己一起强。政策修复不等于债务风险没了。",
  },
  "002244": {
    line: "地产",
    role: "跟随",
    extra: "单独高开不算确认，要和深物业、万科同向。",
  },
  "600418": {
    line: "辅助",
    role: "趋势观察",
    extra: "日内 24.96 到 28.64。不能因为之前没上车就追 27.47。还要汽车容量一起动。",
  },
  "300413": {
    line: "辅助",
    role: "内容观察",
    extra: "19.61–21.45 是昨天的价格区间，不是买点。要在这个区间里回踩后再转强，内容方向还要有跟随。",
  },
  "000678": {
    line: "辅助",
    role: "4 板",
    extra: "汽零、机器人只是辅助。三花当天只涨 0.51%，容量没跟上，不把 4 板当主线。",
  },
  "002242": {
    line: "辅助",
    role: "3 板",
    extra: "家电、机器人辅助。容量没共振，不因 3 板改成主线。",
  },
  "600825": {
    line: "高度",
    role: "7 板",
    extra: "重组逻辑独立，不能外推到芒果。7 板不能代表市场回暖。",
  },
  "002050": {
    line: "辅助",
    role: "容量对照",
    extra: "机器人容量对照。它不转强，小票高度就不能当成主线。",
  },
  "300750": {
    line: "锂电",
    role: "容量参照",
    extra: "排产预测不是已交付收入。传统电池和固态分开看，不跟洗霸的板。",
  },
  "300408": {
    line: "观察",
    role: "PCB",
    extra: "当天退出主线。量价转强并带动板块才重新看，预测订单不是锁定订单。",
  },
  "601208": {
    line: "观察",
    role: "材料",
    extra: "节前走弱。树脂升级要看客户认证，不因题材名提前做。",
  },
  "301486": {
    line: "观察",
    role: "光连接",
    extra: "5 亿美元是需求预测，不是订单。没有实际下单，不按预测切入。",
  },
}

const r2 = (n: number) => Math.round(n * 100) / 100
const n2 = (n: number) => n.toFixed(2)

function finish(s: Stock, g: Guide): Guide {
  const note = NOTES[s.code]
  if (note) g.action = `${g.action}${note.extra}`
  if (!note && s.amt < 0.4 && g.pattern !== "一字" && g.pattern !== "风险警示") {
    g.entryLow = null
    g.entryHigh = null
    g.where = "成交太小"
    g.pattern = "流动性不够"
    g.action = `${s.name} 今天成交只有 ${s.amt} 亿，收 ${n2(s.px)}。压力 ${n2(s.hi)}，支撑 ${g.support == null ? "没有" : n2(g.support)}。价可以看，但接不住，没有合适切入。`
    g.avoid = "不因为别的票涨了就来做这只。"
  }
  return g
}

export function guide(s: Stock): Guide {
  const range = Math.max(0, r2(s.hi - s.lo))
  const amp = s.lo > 0 ? range / s.lo : 0
  const pos = range < 0.02 ? 1 : (s.px - s.lo) / range
  const nearHigh = s.px > 0 && (s.hi - s.px) / s.px < 0.004
  const limit = s.chg >= 9.5 && nearHigh
  const oneWord = s.hi === s.lo || (limit && amp < 0.012)
  const narrow = limit && !oneWord && amp < 0.03

  if (s.st) {
    return finish(s, {
      pressure: s.hi,
      support: s.lo,
      entryLow: null,
      entryHigh: null,
      pattern: "风险警示",
      where: "不给切入",
      action: `${s.name} 是风险警示股。压力 ${n2(s.hi)}，支撑 ${n2(s.lo)}，这两个价只作对照。`,
      avoid: "不因为别的票涨停去碰它。",
      holding: "已经拿着的单独核对，不按主线加。",
    })
  }

  if (oneWord) {
    return finish(s, {
      pressure: s.hi,
      support: null,
      entryLow: null,
      entryHigh: null,
      pattern: "一字",
      where: "没有切入位",
      action: `${s.name} 全天最高和最低都是 ${n2(s.hi)}，涨 ${s.chg.toFixed(2)}%，成交 ${s.amt} 亿。没有日内回撤，所以没有支撑，也没有合适切入。`,
      avoid: "不排队。开盘价不是买点。",
      holding: `已经拿着的，等开板。开板后守不住 ${n2(s.hi)} 附近，先复核，不补。`,
    })
  }

  if (narrow) {
    return finish(s, {
      pressure: s.hi,
      support: s.lo,
      entryLow: null,
      entryHigh: null,
      pattern: "窄幅涨停",
      where: "回撤空间不够",
      action: `${s.name} 收在涨停 ${n2(s.hi)}，日内低点 ${n2(s.lo)}，上下只差 ${n2(range)} 元，换手 ${s.turn.toFixed(2)}%。回撤太浅，没有合适切入。`,
      avoid: `不追 ${n2(s.hi)}。`,
      holding: `已经拿着的不加。跌破 ${n2(s.lo)} 先复核。`,
    })
  }

  if (limit) {
    const entryHigh = r2(s.hi - 0.382 * range)
    const entryLow = r2(s.hi - 0.5 * range)
    return finish(s, {
      pressure: s.hi,
      support: s.lo,
      entryLow,
      entryHigh,
      pattern: "有分歧的涨停",
      where: `现价比切入上沿高 ${n2(s.px - entryHigh)} 元`,
      action: `${s.name} 压力是涨停价 ${n2(s.hi)}，支撑是日内低点 ${n2(s.lo)}。合适切入在 ${n2(entryLow)}–${n2(entryHigh)}，大约从压力回撤四成到一半。现价 ${n2(s.px)} 贴着压力，成交 ${s.amt} 亿。`,
      avoid: `不在 ${n2(s.px)} 追。跌破 ${n2(s.lo)} 这档失效。`,
      holding: `已经拿着的不加。跌回 ${n2(entryLow)}–${n2(entryHigh)} 再决定留不留，跌破 ${n2(s.lo)} 先复核。`,
    })
  }

  if ((s.hi - s.px) / Math.max(s.px, 0.01) > 0.02 && pos < 0.82 && s.chg > -1) {
    const entryHigh = r2(s.lo + 0.45 * range)
    const entryLow = r2(s.lo + 0.2 * range)
    const inside = s.px >= entryLow && s.px <= entryHigh
    return finish(s, {
      pressure: s.hi,
      support: s.lo,
      entryLow,
      entryHigh,
      pattern: "冲高回落",
      where: inside ? "价格落在带里，但高点没站住" : `从高点回落了 ${n2(s.hi - s.px)} 元，还没进带`,
      action: `${s.name} 压力 ${n2(s.hi)} 没站住，收在 ${n2(s.px)}，从高点回落 ${n2(s.hi - s.px)} 元。支撑 ${n2(s.lo)}。合适切入 ${n2(entryLow)}–${n2(entryHigh)}，而且要在这个带里重新向上。`,
      avoid: `不追 ${n2(s.hi)}，也不在回落的半路接。`,
      holding: `已经拿着的，守住 ${n2(s.lo)} 可以再看。跌破支撑先复核，不要在 ${n2(s.hi)} 补。`,
    })
  }

  if (s.chg <= -1 || pos < 0.28) {
    return finish(s, {
      pressure: s.hi,
      support: s.lo,
      entryLow: null,
      entryHigh: null,
      pattern: "试支撑",
      where: "不抄",
      action: `${s.name} 今天 ${s.chg.toFixed(2)}%，收 ${n2(s.px)}，离支撑 ${n2(s.lo)} 只差 ${n2(s.px - s.lo)} 元，压力在 ${n2(s.hi)}。这是在试支撑，不是切入。`,
      avoid: "不因为接近低点就接。",
      holding: `已经拿着的，跌破 ${n2(s.lo)} 先复核。不过 ${n2(s.hi)} 不加。`,
    })
  }

  if (pos >= 0.68) {
    const entryHigh = r2(s.lo + 0.5 * range)
    const entryLow = r2(s.lo + 0.28 * range)
    return finish(s, {
      pressure: s.hi,
      support: s.lo,
      entryLow,
      entryHigh,
      pattern: "收在上沿",
      where: `现价比切入上沿高 ${n2(s.px - entryHigh)} 元`,
      action: `${s.name} 压力 ${n2(s.hi)}，支撑 ${n2(s.lo)}，收盘 ${n2(s.px)} 在区间上沿，离压力 ${n2(s.hi - s.px)} 元。合适切入是回踩 ${n2(entryLow)}–${n2(entryHigh)}，不是现价。成交 ${s.amt} 亿。`,
      avoid: "不追收盘。",
      holding: `已经拿着的不加。跌进 ${n2(entryLow)}–${n2(entryHigh)} 再看，跌破 ${n2(s.lo)} 先复核。`,
    })
  }

  const entryHigh = r2(s.lo + 0.48 * range)
  const entryLow = r2(s.lo + 0.18 * range)
  const inside = s.px >= entryLow && s.px <= entryHigh
  return finish(s, {
    pressure: s.hi,
    support: s.lo,
    entryLow,
    entryHigh,
    pattern: "区间中部",
    where: inside ? "现价在切入带内" : "现价还没回到切入带",
    action: inside
      ? `${s.name} 现价 ${n2(s.px)} 落在 ${n2(entryLow)}–${n2(entryHigh)}。压力 ${n2(s.hi)}，支撑 ${n2(s.lo)}，今天涨跌 ${s.chg.toFixed(2)}%，成交 ${s.amt} 亿。价格到了，还要看是不是今天的方向。`
      : `${s.name} 压力 ${n2(s.hi)}，支撑 ${n2(s.lo)}。切入带 ${n2(entryLow)}–${n2(entryHigh)}，现价 ${n2(s.px)} 还没回到带里，成交 ${s.amt} 亿。`,
    avoid: inside ? "不在三条方向里的，不因为落在带里就单开。" : "没回到带里不动。",
    holding: `已经拿着的，支撑 ${n2(s.lo)} 是失效价。不到压力 ${n2(s.hi)} 不加。`,
  })
}
