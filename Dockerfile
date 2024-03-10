FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app /app/app
COPY setting.py .
COPY run.py .
EXPOSE 9000
CMD ["python", "run.py"]
