from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from setting import JWT_SECRET_KEY


def create_app():
    from app.errors.error import error_blueprint
    from .api import api as api_blueprint

    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    jwt = JWTManager(app)
    CORS(app, origins=["*"])
    app.register_blueprint(error_blueprint, url_prefix='/api/v1.0')
    app.register_blueprint(api_blueprint, url_prefix='/api/v1.0')
    return app
