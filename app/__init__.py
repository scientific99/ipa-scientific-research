from flask import Flask
from flask_cors import CORS

from .error import error_blueprint
from .translate import home_blueprint

app = Flask(__name__)
CORS(app, origins=["*"])
app.register_blueprint(error_blueprint)
app.register_blueprint(home_blueprint)
