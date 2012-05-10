pysocket.ready(function () {
  var user = new pysocket.User('ws://localhost:8000/');
  
  user.connect(function () {
    user.login('Dan', 'password', function () {
      console.log('Logged in!', user.uid, user.name);
    });
  });
});