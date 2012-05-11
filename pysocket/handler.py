import pysocket.user

class Message:
    LOGIN = u'login'
    MESSAGE = u'message'

class MessageHandler:
    
    def __init__(self):
        self.userManager = pysocket.user.UserManager()
        
    def handleMessage(self, send, data):
        if(data['__name'] == 'login'):
            uid = self.userManager.generate_user(data['name'], send)
            send(Message.LOGIN, { 'uid': uid })
        elif(data['__name'] == 'message'):
            self.userManager.sendAll(Message.MESSAGE, data)