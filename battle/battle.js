(()=>{
const W=360,H=640,cv=document.getElementById('cv'),c=cv.getContext('2d'),ov=document.getElementById('ov'),keys={},hy=Math.hypot,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
let p,E,B,F,T,ch,n,rm,run,last,org,cur,coins,pause,gate,tm,fade,pk;
function fit(){const s=Math.min(innerWidth/W,innerHeight/H),d=devicePixelRatio||1;cv.style.width=W*s+'px';cv.style.height=H*s+'px';cv.width=W*s*d;cv.height=H*s*d;c.setTransform(s*d,0,0,s*d,0,0)}
addEventListener('resize',()=>run&&fit());
addEventListener('keydown',e=>keys[e.key.toLowerCase()]=1);
addEventListener('keyup',e=>delete keys[e.key.toLowerCase()]);
const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H]};
cv.onpointerdown=e=>{const o=pos(e);if(o[0]>W-44&&o[1]<30){if(confirm('Bỏ cuộc?'))end(0);return}org=o;cur=o.slice();cv.setPointerCapture(e.pointerId)};
cv.onpointermove=e=>{if(org)cur=pos(e)};
cv.onpointerup=cv.onpointercancel=()=>{org=cur=null};
const fire=(e,a)=>B.push({x:e.x,y:e.y,vx:Math.cos(a)*140,vy:Math.sin(a)*140,r:5,d:e.atk,e:1});
function room(i){rm=i;E=G.room(ch,i,n);B=[];F=[];T=[];tm=0;fade=1;p.x=W/2;p.y=H-110}
function dmg(e,v,k){e.hp-=v;T.push({x:e.x,y:e.y-e.r,v:v|0,t:.6,k});
 if(e.hp<=0&&!e.dead){e.dead=1;p.xp+=e.ai=='b'?60:10;coins+=Math.round((3+ch*2)*(e.ai=='b'?20:1)*p.gm);
  while(p.xp>=p.nx){p.xp-=p.nx;p.lv++;p.nx=Math.round(p.nx*1.22+8);p.q++}}}
function hurt(v){const d=v*100/(100+p.def);p.hp-=Math.max(1,d);p.inv=.7;T.push({x:p.x,y:p.y-20,v:'-'+Math.round(d),t:.6})}
function shoot(){if(!E.length)return 0;const h=G.heroes[G.D.hero];let t=E[0],bd=1e9;
 for(const e of E){const d=hy(e.x-p.x,e.y-p.y);if(d<bd){bd=d;t=e}}
 const dm=()=>Math.random()<p.crit?[p.atk*2,1]:[p.atk,0];
 if(h.st=='melee'){const R=h.range+(p.mul-1)*15;if(bd>R+t.r)return 0;F.push({x:p.x,y:p.y,r:R,t:.25});for(const e of E)if(hy(e.x-p.x,e.y-p.y)<R+e.r){const[v,w]=dm();dmg(e,v,w)}}
 else{const a=Math.atan2(t.y-p.y,t.x-p.x),o=h.st=='orb',sp=o?250:420;
  for(let k=0;k<p.mul;k++){const q=a+(k-(p.mul-1)/2)*.2,[d,w]=dm();B.push({x:p.x,y:p.y,vx:Math.cos(q)*sp,vy:Math.sin(q)*sp,r:o?9:5,d,w,pi:p.pi,h:[],o})}}
 return 1}
function update(dt){
 tm+=dt;fade=Math.max(0,fade-dt*2);p.inv-=dt;p.ac-=dt;p.hp=Math.min(p.mhp,p.hp+p.mhp*p.reg*dt);
 let vx=0,vy=0;
 if(org){const dx=cur[0]-org[0],dy=cur[1]-org[1],d=hy(dx,dy);if(d>40){org[0]=cur[0]-dx/d*40;org[1]=cur[1]-dy/d*40}if(d>6){vx=dx/d;vy=dy/d}}
 vx+=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0);
 vy+=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
 const m=hy(vx,vy);if(m>1){vx/=m;vy/=m}
 if(gate){const dx=W/2-p.x,dy=100-p.y,d=hy(dx,dy);
  if(d<10){gate=0;p.hp=Math.min(p.mhp,p.hp+p.mhp*.15);p.inv=1;room(rm+1);return}
  p.x+=dx/d*320*dt;p.y+=dy/d*320*dt}
 else{p.x=cl(p.x+vx*p.spd*dt,p.r,W-p.r);p.y=cl(p.y+vy*p.spd*dt,80+p.r,H-p.r);
  if(!(vx||vy)&&p.ac<=0&&tm>.3&&shoot())p.ac=1/p.as}
 if(tm>.6)for(const e of E){if(e.dead)continue;
  const dx=p.x-e.x,dy=p.y-e.y,d=hy(dx,dy)||1,mv=e.ai=='s'?(d>200?1:d<130?-1:0):1;
  e.x=cl(e.x+dx/d*e.spd*mv*dt,e.r,W-e.r);e.y=cl(e.y+dy/d*e.spd*mv*dt,72+e.r,H-e.r);
  if(!'cf'.includes(e.ai)&&(e.cd-=dt)<=0){const a=Math.atan2(dy,dx);
   if(e.ai=='s')fire(e,a);
   else if(e.ai=='m')[-.3,0,.3].forEach(o=>fire(e,a+o));
   else if(e.k++%2){for(let k=0;k<10;k++)fire(e,k*.628+tm)}
   else[-.25,0,.25].forEach(o=>fire(e,a+o));
   e.cd=2.3}
  if(d<e.r+p.r&&p.inv<=0)hurt(e.atk)}
 for(const b of B){b.x+=b.vx*dt;b.y+=b.vy*dt;
  if(b.x<0||b.x>W||b.y<72||b.y>H){b.z=1;continue}
  if(b.e){if(p.inv<=0&&hy(b.x-p.x,b.y-p.y)<b.r+p.r-2){hurt(b.d);b.z=1}}
  else for(const e of E){if(e.dead||b.h.includes(e))continue;
   if(hy(b.x-e.x,b.y-e.y)<b.r+e.r){dmg(e,b.d,b.w);b.h.push(e);if(b.pi--<=0){b.z=1;break}}}}
 B=B.filter(b=>!b.z);E=E.filter(e=>!e.dead);
 F.forEach(f=>f.t-=dt);F=F.filter(f=>f.t>0);T.forEach(t=>{t.t-=dt;t.y-=25*dt});T=T.filter(t=>t.t>0);
 if(p.hp<=0)return end(0);
 if(p.q){choose();return}
 if(!E.length&&!gate){if(rm==n)return end(1);gate=1;B=B.filter(b=>!b.e);p.inv=9}}
const em=(s,x,y,r)=>{c.font=r*2+'px serif';c.textAlign='center';c.fillText(s,x,y)};
function draw(){
 c.textBaseline='middle';c.fillStyle='#1e2433';c.fillRect(0,0,W,H);
 c.fillStyle='#262e42';for(let y=72;y<H;y+=36)for(let x=y/36%2?0:36;x<W;x+=72)c.fillRect(x,y,36,36);
 c.strokeStyle='#6a7fc0';c.lineWidth=4;c.strokeRect(2,72,W-4,H-74);
 if(gate){c.fillStyle='#7cf8';c.beginPath();c.arc(W/2,100,20+Math.sin(tm*9)*3,0,7);c.fill();c.strokeStyle='#fff';c.lineWidth=2;c.stroke();
  c.fillStyle='#fff';c.font='bold 18px sans-serif';c.textAlign='center';c.fillText('Phòng hoàn thành! Dịch chuyển...',W/2,170)}
 E.forEach(e=>{em(e.e,e.x,e.y,e.r);if(e.hp<e.mh){c.fillStyle='#000';c.fillRect(e.x-e.r,e.y-e.r-8,e.r*2,4);c.fillStyle='#e44';c.fillRect(e.x-e.r,e.y-e.r-8,e.r*2*e.hp/e.mh,4)}});
 B.forEach(b=>{c.fillStyle=b.e?'#f55':b.o?'#c8f':'#fd5';c.beginPath();c.arc(b.x,b.y,b.r,0,7);c.fill()});
 F.forEach(f=>{c.strokeStyle='rgba(255,255,255,'+f.t*4+')';c.lineWidth=6;c.beginPath();c.arc(f.x,f.y,f.r,0,7);c.stroke()});
 c.globalAlpha=p.inv>0&&p.inv<8&&(tm*20|0)%2?.4:1;em(G.heroes[G.D.hero].ic,p.x,p.y,p.r+4);c.globalAlpha=1;
 T.forEach(t=>{c.font=t.k?'bold 17px sans-serif':'bold 12px sans-serif';if(t.k){c.lineWidth=3;c.strokeStyle='#300';c.strokeText(t.v,t.x,t.y)}c.fillStyle=t.k?'#ff3b3b':'#fff';c.fillText(t.v,t.x,t.y)});
 c.fillStyle='#10131c';c.fillRect(0,0,W,72);c.fillStyle='#fff';c.font='bold 13px sans-serif';
 c.textAlign='left';c.fillText('Chương '+ch+' · Phòng '+rm+'/'+n+' · 🪙'+coins,10,14);c.textAlign='right';c.fillText('✕',W-12,14);
 c.fillStyle='#000';c.fillRect(10,26,W-20,16);c.fillStyle='#4c4';c.fillRect(10,26,(W-20)*Math.max(0,p.hp)/p.mhp,16);
 c.fillStyle='#fff';c.textAlign='center';c.fillText(Math.ceil(Math.max(0,p.hp))+'/'+Math.ceil(p.mhp),W/2,34);
 c.fillStyle='#000';c.fillRect(10,48,W-20,8);c.fillStyle='#4af';c.fillRect(10,48,(W-20)*p.xp/p.nx,8);
 c.fillStyle='#ccc';c.font='11px sans-serif';c.fillText('Cấp '+p.lv,W/2,64);
 if(org){c.strokeStyle='#fff6';c.lineWidth=2;c.beginPath();c.arc(org[0],org[1],40,0,7);c.stroke();c.fillStyle='#fff5';c.beginPath();c.arc(cur[0],cur[1],14,0,7);c.fill()}
 if(fade>0){c.fillStyle='rgba(0,0,0,'+fade+')';c.fillRect(0,0,W,H)}}
function loop(t){if(!run)return;const dt=Math.min(.05,(t-last)/1000||0);last=t;if(!pause)update(dt);if(run)draw();requestAnimationFrame(loop)}
function choose(){pause=1;pk=[...G.skills].sort(()=>Math.random()-.5).slice(0,3);
 ov.innerHTML='<h2>⬆️ Lên cấp '+p.lv+'! Chọn kỹ năng</h2>'+pk.map((s,i)=>`<button class=b style="width:280px" onclick="G.battle.pick(${i})">${s[0]} <b>${s[1]}</b><br><small>${s[2]}</small></button>`).join('');
 ov.classList.remove('hide')}
function end(w){run=false;const D=G.D,o=D.lv,
 g=(w?800*ch:0)+coins,m=w?30+10*ch:0,x=w?100+50*ch:rm*5,r=w?1+ch:0,its=w?[G.drop(ch),...(ch>1?[G.drop(ch)]:[])]:[];
 D.gold+=g;D.gem+=m;D.rc+=r;G.addExp(x);D.inv.push(...its);if(w&&ch==D.ch)D.ch++;G.save();
 ov.innerHTML=`<h1>${w?'🏆 Qua chương '+ch+'!':'💀 Thất bại'}</h1><div class=card style="text-align:left;min-width:240px"><b>${w?'🎁 Quà chương':'Thu được'}</b><br>🪙 +${g}<br>💎 +${m}<br>🔴 +${r}<br>✨ EXP +${x}${its.map(i=>'<br>'+G.slots[i.s][0]+' '+G.slots[i.s][1]+' ('+G.rar[i.r][0]+')').join('')}${D.lv>o?'<br>🎉 Tài khoản lên cấp '+D.lv+(D.lv>=2&&o<2?' · mở Trang bị':'')+(D.lv>=3&&o<3?' · mở Thiên phú':''):''}</div><button class=b onclick="G.battle.exit()">Về sảnh</button>`;
 ov.classList.remove('hide')}
G.battle={
 start(x){ch=x;n=Math.min(30,8+4*x);const s=G.stats(),h=G.heroes[G.D.hero];
  p={x:W/2,y:H-110,r:14,hp:s.hp,mhp:s.hp,atk:s.atk,def:s.def,crit:s.crit,as:h.as*s.as,reg:s.reg,gm:s.gold,spd:150,mul:1,pi:h.pi||0,inv:0,ac:0,xp:0,nx:30,lv:1,q:0};
  coins=0;pause=0;gate=0;run=true;org=cur=null;ov.classList.add('hide');fit();room(1);last=performance.now();requestAnimationFrame(loop)},
 pick(i){pk[i][3](p);p.q--;pause=0;ov.classList.add('hide')},
 exit(){document.getElementById('bt').classList.add('hide');G.ui.draw()}};
})();
