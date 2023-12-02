import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../assets/scss/master.scss";
import AllServices from "services/AllServices";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
import swal from "sweetalert";

const services = new AllServices();

const DepartmentMaster = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  console.log(errors);
  const onSubmit = async (values) => {
    console.log(values);
    var data = await services.CreateDepartmast(values);
    console.log(data);
    if (data.data.isSuccess) {
      swal({
        icon: "success",
        title: "Department Master Inserted Successfully",
        text: `Now Click Ok`,
      }).then((value) => {
        window.location.reload(false);
      });
    }
  };
  return (
    <>
      <div>
        <Link to="/Master/ViewDepartmentMaster">
          <Button variant="contained">View List</Button>
        </Link>
      </div>
      <Card sx={{ mt: 1 }}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 2, width: "56ch" },
          }}
          className="box"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-cnt">
              <TextField
                label="Section "
                name="jobtype"
                size="small"
                variant="standard"
                {...register("jobtype", {
                  required: "Please enter the section.",
                })}
                error={!!errors.jobtype}
                helperText={errors.jobtype?.message}
              />

              <TextField
                label="Department Name"
                name="deptname"
                size="small"
                variant="standard"
                {...register("deptname", {
                  required: "Please enter the departname.",
                })}
                error={!!errors.deptname}
                helperText={errors.deptname?.message}
              />

              <TextField
                label="Department Short Name"
                name="deptsname"
                size="small"
                variant="standard"
                {...register("deptsname", {
                  required: "Please enter the Department Short Name.",
                })}
                error={!!errors.deptsname}
                helperText={errors.deptsname?.message}
              />
            </div>
            <div>
              <div className="flex-btn">
                <Button variant="contained" color="success" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Card>
    </>
  );
};

export default DepartmentMaster;
