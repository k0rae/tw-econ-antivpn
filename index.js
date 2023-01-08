const TeeworldsEcon = require('teeworlds-econ');
const axios = require('axios')

const config = require('./config.js');

const econ = new TeeworldsEcon(config.HOST, config.PORT, config.PASSWORD);

const checkForVPN = (ip) => {
    const url = `https://vpnapi.io/api/${ip.split(':')[0]}?key=${config.VPN_API_KEY}`;

    axios.get(url).then((res) => {
        if(res.data.security) {
            if(res.data.security.vpn || res.data.security.proxy || res.data.security.tor) {
                econ.status().then((status) => {
                    status.forEach((user) => {
                        if(user.client === ip) {
                            econ.exec(`kick ${user.cid} ${config.KICK_MESSAGE}`);
                        }
                    })
                });
            }
        }
    })
}

econ.on('online', (err) => {
    console.log('Connected');
});

econ.on('enter', (e) => {
    checkForVPN(e.client);
})

econ.connect();