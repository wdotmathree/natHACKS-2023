from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
import time
import json

class StreamingServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api':
            self.send_response(200)
            self.send_header('Content-type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.end_headers()

            while True:
                latest_data = get_latest_data()  # Replace with your function to get the latest data
                message = f'data: {json.dumps(latest_data)}\n\n'
                self.wfile.write(message.encode())
                time.sleep(1)

def get_latest_data():
    # Replace this function with your logic to fetch the latest data
    # For demonstration, returning a simple dictionary
    return {'timestamp': time.time()}

def run_server():
    server_address = ('', 4000)  # You can change the port as needed
    httpd = ThreadingHTTPServer(server_address, StreamingServer)
    print(f'Starting server on port {server_address[1]}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
