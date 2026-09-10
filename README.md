# 🎮 Xì Dách Online (Blackjack)

Phiên bản web nhiều người chơi của game xì dách, viết bằng **Node.js + Socket.io**.

## 🃏 Luật chơi
- Mỗi người được chia 2 lá bài ban đầu.
- Người chơi có thể chọn **rút thêm bài** hoặc **dừng**.
- Lá J, Q, K = 10 điểm; A = 11 hoặc 1; các lá khác = giá trị số.
- Nếu tổng điểm > 21 → thua ngay.
- Dealer rút bài đến khi >= 17 điểm.
- So sánh điểm để xác định thắng/thua.

## 🚀 Cách chạy
1. Cài Node.js.
2. Clone repo:
   ```bash
   git clone https://github.com/<username>/blackjack-web.git
   cd blackjack-web
