import axios from 'axios';

class API {
    constructor () {
        this.host = '127.0.0.1';
        this.port = 3069;
    }

    getTracksByDir(dir) {
        return this.makeGetRequest(this, 'tracks', {folder: dir});
    }

    getMusicDirs() {
        return this.makeGetRequest(this, 'music', {});
    }

    makeGetRequest(self, endpoint, params) {
        console.log(params);
        return new Promise(function (resolve, reject) {
            let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            let url = 'http://' + self.host + ':' + self.port + '/' + endpoint + '?' + queryString;

            axios.get(url)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = API;