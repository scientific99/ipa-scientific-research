import json

import requests

url = "http://localhost:9000/api/v1.0/translate"
headers = {"Content-Type": "application/json charset=utf-8"}
data = {"text_input": "Đinh Bá Hải"}
data_out = json.dumps(data).encode("latin-1")
print(data)
r = requests.post(url=url, json=data, headers=headers)
print(r.status_code, r.text)
