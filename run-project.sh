#!/bin/bash
git pull
docker build -t ipa-fe:latest .
cd /app/be/translate_ipa
docker compose up -d