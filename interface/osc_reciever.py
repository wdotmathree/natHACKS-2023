from pythonosc.dispatcher import Dispatcher
from pythonosc.osc_server import ThreadingOSCUDPServer
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
import time

queues = {}
theta = 750.0
beta = 750.0
alpha = 750.0

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
		self.wfile.write(str(theta + beta / alpha / 2))

buf = []
prev = 750.0

def handle(address, *args):
	# if address in m:
	#     m[address].append(args)
	# else:
	#     m[address] = [args]
	val = 0
	num = 0
	for i in args:
		if np.isfinite(i):
			val += i
			num += 1
	if num == 0:
		val = prev
	else:
		val /= num
		prev = val
	buf.append(val)
	if len(buf) >= 0x100:
		b = np.array(buf, dtype=np.float32)
		buf.clear()
		by = b.tobytes()
		for q in queues.keys():
			queues[q] += by

def comphandle(address, *args):
	global theta, beta, alpha
	val = sum(args) / len(args)
	address = address.split('/')[-1]
	if address == 'theta_absolute':
		theta = val
	elif address == 'beta_absolute':
		beta = val
	elif address == 'alpha_absolute':
		alpha = val

dispatch = Dispatcher()
dispatch.map("/muse/eeg", handle)
dispatch.map("/muse/elements/theta_absolute", comphandle)
dispatch.map("/muse/elements/beta_absolute", comphandle)
dispatch.map("/muse/elements/alpha_absolute", comphandle)

def t1():
	server = ThreadingOSCUDPServer(("0.0.0.0", 5000), dispatch)
	server.serve_forever()

def t2():
	server = ThreadingHTTPServer(("0.0.0.0", 3001), Server)
	server.serve_forever()

t1t = Thread(target=t1, daemon=True)
t2t = Thread(target=t2, daemon=True)

t1t.start()
t2t.start()

t1t.join()
t2t.join()
