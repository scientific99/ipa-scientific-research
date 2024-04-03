import io

from flask import jsonify, request, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity

from . import api
from app.errors.error import InvalidApiUsage
import json

from app.service.feeback.feedback_googlesheet import send_feedback_ggsheet,get_feedback_googlesheet



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

@api.route("/feedback/get", methods=["GET"])
@jwt_required()
def get_feedback():
    current_user = get_jwt_identity()
    data = get_feedback_googlesheet()
    return jsonify(data=data, logged_in_as=current_user), 200