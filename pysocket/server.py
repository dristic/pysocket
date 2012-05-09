import tornado.ioloop
import tornado.web
import tornado.websocket

import pysocket.user

class PysocketHandler(tornado.websocket.WebSocketHandler):
    _userManager = pysocket.user.UserManager()
    
    def open(self):
        print 'Socket connected'
        uid = self._userManager.generate_user()
        self.write_message({ 'uid': uid })
        
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