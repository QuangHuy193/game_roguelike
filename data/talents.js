G.TS=8;
G.auxs=[['🎯','Chí mạng','+2% bạo kích/cấp'],['⚡','Tốc đánh','+3% tốc đánh/cấp'],['💚','Hồi máu','+1% máu/giây mỗi cấp'],['💰','Tham tài','+5% vàng/cấp']];
G.tdone=s=>s<1||((G.D.tal[s]||[]).length==3&&G.D.tal[s].every(v=>v>=10));
G.talStats=s=>{const T=G.D.tal,A=G.D.aux;for(const k in T){const L=T[k];s.atk+=L[0]*k;s.hp+=L[1]*8*k;s.def+=L[2]*k/2}
 s.crit+=(A[0]||0)*.02;s.as*=1+(A[1]||0)*.03;s.reg+=(A[2]||0)*.01;s.gold+=(A[3]||0)*.05};
