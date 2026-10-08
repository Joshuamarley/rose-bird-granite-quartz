const NOTES = require("../../data/notes.js")
const UNI = require("../../data/stocks.js")
const CORES = ["603127","603259","600276","301047","603200","002074","600241","000011","000002","002244","600418","300413","000678","002242","600825","002050","300750","300408","601208","301486"]
function find(code){return UNI.find(x=>x[0]===code)}
Page({
  data:{line:"all", cores:[], q:"", hits:[]},
  onLoad(){this.renderCores()},
  setLine(e){this.setData({line:e.currentTarget.dataset.line}); this.renderCores()},
  renderCores(){
    const line=this.data.line
    const cores=CORES.filter(c=>{
      const n=NOTES[c]
      if(line==="all") return true
      if(line==="辅助") return n.line==="辅助"||n.line==="观察"||n.line==="高度"
      return n.line===line
    }).map(c=>{
      const s=find(c)||[c,c]
      return {code:c, name:s[1], line:NOTES[c].line, role:NOTES[c].role, do:NOTES[c].do}
    })
    this.setData({cores})
  },
  onSearch(e){
    const q=(e.detail.value||"").trim()
    if(!q){this.setData({q,hits:[]}); return}
    const hits=UNI.filter(s=>(s[0]+s[1]).indexOf(q)>=0).slice(0,12).map(s=>({
      code:s[0], name:s[1], chg:(s[3]>0?"+":"")+s[3]+"%", role:NOTES[s[0]]?NOTES[s[0]].role:"非核心池"
    }))
    this.setData({q,hits})
  },
  open(e){
    wx.navigateTo({url:"/pages/detail/detail?code="+e.currentTarget.dataset.code})
  }
})
