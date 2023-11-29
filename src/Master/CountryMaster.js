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
const CountryMaster = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  console.log(errors);
  const onSubmit = async (values) => {
    console.log(values);
    var data = await services.CreateCountrymast(values);
    console.log(data);
    if (data.data.isSuccess) {
      swal({
        icon: "success",
        title: "Country Master Inserted Successfully",
        text: `Now Click Ok`,
      }).then((value) => {
        window.location.reload(false);
      });
    }
  };

  return (
    <>
      <div>
        <Link to="/Master/ViewCountryMaster">
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
                label="Country Name"
                name="countryname"
                size="small"
                variant="standard"
                {...register("countryname", {
                  required: "Please enter the country name.",
                })}
                error={!!errors.countryname}
                helperText={errors.countryname?.message}
              />

              <TextField
                label="Currency"
                name="currency"
                size="small"
                variant="standard"
                {...register("currency", {
                  required: "Please enter the currency.",
                })}
                error={!!errors.currency}
                helperText={errors.currency?.message}
              />

              <TextField
                label="Nationality"
                name="nationalityname"
                size="small"
                variant="standard"
                {...register("nationalityname", {
                  required: "Please enter the nationality.",
                })}
                error={!!errors.nationalityname}
                helperText={errors.nationalityname?.message}
              />

              <TextField
                label="Calling Code"
                name="callingcode"
                size="small"
                variant="standard"
                {...register("callingcode", {
                  required: "Please enter the calling code.",
                })}
                error={!!errors.callingcode}
                helperText={errors.callingcode?.message}
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

export default CountryMaster;
