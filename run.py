from waitress import serve

from app import app
from app.translate import translate_by_text
from setting import host, port

if __name__ == "__main__":
    app.run(host=host, port=port)
    # serve(app, host=host, port=port)
