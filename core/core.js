const G={heroes:{},ui:{},ic:{atk:'⚔️',hp:'❤️',def:'🛡️'},
rar:[['Cơ bản','#ddd',1],['Tốt','#4c4',1.5],['Hiếm','#4af',2.2],['Sử thi','#b5f',3.2],['Huyền thoại','#fb2',5]],
D:{gold:0,gem:150,rc:0,exp:0,lv:1,ch:1,hero:null,own:[],inv:[],eq:{},tal:{},aux:{}},
need:l=>100*l,
load(){try{Object.assign(G.D,JSON.parse(localStorage.getItem('dtah')||'{}'))}catch(e){}},
save(){try{localStorage.setItem('dtah',JSON.stringify(G.D))}catch(e){}},
addExp(n){const D=G.D;D.exp+=n;while(D.exp>=G.need(D.lv)){D.exp-=G.need(D.lv);D.lv++}},
stats(){const h=G.heroes[G.D.hero],s={hp:h.hp,atk:h.atk,def:h.def,crit:.05,as:1,reg:0,gold:1};
 for(const k in G.D.eq){const o=G.itemStat(G.D.eq[k]);for(const t in o)s[t]+=o[t]}
 G.talStats(s);return s}};
