
class User:
    def __init__(self, uid):
        self.uid = uid

class UserManager:
    _users = []
    _uid = 1
    
    def __init__(self):
        self._uid = 1
        
    def generate_user(self):
        self._uid += 1
        user = User(self._uid)
        self._users.append(user)
        return user.uid