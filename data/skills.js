G.skills=[
['🏹','Đa tiễn','+1 đạn (Chiến binh: +tầm chém)',p=>p.mul++],
['💪','Cuồng nộ','+25% công',p=>p.atk*=1.25],
['⚡','Tốc đánh','+20% tốc đánh',p=>p.as*=1.2],
['❤️','Cường thể','+25% máu tối đa',p=>{p.mhp*=1.25;p.hp+=p.mhp*.2}],
['🔱','Xuyên thấu','Đạn xuyên thêm 1 quái',p=>p.pi++],
['🎯','Bạo kích','+15% bạo kích',p=>p.crit+=.15],
['💚','Hồi phục','Hồi 40% máu',p=>p.hp=Math.min(p.mhp,p.hp+p.mhp*.4)],
['👟','Nhanh nhẹn','+12% tốc chạy',p=>p.spd*=1.12],
['🛡️','Giáp sắt','+30% thủ, +3',p=>p.def=p.def*1.3+3]];
