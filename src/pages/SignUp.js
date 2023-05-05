import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useContext } from "react";
import {AuthContext} from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import instance from "../utils/axios";
import { toast } from "react-toastify";
import { signup } from "../api/auth";

const filter = createFilterOptions();

export default function SignUp() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    company: null,
    email: "",
  });
  const [open, toggleOpen] = React.useState(false);

  const {state, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  useEffect(()=>{
    instance.get("/get-companies/")
    .then((response)=>{
      console.log(response.data);
      setCompanies(response.data.data);
    })
    .catch((response)=>{
      console.log(response);
      toast.error(response.message);
    })
  },[]);

  const onChangeHandle = (index, value) => {
    let _formData = { ...formData };
    _formData[index] = value;
    setFormData(_formData);
  };

  const handleClose = () => {
    setDialogValue({
      name: "",
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    name: "",
  });

  const onSuccess = (response)=>{
    console.log("response");
    localStorage.setItem("access",response.data.data.access);
    instance.defaults.headers.common.Authorization = `Bearer ${response.data.data.access}`;
    dispatch({
        type:"LOGIN_SUCCESS",
        payload:{
            ...response.data.data
        }
    });
    toast.success("New User Created Successfully.");
    navigate('/dashboard');
  }

  const handleSubmitCompany = (event) => {
    event.preventDefault();
    let _formData = {...formData};
    _formData["company"] = dialogValue.name;
    setFormData(_formData);
    handleClose();
  };

  const handleSubmit = ()=>{
    signup({
      ...formData,
      company:formData.company.name
    }, onSuccess);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                onChange={(e) => {
                  onChangeHandle("first_name", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                onChange={(e) => {
                  onChangeHandle("last_name", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  onChangeHandle("email", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => {
                  onChangeHandle("password", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                xs={{width:"100%!important"}}
                fullWidth
                label="company"
                value={formData.company}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    // timeout to avoid instant validation of the dialog's form.
                    setTimeout(() => {
                      toggleOpen(true);
                      setDialogValue({
                        name: newValue,
                      });
                    });
                  } else if (newValue && newValue.inputValue) {
                    toggleOpen(true);
                    setDialogValue({
                      name: newValue.inputValue,
                    });
                  } else {
                    let _formData = {...formData};
                    _formData["company"] = newValue;
                    setFormData(_formData);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      title: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                id="free-solo-dialog-demo"
                options={companies}
                getOptionLabel={(option) => {
                  // e.g value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="company" />
                )}
              />
            </Grid>
            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
