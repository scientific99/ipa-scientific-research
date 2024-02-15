import io

from flask import jsonify, request, send_file
from . import api
from app.errors.error import InvalidApiUsage
import json

from app.service.translate import vn_to_ipa
from app.service.translate import text_to_speech


@api.route("/translate/vn-to-ipa", methods=["POST"])
def vietnamese_to_ipa_api():
    data = request.data.decode("utf-8")
    if (data is None) or (len(data) == 0):
        raise InvalidApiUsage("data is empty", 400)
    else:
        json_data = json.loads(data)
        text_input = json_data["text_input"]
        region = json_data["region"]
        if region == "Bắc":
            region = "n"
        elif region == "Trung":
            region = "c"
        elif region == "Nam":
            region = "s"
        output = vn_to_ipa(text_input, region)
        response = jsonify({"data": output})
        return response


@api.route("/translate/convert-tts", methods=["GET"])
def text_to_speech_api():
    text = request.args.get('text')
    lang_input = request.args.get('lang_input')
    lang_output = request.args.get('lang_output')
    audio_data = text_to_speech(text=text, lang_input=lang_input, lang_output=lang_output)
    return send_file(io.BytesIO(audio_data), mimetype="audio/mp3", download_name="output.mp3")
