import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import AllServices from "services/AllServices";
import UpdateCountryMaster from "./UpdateCountryMaster";
const services = new AllServices();
const columns = [
  {
    field: "id",
    headerName: "Id",
    minwiWidth: 90,
  },
  {
    field: "countryname",
    headerName: "CountryName",
    minWidth: 150,
    type: "string",
  },

  {
    field: "currency",
    type: "string",
    headerName: "Currency",
    minWidth: 150,
  },
  {
    field: "nationalityname",
    type: "string",
    headerName: "Nationality Name",
    minWidth: 150,
  },
  {
    field: "callingcode",
    type: "string",
    headerName: "Calling Code",
    minWidth: 200,
  },
];

var countryLists = [];

const ViewCountryMaster = () => {
  const [isLoading, setisLoding] = useState();
  const [isError, setisError] = useState(null);
  useEffect(() => {
    console.log("fetching api");

    GetCountryList();
  }, []);

  const GetCountryList = async () => {
    try {
      setisLoding(true);
      var data = await services.ViewCountryList();
      countryLists = data.data.result;
      setisLoding(false);
      console.log(countryLists);
    } catch (error) {
      setisLoding(false);
      setisError(error.message);
    }
  };

  var countryList = [];

  countryLists.forEach((elements, index, array) => {
    var item = {};
    item.id = index + 1;
    item.transId = elements.transid;
    item.countryname = elements.countryname;
    item.currency = elements.currency;
    item.nationalityname = elements.nationalityname;
    item.callingcode = elements.callingcode;
    countryList.push(item);
  });
  const userRows = countryList;
  return (
    <>
      {isLoading ? (
        <Backdrop open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : isError ? (
        <Box
          component={"div"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "100vh",
          }}
        >
          <Typography color={"InfoText"}>Something Went wrong</Typography>
        </Box>
      ) : (
        <div className="users">
          <UpdateCountryMaster slug="users" columns={columns} rows={userRows} />
        </div>
      )}
    </>
  );
};

export default ViewCountryMaster;
