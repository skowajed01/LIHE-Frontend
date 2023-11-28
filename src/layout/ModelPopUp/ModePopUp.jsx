import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ModelPopUp = ({ isopen, setpopup, details }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: async () => {
      console.log("inside defalut");
      const response = await fetch(
        `http://localhost:5012/api/Master/GetCountry/${details.transId}`,
        { method: "Get" }
      );
      const data = await response.json();
      console.log(data);
      if (data.status == 400) {
        return;
      }
      return data.result;
    },
  });
  var data = details.data;
  console.log(data);
  console.log(details);
  const onSubmit = async (values) => {
    console.log(values);

    const response = await fetch(
      `http://localhost:5012/api/Master/UpdateCountrymast/${details.transId}`,
      {
        method: "Post",
        body: JSON.stringify({
          countryname: "dipu",
          currency: "dipuan",
          nationalityname: "didacda",
          callingcode: "5456",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (data.isSuccess) {
      Swal({
        icon: "success",
        title: "Country Master Updated Successfully",
        text: `Now Click Ok`,
      }).then((value) => {
        // navigate("/Master/ViewCountryMaster");
        window.location.reload(false);
      });
    }
  };
  // reset({
  //   countryname: "dipu",
  //   currency: "dipuan",
  //   nationalityname: "didacda",
  //   callingcode: "5456",
  // });
  console.log("model popup");
  return (
    <Dialog
      open={isopen}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-start",
        },
      }}
    >
      <DialogTitle align="center" p={0}>
        <Typography display={"inline-block"} variant="h3" color={"GrayText"}>
          Update Country Details
        </Typography>
        <Tooltip title="Close">
          <IconButton
            sx={{ float: "right", display: "inline-block" }}
            onClick={() => setpopup(!isopen)}
          >
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label="CountryName"
              {...register("countryname", {
                required: "Please enter the country name.",
              })}
              error={!!errors.countryname}
              helperText={errors.countryname?.message}
              name="countryname"
            />
            <TextField
              variant="outlined"
              label="Currency"
              name="currency"
              {...register("currency", {
                required: "Please enter the currency.",
              })}
              error={!!errors.currency}
              helperText={errors.currency?.message}
            />
            <TextField
              variant="outlined"
              label="Nationality Name"
              name="nationalityname"
              {...register("nationalityname", {
                required: "Please enter the nationality.",
              })}
              error={!!errors.nationalityname}
              helperText={errors.nationalityname?.message}
            />
            <TextField
              variant="outlined"
              label="Calling Code"
              name="callingcode"
              {...register("callingcode", {
                required: "Please enter the calling code.",
              })}
              error={errors.callingcode}
              helperText={errors.callingcode?.message}
            />
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default memo(ModelPopUp);
