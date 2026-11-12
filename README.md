Khởi tạo (đã chạy)
tạo 1 web game chạy trên máy local
nguyên tắc thiết kế:
- Thể loại game roguelike màn dọc (lấy ý tưởng từ archero)
- Đi chương, mỗi chương có tối đa 30 phòng, khi qua phòng tự động dịch chuyển đến phòng kế tiếp
- Mỗi màn sẽ có quái khác nhau, tiêu diệt quái lên cấp học kỹ năng mới
- qua chương nhận quà sẽ nhận quà chương gồm nhiều vàng, kim cương và exp để lên cấp mở các tính năng và pha lê đỏ
- responsive cho desktop và mobile
- tạo trong 1 thư mục file chạy là index, tách các logic khác ra các thư mục khác để dễ mở rộng, mỗi phần trong thư mục là 1 file (ví dụ /hero/mega.html)
- game có 3 anh hùng khởi đầu là xạ thủ, pháp sư và chiến binh cần mua bằng kim cương
- trang bị (mở khi tài khoản đạt cấp 2) gồm 6 vị trí: vũ khí - tang công, găng tay và giày - tăng công và thủ, nhẫn và vòng cổ - tăng công và máu, giáp - tăng máu
- trang bị gồm 5 phẩm cấp là cơ bản (trắng) - tốt(xanh lá) - hiếm(xanh dương) - sử thi(tím) - huyền thoại(vàng)
- hệ thống thiên phú (mở khi tài khoản đạt cấp 3) dùng vàng để nâng cấp, mỗi giai đoạn cần nâng tấn công, máu, thủ lên cấp 10 để qua giai đoạn tiếp,
mỗi 2 giai đoạn sẽ có thiên phú phụ trợ cần pha lê đỏ để nâng

yêu cầu mới 1 (đã chạy)
- thêm nút để xem tất cả chỉ số của nhân vật ở mục trang bị, chia ra thành chỉ số từ trang bị, chỉ số từ thiên phú, chỉ số từ anh hùng, tổng chỉ số
- trong trận chiến các đòn crit sẽhiện  số sát thương màu đỏ và to hơn các đòn đánh thường 1 chút

yêu cầu mới 2 (đã chạy)
- thay ảnh anh hùng trong tab anh hùng bằng ảnh trong assets/hero, vào trận cắt khuôn mặt hình tròn thay cho emoji
- thêm các anh hùng mới tương ứng số ảnh
- các kỹ năng trong trận như "đa tiễn" sửa lại mô tả "thành +1 đạn (anh hùng tầm ngắn: +tầm đánh)" để phù hợp cho 2 loại anh hùng tầm ngắn và xa
- thêm giới hạn tầm đánh tối đa cho cả anh hùng tầm ngắn và xa
