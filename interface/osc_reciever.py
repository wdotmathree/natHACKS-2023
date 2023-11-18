from pythonosc.dispatcher import Dispatcher
from pythonosc.osc_server import ThreadingOSCUDPServer

from http.server import BaseHTTPRequestHandler, HTTPServer

from threading import Thread

class Server(BaseHTTPRequestHandler):
	def do_get(self):
		self.send_response(200)
		self.end_headers()
		if self.path in m:
			self.wfile.write(m[self.path])
		else:
			self.wfile.write("No data")

m = {}

def handle(address, *args):
	if address in m:
		m[address].append(args)
	else:
		m[address] = [args]

dispatch = Dispatcher()
dispatch.set_default_handler(handle)

ip = "0.0.0.0"
port = 8080

def t1():
	server = ThreadingOSCUDPServer((ip, port), dispatch)
	server.serve_forever()

def t2():
	server = HTTPServer(("127.0.0.1", 3001), Server)
	server.serve_forever()

t1t = Thread(target=t1, daemon=True)
t2t = Thread(target=t2, daemon=True)
t1t.start()
t2t.start()
t1t.join()
t2t.join()
