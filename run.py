from waitress import serve
import logging
from app import create_app
from setting import host, port

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    app = create_app()
    # app.run(host=host, port=port)
    serve(app, host=host, port=port)
