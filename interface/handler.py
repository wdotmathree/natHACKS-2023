from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
import numpy as np
import time

queues = {}
attention = 0.5
alertness = 0.5

class Server(BaseHTTPRequestHandler):
	def do_GET(self):
		queues[self] = b''
		self.send_response(200)
		# self.send_header("Content-Type", "audio/wav")
		self.end_headers()
		# # Send WAV header
		# self.wfile.write(
		# 	b'RIFF\xfc\x08\x00\x00WAVEfmt ' +
		# 	b'\x10\x00\x00\x00' +
		# 	b'\x03\x00' +
		# 	b'\x01\x00' +
		# 	b'\x00\x01\x00\x00' +
		# 	b'\x00\x04\x00\x00' +
		# 	b'\x04\x00' +
		# 	b'\x20\x00' +
		# 	b'fact\x04\x00\x00\x00\xc4\x08\x00\x00' +
		# 	b'data\xc4\x08\x00\x00'
		# )
		while True:
			data = None
			if len(queues[self]) != 0:
				data = queues[self]
				queues[self] = b''
			else:
				time.sleep(0.01)
				continue
			try:
				self.wfile.write(data)
				self.wfile.flush()
			except BrokenPipeError:
				queues.pop(self)
				break
	
	def do_POST(self):
		self.send_response(200)
		self.send_header("Content-Type", "text/json")
		self.end_headers()
		self.wfile.write(str(
			{
				"attention": attention,
				"alertness": alertness,
				"concentration": (attention + alertness) / 2,
			}).replace("'", '"').encode())
		self.wfile.flush()

attentionq = []
alertnessq = []
section = False

def t1():
	global attentionq, alertnessq, section
	while True:
		if len(attentionq) == 0:
			# generate perlin noise
			attentionq = np.random.random(1000).tolist()
			alertnessq = np.random.random(1000).tolist()
		attention = attentionq.pop()
		alertness = alertnessq.pop()
		if section:
			attention = attention * 0.6
			alertness = alertness * 0.6
		else:
			attention = attention * 0.6 + 0.4
			alertness = alertness * 0.6 + 0.4
		time.sleep(0.5)

def t2():
	server = ThreadingHTTPServer(("0.0.0.0", 3001), Server)
	server.serve_forever()

t1t = Thread(target=t1, daemon=True)
t2t = Thread(target=t2, daemon=True)
t1t.start()
t2t.start()

while True:
	input()
	section = not section
