import io

from flask import jsonify, request, send_file
from . import api
from app.errors.error import InvalidApiUsage
import json

from app.service.feeback.send_feedback_ggsheet import send_feedback_ggsheet


@api.route("/feedback/send", methods=["POST"])
def send_google_sheet():
    # try:
        data = request.data.decode("utf-8")
        json_data = json.loads(data)
        full_name = json_data["full_name"]
        job_title = json_data["job_title"]
        description = json_data["description"]
        status = send_feedback_ggsheet(full_name, job_title, description)
        response = jsonify({"data": status})
        return response
    # except:
    #     return jsonify({})
