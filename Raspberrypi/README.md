### Raspberrypi
Raspberrypi Gpio connection Webserver

#### Stack
```
socket.io, onoff (JS GPIO module), http, fs
```

#### install nodejs && npm
```
sudo apt-get install -y nodejs
sudo apt-get install -y npm
```

```
npm -v
node -v
```

#### npm install socket.io && onoff module
```
sudo apt-get update
sudo apt-get dist-upgrade
npm init
npm install socket.io --save
npm install onoff
```

#### RUN
```
node ./webServer/webserver.js
```
