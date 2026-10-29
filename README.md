# transactionIPA

Ứng dụng phiên âm tiếng Việt sang IPA, hỗ trợ giọng Bắc, Trung và Nam. Monorepo gồm backend Flask và frontend React.

## Yêu cầu

- Chạy bằng Docker: Docker Engine/Desktop và Docker Compose v2.
- Chạy local: Python 3.9+ cho backend, Node.js 20+ và npm cho frontend.

## Cấu hình môi trường

Tạo `.env` tại thư mục root:

```bash
cp .env.example .env
```

Mở `.env` và thay `JWT_SECRET_KEY` bằng secret ngẫu nhiên riêng cho môi trường. Nếu cần lưu feedback vào Google Sheets, điền `GOOGLE_SHEET_ID` cùng `GOOGLE_SHEET_CREDENTIALS_JSON` (JSON service account một dòng, đặt trong dấu nháy đơn). Không commit `.env` hoặc key service account.

`REACT_APP_API_BASE_URL` là URL backend mà trình duyệt của người dùng truy cập được. Với local mặc định giữ nguyên `http://localhost:9000/api/v1.0`; khi deploy, đổi thành domain/IP thực tế trước khi build frontend.

## Chạy toàn bộ bằng Docker

```bash
docker compose up --build -d
```

Hoặc dùng script tiện ích:

```bash
./run-project.sh
```

- Frontend: <http://localhost>
- Backend API: <http://localhost:9000/api/v1.0>

Lệnh quản lý:

```bash
docker compose ps
docker compose logs -f
docker compose logs -f backend
docker compose down
docker compose up --build -d
```

Nếu cổng `80` hoặc `9000` đang được dùng, dừng ứng dụng chiếm cổng đó trước khi khởi động.

## Chạy local không dùng Docker

### Backend

```bash
cd translate_ipa
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
set -a
source ../.env
set +a
python run.py
```

Backend lắng nghe tại <http://localhost:9000>.

### Frontend

Mở terminal khác từ thư mục root:

```bash
cd ui
npm ci
set -a
source ../.env
set +a
npm start
```

Frontend chạy tại <http://localhost:3000>. Giá trị `REACT_APP_API_BASE_URL` trong root `.env` được CRA đọc từ environment của tiến trình.

## Kiểm tra thay đổi

```bash
docker compose config --quiet
python -m compileall -q translate_ipa
cd ui && npm ci && npm run build
```

Xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết hướng dẫn đóng góp.
