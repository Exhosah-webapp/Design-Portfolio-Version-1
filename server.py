"""Local static server with a history-API fallback for portfolio routes."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PortfolioHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = Path(self.translate_path(self.path.split("?", 1)[0]))
        if not path.exists() and "." not in Path(self.path).name:
            self.path = "/index.html"
        return super().do_GET()


if __name__ == "__main__":
    ThreadingHTTPServer(("", 4173), PortfolioHandler).serve_forever()
