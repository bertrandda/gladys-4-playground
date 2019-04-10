import config from '../../config';

class Session {

  constructor(httpClient) {
    this.user = null;
    this.initialized = false;
    this.httpClient = httpClient;
    this.event = new EventTarget();
    this.websocketConnected = false;
  }

  init() {
    if (this.initialized) {
      return null;
    }
    const user = this.getUser();
    if (user) {
      this.connect();
      this.httpClient.setToken(user.refresh_token, user.access_token);
      this.initialized = true;
    }
  }

  connectAndRetry() {
    
  }

  connect () {
    console.log('Trying to connect...');
    const ws = new WebSocket(config.webSocketUrl);
    ws.onopen = () => {
      console.log('Connected!');
      this.websocketConnected = true;
      ws.send(JSON.stringify({
        type: 'authenticate.request',
        payload: {
          accessToken: this.user.access_token
        }
      }));
      ws.onmessage = (e) => {
        const { data } = e;
        const { type, payload } = JSON.parse(data);
        this.event.dispatchEvent(new CustomEvent(type, { detail: payload }));
      };
    };
    ws.onerror = (e) => {
      console.log('Error');
    };
    ws.onclose = () => {
      console.log('disconnected');
      this.websocketConnected = false;
      setTimeout(() => {
        this.connect();
      }, 1000);
    };
  }

  getUser () {
    if (this.user) {
      return this.user;
    }
    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data);
    }
    return this.user;
  }

  saveUser (user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export { Session };
