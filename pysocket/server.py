import tornado.ioloop
import tornado.web
import tornado.websocket

import pysocket.handler

class PysocketHandler(tornado.websocket.WebSocketHandler):
    _handler = pysocket.handler.MessageHandler()
    
    def open(self):
        print 'Socket connected'
        
    def on_message(self, message):
        data = tornado.escape.json_decode(message)
        self._handler.handleMessage(self.send, data)
        
    def on_close(self):
        print 'Socket disconnected'
        
    def send(self, name, message):
        message[u'__name'] = name
        self.write_message(message)
        
application = tornado.web.Application([
  (r"/", PysocketHandler)
])

def start(port):
    application.listen(port)
    tornado.ioloop.IOLoop.instance().start()