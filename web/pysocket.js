window.pysocket = {};

(function (window) {
  function PySocket(host) {
    this.host = host;
    this.connected = false;
    this.listeners = {};
  };
  
  // Creates the web socket and sets up listeners.
  PySocket.prototype.connect = function (callback) {
    var self = this;
    
    this.socket = new WebSocket(this.host);
    this.socket.onopen = function () {
      self.onConnect.call(self);
      callback();
    };
    
    this.socket.onmessage = function (event) {
      self.handleMessage.apply(self, arguments);
    };
    
    this.socket.onclose = function () {
      self.onClose.call(self);
    }
  };
  
  // Called when the web socket connects to the server.
  PySocket.prototype.onConnect = function () {
    this.connected = true;
  };
  
  // Handles all web socket messages.
  PySocket.prototype.handleMessage = function (event) {
    var data = parseMessage(event);
    
    if(data.__name && this.listeners[data.__name]) {
      var listeners = this.listeners[data.__name],
          i = 0,
          ln = listeners.length;
      for(; i != ln; i++) {
        listeners[i](data);
      }
    }
  };
  
  // Takes a message event and turns it into a data object.
  function parseMessage(event) {
    return JSON.parse(event.data);
  }
  
  // Adds a listener for a message.
  PySocket.prototype.on = function (name, callback) {
    if(!this.listeners[name]) {
      this.listeners[name] = [];
    }
    
    this.listeners[name].push(callback);
  };
  
  // Removes a listener for a message.
  PySocket.prototype.off = function (name, callback) {
    if(this.listeners[name]) {
      this.listeners[name].splice(this.listeners[name].indexOf(callback), 1);
    }
  };
  
  // Packages and sends a message through the web socket.
  PySocket.prototype.send = function (name, message) {
    message = packageMessage(name, message);
    
    this.socket.send(message);
  };
  
  function packageMessage(name, message) {
    message.__name = name;
    
    return JSON.stringify(message);
  };
  
  // Called when the web socket disconnects from the server.
  PySocket.prototype.onClose = function () {
    this.connected = false;
  };
  
  pysocket.Socket = PySocket;
})(window);

(function (window) {
  var readyList = [],
      ready = false;
  
  function doReady() {
    var i = 0,
        ln = readyList.length;
    for(; i != ln; i++) {
      readyList[i]();
    }
    
    readyList = [];
    ready = true;
  };
  
  function DOMContentLoaded() {
    if(document.addEventListener) {
      document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
      doReady();
    } else if(document.attachEvent) {
      document.detachEvent('onreadystatechange', DOMContentLoaded, false);
      doReady();
    }
  };
  
  pysocket.ready = function (func) {
    readyList.push(func);
    
    // If the document is ready call the function immediately under
    // a new thread.
    if(document.readyState === 'complete' || ready == true) {
      return setTimeout(doReady, 1);
    }
    
    // Listen for dom content loaded on Mozilla, Opera, and webkit
    if(document.addEventListener) {
      document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
      
      window.addEventListener('load', doReady, false);
    } else if(document.attachEvent) {
      document.attachEvent('onreadystatechange', DOMContentLoaded);
      
      window.attachEvent('onload', doReady);
    }
  }
})(window);

(function () {
  function bind(scope, func) {
    return function () {
      func.apply(scope, arguments);
    };
  };
  
  function User(host) {
    this.socket = new pysocket.Socket(host);
    this.uid = -1;
    this.name = 'Guest';
    
    // Setup all message handlers.
    this.socket.on('login', bind(this, this.onLogin));
  };
  
  User.prototype.connect = function (callback) {
    this.socket.connect(callback);
  };
  
  User.prototype.login = function (name, password, callback) {
    var message = {
      name: name,
      password: password
    };
    
    this.name = name;
    
    if(callback) this.socket.on('login', callback);
    
    this.socket.send('login', message);
  };
  
  ///////////////////////
  // Message Handlers
  //////////////////////
  User.prototype.onLogin = function (data) {
    this.uid = data.uid;
  };
  
  pysocket.User = User;
})();