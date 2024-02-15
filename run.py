from waitress import serve

from app import create_app
from setting import host, port

if __name__ == "__main__":
    app = create_app()
    # app.run(host=host, port=port)
    serve(app, host=host, port=port)
