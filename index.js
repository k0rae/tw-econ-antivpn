const TeeworldsEcon = require('teeworlds-econ');
const axios = require('axios')
require('dotenv').config();

const econ = new TeeworldsEcon(process.env.HOST, process.env.PORT, process.env.PASSWORD);

const checkForVPN = (ip) => {
    const url = `https://vpnapi.io/api/${ip.split(':')[0]}?key=${process.env.VPN_API_KEY}`;

    axios.get(url).then((res) => {
        if(res.data.security) {
            if(res.data.security.vpn || res.data.security.proxy || res.data.security.tor) {
                econ.status().then((status) => {
                    status.forEach((user) => {
                        if(user.client === ip) {
                            econ.exec(`kick ${user.cid} ${process.env.KICK_MESSAGE}`);
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