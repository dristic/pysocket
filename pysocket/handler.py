import pysocket.user

class Message:
    LOGIN = u'login'

class MessageHandler:
    
    def __init__(self):
        self.userManager = pysocket.user.UserManager()
        
    def handleMessage(self, send, data):
        if(data['__name'] == 'login'):
            uid = self.userManager.generate_user()
            send(Message.LOGIN, { 'uid': uid })