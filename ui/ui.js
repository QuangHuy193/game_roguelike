G.ui={tab:'b',sel:1,
init(){G.load();this.sel=G.D.ch;if(!G.D.hero)this.tab='h';this.draw()},
go(t){if(t=='e'&&G.D.lv<2||t=='t'&&G.D.lv<3)return alert('Chưa mở khóa! Cần tài khoản cấp '+(t=='e'?2:3));this.tab=t;this.draw()},
draw(){const D=G.D,$=i=>document.getElementById(i);
 $('top').innerHTML=`<span>⭐ Cấp ${D.lv}</span><span>🪙 ${D.gold}</span><span>💎 ${D.gem}</span><span>🔴 ${D.rc}</span><div class=bar><i style="width:${D.exp/G.need(D.lv)*100}%"></i></div>`;
 $('nav').innerHTML=[['b','⚔️ Chiến'],['h','🦸 Anh hùng'],['e','🎽 Trang bị'+(D.lv<2?'🔒':'')],['t','🌟 Thiên phú'+(D.lv<3?'🔒':'')]].map(([k,n])=>`<button class="${k==this.tab?'on':''}" onclick="G.ui.go('${k}')">${n}</button>`).join('');
 $('main').innerHTML=this[this.tab]()},
b(){const D=G.D,h=G.heroes[D.hero];if(!h)return'<div class=card>Hãy mua anh hùng ở tab Anh hùng để bắt đầu.</div>';
 const s=G.stats(),n=Math.min(30,8+4*this.sel);
 return`<div class=card style="text-align:center"><div style="font-size:64px">${h.ic}</div><b>${h.n}</b><br>❤️ ${s.hp|0} &nbsp; ⚔️ ${s.atk|0} &nbsp; 🛡️ ${s.def|0}</div>
 <div class=card style="text-align:center"><button class=b onclick="G.ui.chp(-1)">◀</button> &nbsp;<b>Chương ${this.sel}</b>&nbsp; <button class=b onclick="G.ui.chp(1)">▶</button><p style="margin:10px 0">${n} phòng, boss ở phòng cuối</p><button class=b style="font-size:18px;padding:12px 28px" onclick="G.ui.play()">VÀO CHIẾN</button></div>
 <p style="color:#99a;font-size:12px">Kéo ngón tay/chuột (hoặc WASD, phím mũi tên) để di chuyển. Đứng yên là tự động bắn.</p>`},
chp(d){this.sel=Math.max(1,Math.min(G.D.ch,this.sel+d));this.draw()},
play(){document.getElementById('bt').classList.remove('hide');G.battle.start(this.sel)},
h(){return Object.entries(G.heroes).map(([k,h])=>{const o=G.D.own.includes(k),u=G.D.hero==k;
 return`<div class=card style="display:flex;gap:10px;align-items:center"><span style="font-size:42px">${h.ic}</span><div style="flex:1"><b>${h.n}</b><br><small>${h.d}<br>❤️${h.hp} ⚔️${h.atk} 🛡️${h.def}</small></div>${o?`<button class=b ${u?'disabled':''} onclick="G.ui.pick('${k}')">${u?'Đang dùng':'Chọn'}</button>`:`<button class=b onclick="G.ui.buy('${k}')">💎 ${h.cost}</button>`}</div>`}).join('')},
buy(k){const D=G.D,h=G.heroes[k];if(D.gem<h.cost)return alert('Không đủ kim cương');D.gem-=h.cost;D.own.push(k);D.hero=D.hero||k;G.save();this.draw()},
pick(k){G.D.hero=k;G.save();this.draw()},
e(){const D=G.D,it=(x,i)=>{const r=G.rar[x.r],s=G.slots[x.s];return`<div class=it style="border-color:${r[1]};color:${r[1]}" ${i>=0?`onclick="G.ui.wear(${i})"`:''}>${s[0]}<br>${s[1]}<br>${r[0]}<br><small>${Object.entries(G.itemStat(x)).map(([k,v])=>G.ic[k]+v).join(' ')}</small></div>`};
 const sl=Object.keys(G.slots).map(k=>D.eq[k]?it(D.eq[k],-1):`<div class=it style="border-color:#555;color:#777">${G.slots[k][0]}<br>${G.slots[k][1]}<br>Trống</div>`).join('');
 return`<button class=b onclick="G.ui.tog()">📊 ${this.sp?'Ẩn':'Xem'} chỉ số nhân vật</button>${this.sp?this.sheet():''}<div style="height:12px"></div><b>Đang mặc</b><div class=grid style="margin:8px 0 14px">${sl}</div><b>Kho (${D.inv.length}) </b> <button class=b onclick="G.ui.sell()">Bán tất cả</button><p style="color:#99a;font-size:12px;margin:6px 0">Chạm vào đồ trong kho để mặc.</p><div class=grid>${D.inv.map(it).join('')}</div>`},
tog(){this.sp=!this.sp;this.draw()},
sheet(){const q=G.parts(),r=v=>+v.toFixed(1),n=v=>v?r(v):'–',pc=v=>v?r(v*100)+'%':'–',tot=k=>q.h[k]+q.e[k]+q.t[k];
 const rows=[['❤️ Máu','hp'],['⚔️ Công','atk'],['🛡️ Thủ','def']].map(([m,k])=>[m,r(q.h[k]),n(q.e[k]),n(q.t[k]),r(tot(k))]);
 rows.push(['🎯 Bạo kích',pc(q.h.crit),'–',pc(q.t.crit),pc(q.h.crit+q.t.crit)],['⚡ Tốc đánh/giây',r(q.h.as),'–',pc(q.t.as),r(q.h.as*(1+q.t.as))],['💚 Hồi máu/giây','–','–',pc(q.t.reg),pc(q.t.reg)],['💰 Vàng thêm','–','–',pc(q.t.gold),pc(q.t.gold)]);
 return`<table class=st><tr><th></th><th>Anh hùng</th><th>Trang bị</th><th>Thiên phú</th><th>Tổng</th></tr>${rows.map(a=>`<tr>${a.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table>`},
wear(i){const D=G.D,x=D.inv.splice(i,1)[0];if(D.eq[x.s])D.inv.push(D.eq[x.s]);D.eq[x.s]=x;G.save();this.draw()},
sell(){const D=G.D;D.gold+=D.inv.reduce((a,x)=>a+(x.r+1)*80*x.c,0);D.inv=[];G.save();this.draw()},
t(){const D=G.D;let h='<p style="color:#99a;font-size:12px;margin-bottom:8px">Nâng Công, Máu, Thủ lên cấp 10 để mở giai đoạn kế. Mỗi 2 giai đoạn có thiên phú phụ trợ dùng pha lê đỏ.</p>';
 for(let s=1;s<=G.TS;s++){const L=D.tal[s]||[0,0,0],k=!G.tdone(s-1);
  h+=`<div class=card style="opacity:${k?.5:1}"><b>Giai đoạn ${s}</b>${k?' 🔒':''}`+[`⚔️ Công +${s}`,`❤️ Máu +${8*s}`,`🛡️ Thủ +${s/2}`].map((n,j)=>`<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><span>${n} · ${L[j]}/10</span><button class=b ${k||L[j]>=10?'disabled':''} onclick="G.ui.up(${s},${j})">🪙 ${30*(L[j]+1)*s}</button></div>`).join('')+'</div>';
  if(s%2==0){const i=s/2-1,a=G.auxs[i],l=D.aux[i]||0,x=!G.tdone(s);
   h+=`<div class=card style="border:1px solid #c33;opacity:${x?.5:1};display:flex;justify-content:space-between;align-items:center"><span>${a[0]} <b>${a[1]}</b> ${x?'🔒':''}<br><small>${a[2]} · Cấp ${l}/5</small></span><button class=b ${x||l>=5?'disabled':''} onclick="G.ui.aux(${i})">🔴 ${l+1}</button></div>`}}
 return h},
up(s,j){const D=G.D,L=D.tal[s]=D.tal[s]||[0,0,0],c=30*(L[j]+1)*s;if(D.gold<c)return alert('Không đủ vàng');D.gold-=c;L[j]++;G.save();this.draw()},
aux(i){const D=G.D,l=D.aux[i]||0;if(D.rc<l+1)return alert('Không đủ pha lê đỏ');D.rc-=l+1;D.aux[i]=l+1;G.save();this.draw()}};
