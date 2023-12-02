import configuration from "../configuration/configuration";
import Axios from "./Axiosservices";

const axios = new Axios();
//const config = new configuration();

export default class AllServices {
  CreateDepartmast = async (data) => {
    return await axios.post(configuration.CreateDeptmast, data, {
      "Content-Type": "application/json",
    });
  };
  ViewDeptList = async () => {
    return await axios.get(configuration.ViewDeptmast);
  };
  FetchDeptmast = async (id) => {
    return await axios.get(`${configuration.FetchDeptmast}/${id}`);
  };
  UpdateDeptmast = async (id, data) => {
    return await axios.post(`${configuration.UpdateDeptmast}/${id}`, data, {
      "Content-Type": "application/json",
    });
  };
  DeleteDeptmast = async (id) => {
    return await axios.delete(`${configuration.DeleteCountrymast}/${id}`);
  };

  CreateCountrymast = async (data) => {
    //console.log("data :", data, "Url :", configuration.CreateCountrymast)
    return await axios.post(configuration.CreateCountrymast, data, {
      "Content-Type": "application/json",
    });
  };
  DeleteCountrymast = async (id) => {
    // console.log("data :", "Url :", configuration.DeleteCountrymast)
    return await axios.delete(`${configuration.DeleteCountrymast}/${id}`);
  };
  FetchCountrymast = async (id) => {
    //console.log("data :", "Url :", configuration.DeleteCountrymast)
    return await axios.get(`${configuration.FetchCountrymast}/${id}`);
  };
  UpdateCountrymast = async (id, data) => {
    //console.log("data :", data, "Url :", configuration.UpdateCountrymast)
    return await axios.post(`${configuration.UpdateCountrymast}/${id}`, data, {
      "Content-Type": "application/json",
    });
  };
  ViewCountryList = async () => {
    // console.log("Url :",configuration.ViewCountry)
    return await axios.get(configuration.ViewCountrymast);
  };
}
