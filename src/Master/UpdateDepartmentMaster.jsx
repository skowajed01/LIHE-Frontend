import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import "../layout/DataTable//DataTable.scss";
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

const UpdateDepartmentMaster = (props) => {
  const [openPopUp, setopenPopUp] = useState(false);
  const [DepartmentDetails, SetdeptDetails] = useState({
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
        var data = await services.DeleteDeptmast(transId);

        if (data.data.isSuccess) {
          swal({
            title: "Department Master Deleted Successfully",
            //text: "Country deleted",
            icon: "success",
          }).then((value) => {
            window.location.reload(false);
          });
        }
      } else {
        swal({
          icon: "info",
          title: "Department Master Not Deleted!",
        });
      }
    });

    // mutation.mutate(id)
  };
  const handleEdit = async (transId) => {
    console.log("edit function");

    try {
      var data = await services.FetchDeptmast(transId);
      console.log(data);
      DepartmentDetails.data = data.data.result;
      DepartmentDetails.transId = transId;
      reset(data.data.result);
      // console.log(countryLists);
      SetdeptDetails(DepartmentDetails);
    } catch (error) {}
    setopenPopUp(true);
  };
  const onSubmit = async (values) => {
    console.log(values);

    var data = await services.UpdateDeptmast(DepartmentDetails.transId, values);
    setopenPopUp(false);
    if (data.data.isSuccess) {
      swal({
        icon: "success",
        title: "Department Master Updated Successfully",
      }).then((value) => {
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
        <Link to="/Master/DepartmentMaster">
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
            Update Department Details
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
                label="Section"
                {...register("jobtype", {
                  required: "this field is requied",
                })}
                error={!!errors.jobtype}
                helperText={errors.jobtype?.message}
                name="jobtype"
              />
              <TextField
                variant="outlined"
                label="Department Name"
                name="deptname"
                {...register("deptname", { required: "this field is requied" })}
                error={!!errors.deptname}
                helperText={errors.deptname?.message}
              />
              <TextField
                variant="outlined"
                label="Department Short Name"
                name="deptsname"
                {...register("deptsname", {
                  required: "this field is requied",
                })}
                error={!!errors.deptsname}
                helperText={errors.deptsname?.message}
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
};

export default UpdateDepartmentMaster;
