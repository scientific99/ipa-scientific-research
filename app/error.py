from flask import jsonify
from flask_cors import cross_origin

from app import app


class InvalidAPIUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        super().__init__()
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv["message"] = self.message
        return rv


@app.errorhandler(404)
@cross_origin
def resource_not_found(e):
    response = jsonify(error=str(e))
    return response, 404


@app.errorhandler(InvalidAPIUsage)
@cross_origin
def invalid_api_usage(e):
    response = jsonify(e.to_dict())
    return response, e.status_code
