#!/bin/bash
git pull
docker build -t ipa-be:latest .
docker compose up -d
