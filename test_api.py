# import json
import json
import re

import requests

# from ipa import convert_ipa
from gtts import gTTS
# url = "http://localhost:9000/api/v1.0/translate"
# headers = {"Content-Type": "application/json charset=utf-8"}
# data = {"text_input": "Sông trôi", "region": "Bắc"}
# print(convert_ipa("Đinh Bá Hải", "n"))

# # data_out = json.dumps(data).encode("latin-1")
# # print(data)

# r = requests.post(url=url, json=data, headers=headers)
# print(r.status_code, r.text)
# result = ["x", "abc", None, "abcd"]
# output = " ".join(filter(None, result))
# print(output)

from app.service.translate.convert_ipa_to_vn import ipa_to_vn
from app.service.translate.convert_vn_to_ipa import vn_to_ipa


# #
# #


input_text = "Tiếng Việt"
print(len("ʲŋ"))
ipa_bac = vn_to_ipa(input_text, "n")
ipa_nam = vn_to_ipa(input_text, "s")
#
print("input:", input_text)
print("north:", ipa_bac, "-", ipa_to_vn(ipa_bac))
print("south:", ipa_nam, "-", ipa_to_vn(ipa_nam))

# print(modified_string)