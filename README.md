# transactionIPA

Hệ thống chuyển đổi tiếng Việt sang ký hiệu ngữ âm IPA và ngược lại, hỗ trợ phương ngữ Hà Nội và Thành phố Hồ Chí Minh.

## Cấu trúc

- `translate_ipa/`: backend Flask/Python, API tại cổng `9000`.
- `ui/`: frontend React, phục vụ qua Nginx tại cổng `80`.
- `docker-compose.yml`: chạy toàn bộ hệ thống.

## Yêu cầu

- Docker và Docker Compose v2 để chạy đầy đủ hệ thống.
- Python 3.11+ và Node.js 20+ nếu chạy local từng thành phần.

## Chạy bằng Docker

```bash
./run-project.sh
```

Hoặc:

```bash
docker compose up --build -d
```

Truy cập frontend tại [http://localhost](http://localhost), backend tại [http://localhost:9000](http://localhost:9000).

Các lệnh thường dùng:

```bash
docker compose logs -f
docker compose ps
docker compose down
docker compose up --build -d
```

## Chạy local

Backend:

```bash
cd translate_ipa
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

Frontend, trong terminal khác:

```bash
cd ui
npm ci
npm start
```

Frontend local chạy tại `http://localhost:3000`. Địa chỉ API được cấu hình trong `ui/src/constants.ts`; mặc định là `http://localhost:9000/api/v1.0`.

## Kiểm tra build

```bash
docker compose config
cd ui && npm run build
```
