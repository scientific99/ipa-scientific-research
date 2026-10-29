# transactionIPA

Website phiên âm tiếng Việt sang ký hiệu ngữ âm IPA. Backend nhận vùng Bắc, Trung hoặc Nam; giao diện hiện có lựa chọn Bắc và Nam. Dự án gồm backend Flask/Python và frontend React.

## Tính năng

- Chuyển văn bản tiếng Việt sang IPA theo vùng phát âm.
- Phát âm văn bản bằng chức năng chuyển văn bản thành giọng nói.
- Gửi góp ý và xem danh sách góp ý qua Google Sheets; trang xem danh sách yêu cầu đăng nhập.

## Cấu trúc dự án

```text
.
├── translate_ipa/          # Backend Flask, API và xử lý phiên âm
├── ui/                     # Frontend React, Nginx và giao diện
├── docker-compose.yml      # Chạy backend và frontend
├── .env.example            # Mẫu cấu hình môi trường
├── run-project.sh          # Build và khởi động Compose
└── .github/workflows/      # CI và deploy
```

## Yêu cầu

- Chạy bằng Docker: Docker Engine/Desktop và Docker Compose v2.
- Chạy local: Python 3.9+ cho backend; Node.js 20+ và npm cho frontend.

## Cấu hình môi trường

Tạo file `.env` tại thư mục root:

```bash
cp .env.example .env
```

| Biến | Dùng cho | Ghi chú |
| --- | --- | --- |
| `REACT_APP_API_BASE_URL` | Frontend | URL API mà trình duyệt truy cập được; được nhúng vào frontend lúc build. |
| `JWT_SECRET_KEY` | Backend | Khóa ký token đăng nhập. Đặt giá trị ngẫu nhiên riêng khi deploy. |
| `GOOGLE_SHEET_ID` | Backend | ID bảng tính nhận feedback. |
| `GOOGLE_SHEET_RANGE_FEEDBACK` | Backend | Tên worksheet, mặc định `Data`. |
| `GOOGLE_SHEET_CREDENTIALS_JSON` | Backend | JSON service account dạng một dòng; cần cho tính năng feedback. |

Tạo JWT secret ngẫu nhiên bằng:

```bash
python -c 'import secrets; print(secrets.token_urlsafe(48))'
```

Với tích hợp Google Sheets, đặt JSON service account đã serialize thành một dòng vào `GOOGLE_SHEET_CREDENTIALS_JSON` trong `.env`, bao quanh giá trị bằng dấu nháy đơn. Giữ file `.env` và key service account riêng tư; không commit chúng lên Git. Nếu không cấu hình Google Sheets, các endpoint feedback sẽ không dùng được.

### Chọn API URL cho frontend

`REACT_APP_API_BASE_URL` phải là địa chỉ mà trình duyệt của người dùng truy cập được. Khi chạy local, dùng mặc định `http://localhost:9000/api/v1.0`. Khi deploy, thay bằng domain hoặc IP của backend, ví dụ `https://api.example.com/api/v1.0`, rồi build lại frontend.

Không dùng `http://backend:9000` cho biến này: tên service `backend` chỉ phân giải bên trong mạng Docker, còn JavaScript gọi API từ trình duyệt.

## Chạy toàn bộ bằng Docker Compose

Từ thư mục root:

```bash
cp .env.example .env   # chỉ cần làm lần đầu
docker compose up --build -d
```

Hoặc dùng script:

```bash
./run-project.sh
```

Mặc định:

- Frontend: <http://localhost> (cổng `80`).
- Backend API base: <http://localhost:9000/api/v1.0> (cổng `9000`).

Các lệnh quản lý:

```bash
docker compose ps                 # trạng thái service
docker compose logs -f            # log toàn hệ thống
docker compose logs -f backend    # log backend
docker compose logs -f frontend   # log frontend
docker compose down               # dừng và xóa container/network
docker compose up --build -d      # build lại và chạy nền
```

Nếu cổng `80` hoặc `9000` đang được sử dụng, dừng ứng dụng đang chiếm cổng đó trước khi chạy Compose.

## Chạy local không dùng Docker

Các lệnh dưới đây dùng Bash/Zsh (macOS, Linux hoặc WSL).

### Backend

Từ thư mục root, tạo virtual environment và cài dependencies:

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

Frontend chạy tại <http://localhost:3000>. CRA nhận `REACT_APP_API_BASE_URL` từ environment của tiến trình; thay đổi biến này cần khởi động lại frontend dev server.

## API chính

Tất cả đường dẫn API bắt đầu bằng `/api/v1.0`.

### Phiên âm tiếng Việt sang IPA

`POST /translate/vn-to-ipa`

```bash
curl -X POST http://localhost:9000/api/v1.0/translate/vn-to-ipa \
  -H 'Content-Type: application/json' \
  -d '{"text_input":"xin chào","region":"Bắc"}'
```

Body gồm `text_input` và `region`; vùng nhận `Bắc`, `Trung` hoặc `Nam`. Kết quả được trả trong trường `data`.

### Chuyển văn bản thành giọng nói

`GET /translate/convert-tts?text=...&lang_input=...&lang_output=...`

Endpoint trả về nội dung audio MP3.

### Feedback và đăng nhập

- `POST /feedback/send`: nhận `full_name`, `job_title`, `description`; yêu cầu cấu hình Google Sheets.
- `GET /feedback/get`: trả danh sách feedback và yêu cầu JWT bearer token.
- `POST /admin/login`: xác thực thông tin đăng nhập quản trị và tạo phiên/token theo backend.

## Kiểm tra và đóng góp

Các lệnh kiểm tra cơ bản:

```bash
docker compose config --quiet
python -m compileall -q translate_ipa
cd ui && npm ci && npm run build
```

CI trên GitHub Actions thực hiện kiểm tra Compose, compile Python và build frontend khi push/pull request lên `main`. Xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết hướng dẫn đóng góp.

## Khắc phục sự cố

- **Không mở được trang:** chạy `docker compose ps` và xem log bằng `docker compose logs -f`.
- **Frontend không gọi được backend:** kiểm tra `REACT_APP_API_BASE_URL`, đảm bảo URL truy cập được từ trình duyệt và build lại bằng `docker compose up --build -d`.
- **Cổng đã được sử dụng:** giải phóng cổng `80` hoặc `9000`, rồi chạy lại Compose.
- **Feedback lỗi:** kiểm tra `GOOGLE_SHEET_ID`, `GOOGLE_SHEET_CREDENTIALS_JSON`, quyền truy cập bảng tính của service account và tên worksheet.
- **Không xem được danh sách feedback:** endpoint `/feedback/get` cần JWT bearer token hợp lệ.

## Liên hệ

Mr Hai — [dinhbahai99@gmail.com](mailto:dinhbahai99@gmail.com)
