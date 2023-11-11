from waitress import serve

from app import app
from setting import host, port

if __name__ == "__main__":
    # app.run(host=host, port=port)
    serve(app, host=host, port=port)
