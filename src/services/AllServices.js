import configuration from "../configuration/configuration";
import Axios from './Axiosservices'

const axios = new Axios();
//const config = new configuration();

export default class AllServices {

   CreateCountrymast=async(data)=> {
        //console.log("data :", data, "Url :", configuration.CreateCountrymast)
        return  await axios.post(configuration.CreateCountrymast, data, {
            'Content-Type': 'application/json'
        
        })
    }
   DeleteCountrymast=async(id)=> {
       // console.log("data :", "Url :", configuration.DeleteCountrymast)
        return  await axios.delete(`${configuration.DeleteCountrymast}/${id}`)
    }
   FetchCountrymast=async(id)=> {
        //console.log("data :", "Url :", configuration.DeleteCountrymast)
        return  await axios.get(`${configuration.FetchCountrymast}/${id}`)
    }
   UpdateCountrymast=async(id,data)=> {
        //console.log("data :", data, "Url :", configuration.UpdateCountrymast)
        return  await axios.post(`${configuration.UpdateCountrymast}/${id}`, data, {
            'Content-Type': 'application/json'
        
        })
    }
    ViewCountryList=async()=>{
       // console.log("Url :",configuration.ViewCountry)
        return await axios.get(configuration.ViewCountrymast)
    }
}
