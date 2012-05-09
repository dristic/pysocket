import tornado.ioloop
import tornado.web
import tornado.websocket

class PysocketHandler(tornado.websocket.WebSocketHandler):
    _id = 1
    
    def open(self):
        print 'Socket connected'
        self.write_message({ 'uid': self._id })
        self._id += 1
        
    def on_message(self, message):
        data = tornado.escape.json_decode(message)
        print data[u'message']
        print data[u'uid']
        
    def on_close(self):
        print 'Socket disconnected'
        
application = tornado.web.Application([
  (r"/", PysocketHandler)                                       
])

def start(port):
    application.listen(port)
    tornado.ioloop.IOLoop.instance().start()