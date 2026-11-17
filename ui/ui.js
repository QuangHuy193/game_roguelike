G.ui={tab:'b',sel:1,mt:1,bt:'e',res:null,sp:0,
init(){G.load();this.sel=G.D.ch;if(!G.D.hero)this.tab='s';Object.values(G.heroes).forEach(h=>G.pic(h.img));this.draw()},
go(t){if(t=='t'&&G.D.lv<3)return alert('Chưa mở khóa! Cần tài khoản cấp 3');this.tab=t;this.res=null;this.draw()},
set(k,v){this[k]=v;this.draw()},
draw(){const D=G.D,$=i=>document.getElementById(i);
 $('top').innerHTML=`<span>⭐ Cấp ${D.lv}</span><span>🪙 ${D.gold.toLocaleString()}</span><span>💎 ${D.gem}</span><span>🔴 ${D.rc}</span><div class=bar><i style="width:${D.exp/G.need(D.lv)*100}%"></i></div>`;
 $('nav').innerHTML=[['s','🛒','Cửa hàng'],['c','👤','Nhân vật'],['b','🏠','Trang chủ'],['t','🌟','Tài năng'],['o','⚙️','Khác']].map(([k,i,n])=>`<button title="${n}" class="${k==this.tab?'on':''}${k=='t'&&D.lv<3?' lk':''}" onclick="G.ui.go('${k}')">${k=='t'&&D.lv<3?'🔒':i}</button>`).join('');
 $('main').innerHTML=this[this.tab]()},
cell(x,f){const r=G.rar[x.r],s=G.slots[x.s],st=Object.entries(G.itemStat(x)).map(([k,v])=>G.ic[k]+v).join('<br>');return`<div class=cell style="border-color:${r[1]};color:${r[1]}" ${f?`onclick="${f}"`:''}>${s[0]}<small>${st}</small></div>`},
// ---- Cửa hàng
s(){const D=G.D,S=G.shop,P=(k,n,f)=>`<div class=card style="text-align:center"><div style="font-size:44px;${f}">🔑</div><b>${n}</b><div class=row><button class=b onclick="G.ui.open('${k}',1)">x1 · 💎${S.x1}</button><button class=b onclick="G.ui.open('${k}',10)">x10 · 💎${S.x10}</button></div></div>`;
 return(this.res?`<div class=card><b>🎁 Vừa nhận</b><div class=g5 style="margin-top:8px">${this.res.map(x=>this.cell(x)).join('')}</div></div>`:'')
 +P('p','Rương cao cấp','')+P('n','Rương thường','filter:grayscale(1) brightness(1.5)')
 +'<p class=hd>💱 Đổi kim cương thành vàng</p><div class=grid>'+S.ex.map((e,i)=>`<div class=cell style="font-size:16px;cursor:pointer" onclick="G.ui.ex(${i})">🪙<b>${e[1].toLocaleString()}</b><small>💎 ${e[0]}</small></div>`).join('')+'</div>'
 +'<p class=hd>🦸 Anh hùng</p>'+Object.entries(G.heroes).map(([k,h])=>`<div class=card style="display:flex;gap:10px;align-items:center">${G.art(h,84)}<div style="flex:1"><b>${h.n}</b><br><small>${h.d}<br>❤️${h.hp} ⚔️${h.atk} 🛡️${h.def} 🎯${h.range}</small></div>${D.own.includes(k)?'<small>Đã có</small>':`<button class=b onclick="G.ui.buy('${k}')">💎 ${h.cost}</button>`}</div>`).join('')},
open(k,n){const D=G.D,c=n==10?G.shop.x10:G.shop.x1;if(D.gem<c)return alert('Không đủ kim cương');if(D.inv.length+n>D.slots)return alert('Túi đầy! Hãy bán bớt đồ hoặc mua thêm ô.');
 D.gem-=c;this.res=[];for(let i=0;i<n;i++){const x=G.chest(Math.max(1,D.ch),k=='p');D.inv.push(x);this.res.push(x)}G.save();this.draw()},
ex(i){const D=G.D,e=G.shop.ex[i];if(D.gem<e[0])return alert('Không đủ kim cương');D.gem-=e[0];D.gold+=e[1];G.save();this.draw()},
buy(k){const D=G.D,h=G.heroes[k];if(D.gem<h.cost)return alert('Không đủ kim cương');D.gem-=h.cost;D.own.push(k);D.hero=D.hero||k;G.save();this.draw()},
// ---- Nhân vật
c(){const D=G.D,h=G.heroes[D.hero];if(!h)return'<div class=card>Hãy mua anh hùng ở tab Cửa hàng 🛒</div>';
 const lk=D.lv<2,sl=k=>D.eq[k]?this.cell(D.eq[k],`G.ui.unw('${k}')`):`<div class=cell style="color:#778">${lk?'🔒':G.slots[k][0]}</div>`;
 return`<div class=card><div class=hr><div class=col>${['weapon','ring','glove'].map(sl).join('')}</div>
 <div style="flex:1;text-align:center"><div><button class=sm onclick="G.ui.sw(-1)">◀</button> <b>${h.n}</b> <button class=sm onclick="G.ui.sw(1)">▶</button></div>${G.art(h,200)}</div>
 <div class=col>${['armor','neck','boots'].map(sl).join('')}</div></div>
 <div class=row><button class=b onclick="G.ui.tog()">📊 ${this.sp?'Ẩn':'Xem'} chỉ số</button></div>${this.sp?this.sheet():''}</div>
 <div class=card><div class=sub>${[1,2,3].map(i=>`<button class="${i==this.mt?'on':''}" onclick="G.ui.set('mt',${i})">${i}</button>`).join('')}</div><p style="text-align:center;color:#99a;padding:10px">Đang cập nhật (${this.mt})</p></div>${this.bag()}`},
bag(){const D=G.D,e=this.bt=='e',its=e?D.inv:[],c=[];for(let i=0;i<D.slots;i++)c.push(its[i]?this.cell(its[i],`G.ui.wear(${i})`):'<div class=cell></div>');
 return`<div class=card><div style="display:flex;align-items:center;gap:6px"><div class=sub style="flex:1;margin:0"><button class="${e?'on':''}" onclick="G.ui.set('bt','e')">Trang bị</button><button class="${e?'':'on'}" onclick="G.ui.set('bt','i')">Vật phẩm</button></div><button class=sm onclick="G.ui.sort()">⇅</button><button class=sm onclick="G.ui.sell()">💰</button><small>${its.length}/${D.slots}</small><button class=sm onclick="G.ui.slot()">＋</button></div><div class=g5 style="margin-top:8px">${c.join('')}</div></div>`},
sw(d){const D=G.D,o=D.own;D.hero=o[(o.indexOf(D.hero)+d+o.length)%o.length];G.save();this.draw()},
wear(i){const D=G.D;if(D.lv<2)return alert('Trang bị mở ở tài khoản cấp 2');const x=D.inv.splice(i,1)[0];if(D.eq[x.s])D.inv.push(D.eq[x.s]);D.eq[x.s]=x;G.save();this.draw()},
unw(k){const D=G.D;if(D.inv.length>=D.slots)return alert('Túi đầy!');D.inv.push(D.eq[k]);delete D.eq[k];G.save();this.draw()},
sort(){const K=Object.keys(G.slots);G.D.inv.sort((a,b)=>b.r-a.r||b.c-a.c||K.indexOf(a.s)-K.indexOf(b.s));G.save();this.draw()},
sell(){const D=G.D,k=D.inv.filter(x=>x.r<2);if(!k.length)return alert('Không có đồ Cơ bản/Tốt để bán');if(!confirm('Bán '+k.length+' món Cơ bản và Tốt?'))return;D.gold+=k.reduce((a,x)=>a+G.worth(x),0);D.inv=D.inv.filter(x=>x.r>=2);G.save();this.draw()},
slot(){const D=G.D,S=G.shop;if(D.slots>=S.slotMax)return alert('Đã đạt số ô tối đa');if(D.gem<S.slotCost)return alert('Không đủ kim cương');if(confirm(`Mua thêm ${S.slotAdd} ô túi với ${S.slotCost} 💎?`)){D.gem-=S.slotCost;D.slots+=S.slotAdd;G.save();this.draw()}},
tog(){this.sp=!this.sp;this.draw()},
sheet(){const q=G.parts(),r=v=>+v.toFixed(1),n=v=>v?r(v):'–',pc=v=>v?r(v*100)+'%':'–',tot=k=>q.h[k]+q.e[k]+q.t[k];
 const rows=[['❤️ Máu','hp'],['⚔️ Công','atk'],['🛡️ Thủ','def']].map(([m,k])=>[m,r(q.h[k]),n(q.e[k]),n(q.t[k]),r(tot(k))]);
 rows.push(['🎯 Bạo kích',pc(q.h.crit),'–',pc(q.t.crit),pc(q.h.crit+q.t.crit)],['⚡ Tốc đánh/giây',r(q.h.as),'–',pc(q.t.as),r(q.h.as*(1+q.t.as))],['💚 Hồi máu/giây','–','–',pc(q.t.reg),pc(q.t.reg)],['💰 Vàng thêm','–','–',pc(q.t.gold),pc(q.t.gold)]);
 return`<table class=st><tr><th></th><th>Anh hùng</th><th>Trang bị</th><th>Thiên phú</th><th>Tổng</th></tr>${rows.map(a=>`<tr>${a.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table>`},
// ---- Trang chủ
b(){const D=G.D,h=G.heroes[D.hero];if(!h)return'<div class=card>Hãy mua anh hùng ở tab Cửa hàng 🛒 để bắt đầu.</div>';
 const s=G.stats(),n=Math.min(30,8+4*this.sel);
 return`<div class=card style="text-align:center"><div>${G.art(h,230)}</div><b>${h.n}</b><br>❤️ ${s.hp|0} &nbsp; ⚔️ ${s.atk|0} &nbsp; 🛡️ ${s.def|0}</div>
 <div class=card style="text-align:center"><button class=b onclick="G.ui.chp(-1)">◀</button> &nbsp;<b>Chương ${this.sel}</b>&nbsp; <button class=b onclick="G.ui.chp(1)">▶</button><p style="margin:10px 0">${n} phòng, boss ở phòng cuối</p><button class=b style="font-size:18px;padding:12px 28px" onclick="G.ui.play()">VÀO CHIẾN</button></div>
 <p style="color:#99a;font-size:12px">Kéo ngón tay/chuột (hoặc WASD, phím mũi tên) để di chuyển. Đứng yên là tự động bắn.</p>`},
chp(d){this.sel=Math.max(1,Math.min(G.D.ch,this.sel+d));this.draw()},
play(){document.getElementById('bt').classList.remove('hide');G.battle.start(this.sel)},
// ---- Tài năng (thiên phú)
t(){const D=G.D;let h='<p style="color:#99a;font-size:12px;margin-bottom:8px">Nâng Công, Máu, Thủ lên cấp 10 để mở giai đoạn kế. Mỗi 2 giai đoạn có thiên phú phụ trợ dùng pha lê đỏ.</p>';
 for(let s=1;s<=G.TS;s++){const L=D.tal[s]||[0,0,0],k=!G.tdone(s-1);
  h+=`<div class=card style="opacity:${k?.5:1}"><b>Giai đoạn ${s}</b>${k?' 🔒':''}`+[`⚔️ Công +${s}`,`❤️ Máu +${8*s}`,`🛡️ Thủ +${s/2}`].map((n,j)=>`<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><span>${n} · ${L[j]}/10</span><button class=b ${k||L[j]>=10?'disabled':''} onclick="G.ui.up(${s},${j})">🪙 ${30*(L[j]+1)*s}</button></div>`).join('')+'</div>';
  if(s%2==0){const i=s/2-1,a=G.auxs[i],l=D.aux[i]||0,x=!G.tdone(s);
   h+=`<div class=card style="border:1px solid #c33;opacity:${x?.5:1};display:flex;justify-content:space-between;align-items:center"><span>${a[0]} <b>${a[1]}</b> ${x?'🔒':''}<br><small>${a[2]} · Cấp ${l}/5</small></span><button class=b ${x||l>=5?'disabled':''} onclick="G.ui.aux(${i})">🔴 ${l+1}</button></div>`}}
 return h},
up(s,j){const D=G.D,L=D.tal[s]=D.tal[s]||[0,0,0],c=30*(L[j]+1)*s;if(D.gold<c)return alert('Không đủ vàng');D.gold-=c;L[j]++;G.save();this.draw()},
aux(i){const D=G.D,l=D.aux[i]||0;if(D.rc<l+1)return alert('Không đủ pha lê đỏ');D.rc-=l+1;D.aux[i]=l+1;G.save();this.draw()},
// ---- Khác
o(){return'<div class=card style="text-align:center;padding:40px">⚙️<br>Đang cập nhật</div>'}};
