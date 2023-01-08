# tw-econ-antivpn

`tw-econ-antivpn` uses external console to detect VPN users on your Teeworlds server using https://vpnapi.io/

### Requirements:

* Teeworlds server 
* Node.js
* econ ready and set-up, same as here: https://www.npmjs.com/package/teeworlds-econ?activeTab=readme
* https://vpnapi.io/ API key

### Installation

* Clone git project
* Run `npm install` in project directory to install the necessary modules
* Configure `.env`, set the HOST, PORT, PASSWORD, VPN_API_KEY, KICK_MESSAGE values
* Run `npm start` to start
