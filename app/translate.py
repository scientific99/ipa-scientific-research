import json

from flask import jsonify, make_response, request
from flask_cors import cross_origin

from app import app
from setting import version

from .error import InvalidAPIUsage


@app.route(f"/api/{version}/translate", methods=["POST", "OPTIONS"])
def translate_by_text():
    if request.method == "OPTIONS":
        # Handle the preflight request
        response = make_response()
        return response
    elif request.method == "POST":
        data = request.data.decode("utf-8")
        if (data is None) or (len(data) == 0):
            # response = jsonify({"data": "error"})
            # response.headers.add(
            #     "Access-Control-Allow-Origin", "http://localhost:3000"
            # )
            # response.headers.add("Access-Control-Allow-Methods", "POST")
            # response.headers.add(
            #     "Access-Control-Allow-Headers", "Content-Type"
            # )
            # return response
            raise InvalidAPIUsage("data is empty", 400)
        else:
            json_data = json.loads(data)
            text_input = json_data["text_input"]
            response = jsonify({"data": text_input})
            return response
