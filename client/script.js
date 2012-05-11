pysocket.ready(function () {
  var el = setupUI();
  
  var user = new pysocket.User('ws://localhost:8000/');
  
  user.connect(function () {
    user.login('Dan', 'password', function () {
      console.log('Logged in!', user.uid, user.name);
      
      el.submit.disabled = '';
    });
  });
  
  el.submit.onclick = function (event) {
    event.preventDefault();
    user.message(el.input.value);
    return false;
  };
  
  user.on('message', function (data) {
    el.text.innerHTML += data.user + ': ' + data.text + '<br />';
  });
});

function setupUI() {
  var text = document.createElement('p'),
      input = document.createElement('input'),
      submit = document.createElement('input'),
      body = document.getElementsByTagName('body')[0];
  
  text.innerHTML = 'Welcome to pysocket chat <br />';
  text.innerHTML += 'Type your message and hit send <br />';
  
  input.type = 'text';
  
  submit.type = 'button';
  submit.value = 'Send';
  submit.disabled = 'disabled';
  
  body.appendChild(text);
  body.appendChild(input);
  body.appendChild(submit);
  
  return {
    text: text,
    input: input,
    submit: submit
  };
};