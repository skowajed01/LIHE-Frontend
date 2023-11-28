import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "../layout/DataTable//DataTable.scss";
import ModelPopUp from "layout/ModelPopUp/ModePopUp";
//import ModelPopUpConfirm from "layout/ModelPopUp/ModelPopUpConfirm";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
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
  
  import AllServices from "services/AllServices";
  const services = new AllServices();

const UpdateCountryMaster = (props) => {
    const [openPopUp, setopenPopUp] = useState(false);

    const [countryDetails, SetcountryDetails] = useState({
      data: {},
      transId: "undefined",
    });
    const {
      handleSubmit,
      reset,
      register,
      formState: { errors },
    } = useForm({
      mode: "onTouched",
     
    });
    const navigate = useNavigate();
    console.log("component call");
  
    const HandlePopup = (value) => setopenPopUp(value);
  
    const handleDelete = async (transId) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
        
  var data=await services.DeleteCountrymast(transId)
  
  
          if (data.data.isSuccess) {
            swal({
              title: "Deleted",
              //text: "Country deleted",
              icon: "success",
            }).then((value) => {
              // navigate("/Master/ViewCountryMaster");
              window.location.reload(false);
            });
          }
        } else {
          swal("Not Deleted!");
        }
      });
  
      // mutation.mutate(id)
    };
    const handleEdit = async (transId) => {
      console.log("edit function");
  
      try {
  
        var data= await services.FetchCountrymast(transId)
        console.log(data);
        countryDetails.data =data.data.result;
        countryDetails.transId = transId;
        reset(data.data.result);
        // console.log(countryLists);
        SetcountryDetails(countryDetails);
      } catch (error) {}
      setopenPopUp(true);
    };
    const onSubmit = async (values) => {
      console.log(values);
  
      var data=await services.UpdateCountrymast(countryDetails.transId,values)
      setopenPopUp(false);
      if (data.data.isSuccess) {
        swal({
          title: "Updated",
          text: `updated Successfully`,
          icon: "success",
        }).then((value) => {
          // navigate("/Master/ViewCountryMaster");
          window.location.reload(false);
        });
      }
    };
    const actionColumn = {
      field: "action",
      headerName: "Action",
      minWidth: 200,
  
      renderCell: (params) => {
        return (
          console.log(params),
          (
            <div className="action">
              {/* <Link to={`/${props.slug}/${params.row.transId}`}>
                <EditIcon color="info" />
              </Link> */}
              <div
                className="Edit"
                onClick={() => handleEdit(params.row.transId)}
              >
                <EditIcon color="info" />
              </div>
              <div
                className="delete"
                onClick={() => handleDelete(params.row.transId)}
              >
                <DeleteIcon />
              </div>
            </div>
          )
        );
      },
    };
    return (
      <>
        <div>
          <Link to="/Master/CountryMaster">
            <Button variant="contained">Back</Button>
          </Link>
        </div>
        <div className="dataTable">
          <DataGrid
            className="dataGrid"
            rows={props.rows}
            columns={[...props.columns, actionColumn]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
          />
        </div>
        {/* <ModelPopUp
          isopen={openPopUp}
          setpopup={HandlePopup}
          handleEdit={handleEdit}
          details={countryDetails}
        /> */}
        <Dialog
          open={openPopUp}
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
                onClick={() => setopenPopUp(!openPopUp)}
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
                    required: "this field is requied",
                  })}
                  error={!!errors.countryname}
                  helperText={errors.countryname?.message}
                  name="countryname"
                />
                <TextField
                  variant="outlined"
                  label="Currency"
                  name="currency"
                  {...register("currency", { required: "this field is requied" })}
                  error={!!errors.currency}
                  helperText={errors.currency?.message}
                />
                <TextField
                  variant="outlined"
                  label="Nationality Name"
                  name="nationalityname"
                  {...register("nationalityname", {
                    required: "this field is requied",
                  })}
                  error={!!errors.nationalityname}
                  helperText={errors.nationalityname?.message}
                />
                <TextField
                  variant="outlined"
                  label="Calling Code"
                  name="callingcode"
                  {...register("callingcode", {
                    required: "this field is requied",
                  })}
                  error={!!errors.callingcode}
                  helperText={errors.callingcode?.message}
                />
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </DialogContent>
          </form>
        </Dialog>
  
        {/* <ModelPopUpConfirm isopen={openConPopUp} setpopup={HandleConPopup} /> */}
      </>
    );
}

export default UpdateCountryMaster