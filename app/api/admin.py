import io

from flask import jsonify, request, send_file
from . import api
from app.service.admin.login import validate_auth


@api.route("/admin/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get('username', None)
    password = data.get('password', None)
    return validate_auth(username, password)