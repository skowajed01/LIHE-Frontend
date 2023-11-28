import configuration from "../configuration/configuration";
import Axios from './Axiosservices'

const axios = new Axios();
//const config = new configuration();

export default class Demoservices {

    createrc(data) {
        console.log("data :", data, "Url :", configuration.createrc)
        return axios.post(configuration.createrc, data, false)
    }
}

