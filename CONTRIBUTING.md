# Đóng góp

## Chuẩn bị môi trường

- Cài Docker Compose v2 để chạy cả hệ thống.
- Nếu chạy riêng: dùng Python 3.11+ cho backend và Node.js 20+ cho frontend.

## Chạy ứng dụng

Chạy toàn bộ bằng Docker:

```bash
docker compose up --build -d
```

Hoặc chạy backend và frontend riêng theo hướng dẫn trong [README](README.md).

## Trước khi gửi thay đổi

Chạy các kiểm tra phù hợp với phần đã sửa:

```bash
docker compose config
python -m compileall -q translate_ipa
cd ui && npm ci && npm run build
```

Giữ thay đổi tập trung, không commit secret, file `.env`, `node_modules` hoặc output build.
