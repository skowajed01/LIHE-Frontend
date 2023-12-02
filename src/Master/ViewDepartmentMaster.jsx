import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import AllServices from "services/AllServices";
import UpdateDepartmentMaster from "./UpdateDepartmentMaster";

const services = new AllServices();

const columns = [
  {
    field: "id",
    headerName: "Id",
    minwiWidth: 90,
  },
  {
    field: "deptname",
    headerName: "deptname",
    minWidth: 150,
    type: "string",
  },

  {
    field: "deptsname",
    type: "string",
    headerName: "deptsname",
    minWidth: 150,
  },
  {
    field: "jobtype",
    type: "string",
    headerName: "Jobtype Name",
    minWidth: 150,
  },
];

var departmentLists = [];

const ViewDepartmentMaster = () => {
  const [isLoading, setisLoding] = useState();
  const [isError, setisError] = useState(null);
  useEffect(() => {
    console.log("fetching api");

    GetDeptList();
  }, []);

  const GetDeptList = async () => {
    try {
      setisLoding(true);
      var data = await services.ViewDeptList();
      departmentLists = data.data.result;
      setisLoding(false);
      console.log(departmentLists);
    } catch (error) {
      setisLoding(false);
      setisError(error.message);
    }
  };

  var deptList = [];

  departmentLists.forEach((elements, index, array) => {
    var item = {};
    item.id = index + 1;
    item.transId = elements.transid;
    item.deptname = elements.deptname;
    item.deptsname = elements.deptsname;
    item.jobtype = elements.jobtype;
    deptList.push(item);
  });
  const userRows = deptList;
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
          <UpdateDepartmentMaster
            slug="users"
            columns={columns}
            rows={userRows}
          />
        </div>
      )}
    </>
  );
};

export default ViewDepartmentMaster;
