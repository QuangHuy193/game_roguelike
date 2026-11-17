G.slots={weapon:['🗡️','Vũ khí',{atk:10}],glove:['🧤','Găng tay',{atk:4,def:3}],boots:['👢','Giày',{atk:4,def:3}],ring:['💍','Nhẫn',{atk:4,hp:30}],neck:['📿','Dây chuyền',{atk:4,hp:30}],armor:['🛡️','Giáp',{hp:80}]};
G.itemStat=it=>{const o={},b=G.slots[it.s][2],m=G.rar[it.r][2]*(1+.25*(it.c-1));for(const k in b)o[k]=Math.round(b[k]*m);return o};
G.drop=ch=>{const ks=Object.keys(G.slots),x=Math.random()+ch*.03;return{s:ks[Math.random()*6|0],r:x<.5?0:x<.8?1:x<.93?2:x<.985?3:4,c:ch}};
G.chest=(ch,p)=>{const w=p?[0,45,35,16,4]:[55,28,12,4,1];let x=Math.random()*100,r=0;while(r<4&&(x-=w[r])>=0)r++;return{s:Object.keys(G.slots)[Math.random()*6|0],r,c:ch}};
G.worth=it=>(it.r+1)*80*it.c;
G.addItem=it=>{const D=G.D;if(D.inv.length<D.slots)D.inv.push(it);else D.gold+=G.worth(it)};
