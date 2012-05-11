
class User:
    def __init__(self, uid, name, send, hash):
        self.uid = uid
        self.name = name
        self.send = send
        self.hash = hash

class UserManager:
    _users = []
    _uid = 1
    
    def __init__(self):
        self._uid = 1
        
    def generate_user(self, name, send, hash):
        self._uid += 1
        user = User(self._uid, name, send, hash)
        self._users.append(user)
        return user.uid
    
    def remove_by_hash(self, hash):
        for index, user in enumerate(self._users):
            if(user.hash == hash):
                self._users.remove(user)
                break
    
    def sendAll(self, type, message):
        for index, user in enumerate(self._users):
            user.send(type, message)