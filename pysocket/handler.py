import pysocket.user

class Message:
    LOGIN = u'login'
    MESSAGE = u'message'

class MessageHandler:
    
    def __init__(self):
        self.userManager = pysocket.user.UserManager()
        
    def handleOpen(self, hash):
        print str(hash) + ' connected'
        
    def handleMessage(self, send, data, hash):
        if(data['__name'] == 'login'):
            uid = self.userManager.generate_user(data['name'], send, hash)
            send(Message.LOGIN, { 'uid': uid })
        elif(data['__name'] == 'message'):
            self.userManager.sendAll(Message.MESSAGE, data)
            
    def handleClose(self, hash):
        print str(hash) + ' closed'
        self.userManager.remove_by_hash(hash)