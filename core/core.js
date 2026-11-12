const G={heroes:{},ui:{},ic:{atk:'⚔️',hp:'❤️',def:'🛡️'},
rar:[['Cơ bản','#ddd',1],['Tốt','#4c4',1.5],['Hiếm','#4af',2.2],['Sử thi','#b5f',3.2],['Huyền thoại','#fb2',5]],
D:{gold:0,gem:150,rc:0,exp:0,lv:1,ch:1,hero:null,own:[],inv:[],eq:{},tal:{},aux:{}},
need:l=>100*l,
load(){try{Object.assign(G.D,JSON.parse(localStorage.getItem('dtah')||'{}'))}catch(e){}},
save(){try{localStorage.setItem('dtah',JSON.stringify(G.D))}catch(e){}},
addExp(n){const D=G.D;D.exp+=n;while(D.exp>=G.need(D.lv)){D.exp-=G.need(D.lv);D.lv++}},
parts(){const D=G.D,h=G.heroes[D.hero],E={atk:0,hp:0,def:0};
 for(const k in D.eq){const o=G.itemStat(D.eq[k]);for(const t in o)E[t]+=o[t]}
 return{h:{hp:h.hp,atk:h.atk,def:h.def,crit:.05,as:h.as},e:E,t:G.talParts()}},
stats(){const q=G.parts(),a=q.h,e=q.e,t=q.t;
 return{hp:a.hp+e.hp+t.hp,atk:a.atk+e.atk+t.atk,def:a.def+e.def+t.def,crit:a.crit+t.crit,as:1+t.as,reg:t.reg,gold:1+t.gold}}};
