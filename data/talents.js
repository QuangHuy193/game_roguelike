G.TS=8;
G.auxs=[['🎯','Chí mạng','+2% bạo kích/cấp'],['⚡','Tốc đánh','+3% tốc đánh/cấp'],['💚','Hồi máu','+1% máu/giây mỗi cấp'],['💰','Tham tài','+5% vàng/cấp']];
G.tdone=s=>s<1||((G.D.tal[s]||[]).length==3&&G.D.tal[s].every(v=>v>=10));
G.talParts=()=>{const D=G.D,A=D.aux,T={atk:0,hp:0,def:0};
 for(const k in D.tal){const L=D.tal[k];T.atk+=L[0]*k;T.hp+=L[1]*8*k;T.def+=L[2]*k/2}
 T.crit=(A[0]||0)*.02;T.as=(A[1]||0)*.03;T.reg=(A[2]||0)*.01;T.gold=(A[3]||0)*.05;return T};
