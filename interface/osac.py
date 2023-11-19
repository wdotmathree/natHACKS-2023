from pythonosc.dispatcher import Dispatcher
from pythonosc.osc_server import ThreadingOSCUDPServer
from http.server import BaseHTTPRequestHandler, HTTPServer
from threading import Thread
import asyncio
import websockets

class Server(BaseHTTPRequestHandler):
	def do_GET(self):
		self.send_response(200)
		self.end_headers()
		if self.path in m:
			self.wfile.write(m[self.path])
		else:
			self.wfile.write("No data".encode())

async def handle_websocket(websocket, path):
	print(path)
	while True:
		# Send data to the WebSocket client
		for key, value in m.items():
			await websocket.send(f"{key}: {value}")
		await asyncio.sleep(1)

m = {}

def handle(address, *args):
	# if address in m:
	#     m[address].append(args)
	# else:
	#     m[address] = [args]
	m[address] = args
	print(m.keys())

dispatch = Dispatcher()
dispatch.set_default_handler(handle)

def t1():
	server = ThreadingOSCUDPServer(("0.0.0.0", 5000), dispatch)
	server.serve_forever()

def t2():
	server = HTTPServer(("127.0.0.1", 3001), Server)
	server.serve_forever()

async def t3():
	# Start WebSocket server
	await websockets.serve(handle_websocket, "127.0.0.1", 3002)

t1t = Thread(target=t1, daemon=True)
t2t = Thread(target=t2, daemon=True)
t3t = Thread(target=asyncio.run, args=(t3(),), daemon=True)

t1t.start()
t2t.start()
t3t.start()

t1t.join()
t2t.join()
t3t.join()
