import json

from flask import Blueprint, jsonify, make_response, request

from ipa import convert_ipa
from setting import version

from .error import InvalidAPIUsage

home_blueprint = Blueprint("home", __name__)


@home_blueprint.route(f"/api/{version}/translate", methods=["POST", "OPTIONS"])
def translate_by_text():
    if request.method == "OPTIONS":
        # Handle the preflight request
        response = make_response()
        return response
    elif request.method == "POST":
        data = request.data.decode("utf-8")
        if (data is None) or (len(data) == 0):
            raise InvalidAPIUsage("data is empty", 400)
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
            output = convert_ipa(text_input, region)
            response = jsonify({"data": output})
            return response
