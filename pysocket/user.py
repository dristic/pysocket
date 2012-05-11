
class User:
    def __init__(self, uid, name, send):
        self.uid = uid
        self.name = name
        self.send = send

class UserManager:
    _users = []
    _uid = 1
    
    def __init__(self):
        self._uid = 1
        
    def generate_user(self, name, send):
        self._uid += 1
        user = User(self._uid, name, send)
        self._users.append(user)
        return user.uid
    
    def sendAll(self, type, message):
        for index, user in enumerate(self._users):
            user.send(type, message)