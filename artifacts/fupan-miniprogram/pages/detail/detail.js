const NOTES = require("../../data/notes.js")
const UNI = require("../../data/stocks.js")
Page({
  data:{ready:false, posture:"empty"},
  onLoad(q){
    const s=UNI.find(x=>x[0]===q.code)
    if(!s){wx.showToast({title:"没有这只",icon:"none"}); return}
    this.s=s
    this.n=NOTES[q.code]
    this.setData({ready:true, name:s[1], code:s[0], price:s[5]||"—", chg:(s[3]>0?"+":"")+s[3]+"%", amt:s[4], role:this.n?this.n.line+" · "+this.n.role:"不在昨天札记核心池"})
    this.fill()
  },
  setP(e){this.setData({posture:e.currentTarget.dataset.p}); this.fill()},
  fill(){
    const n=this.n, s=this.s, p=this.data.posture
    if(n){
      this.setData({
        first:p==="hold"?n.hold:p==="watch"?"先放着看条件，不因为关注就升级。":n.do,
        dont:n.dont,
        budget:"单只试错半成，长短加起来最多2成。三只不是一起买。"
      })
    }else{
      const hot=s[3]>=9.5, cold=s[4]<0.5
      this.setData({
        first:s[8]?"名字里有风险警示，先跳过。":cold?"成交不到0.5亿，今天不单独做。":hot?"昨天已贴涨停，节后先看换手，不追开盘。":"不在三条方向里，今天没有单独出场的理由。",
        dont:"不给它新开一条主线，不因为一天涨跌改口。",
        budget:p==="hold"?"已拿着：按你自己的失效价复核，不按主线加仓。":"还没拿：先不建仓，等下一份札记点名。"
      })
    }
  }
})
