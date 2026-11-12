// [ai, hp, atk, speed, radius]  ai: c=đuổi, f=đuổi nhanh, s=bắn 1 viên, m=bắn 3 viên, b=boss
G.mons=[['c',40,10,45,13],['f',25,9,85,11],['s',35,10,35,13],['c',120,16,30,17],['m',45,12,40,13]];
G.skin=[['🟢','🦇','👺','🗿','👻','👹'],['🟣','🦉','🤡','🧱','💀','🐲'],['🔴','🐝','😈','🪨','🧟','👿']];
G.room=(ch,i,n)=>{
 const sc=(1+.12*(i-1))*(1+.6*(ch-1)),as=(1+.07*(i-1))*(1+.5*(ch-1)),sk=G.skin[(ch-1)%3],o=[];
 const mk=(t,x,y)=>{const m=t>4?['b',500,18,25,28]:G.mons[t];o.push({e:sk[t],ai:m[0],hp:m[1]*sc,mh:m[1]*sc,atk:m[2]*as,spd:m[3],r:m[4],x,y,k:0,cd:1+Math.random()*2})};
 if(i==n)mk(5,180,140);
 else{const v=Math.min(5,2+(i/3|0)),a=(i*3+ch)%v,b=(i+ch*2)%v;
  for(let k=0;k<Math.min(9,2+Math.ceil(i/3)+ch);k++)mk(k%2?a:b,30+Math.random()*300,90+Math.random()*200)}
 return o};
