var ws = new WebSocket('ws://localhost:8000'),
    uid = -1;

ws.onopen = function () {
  
};

ws.onmessage = function (evt) {
  var data = JSON.parse(evt.data);
  
  if(data.uid) {
    uid = data.uid;
    console.log(uid);
    ws.send(JSON.stringify({
      uid: uid,
      message: 'Hello, world' 
    }));
  }
};