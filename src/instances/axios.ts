import axios, { AxiosInstance } from "axios"
import { stringify } from "querystring";

class Axios {
    token = ''
    
    async GetInstance() : Promise<AxiosInstance> {
        if (this.token === '')
            await this.UpdateToken()
        return axios.create({
            timeout: 10 * 1000,
            headers: {
                Authorization: `Bearer ${this.token}` 
            }
        })
    }

    async UpdateToken() {
        console.log('update')
        let tokenHeader = new Buffer(process.env.spotifyAccess + ':' + process.env.spotifySecret).toString('base64');
        let client = axios.create({
            timeout: 10 * 1000,
            headers: {
                Authorization: `Basic ${tokenHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const { data, ...restAxios } = await client.post('https://accounts.spotify.com/api/token', {
            grant_type: 'client_credentials'
        })

        this.token = data.access_token
    }
}

export default Axios;