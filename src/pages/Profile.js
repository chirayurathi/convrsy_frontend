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
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { toast } from "react-toastify";
import { signup } from "../api/auth";
import ColorPicker from "material-ui-color-picker";

export default function SignUp() {
  const { state, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: state.user.firstName,
    lastname: state.user.lastname,
    company: state.user.company.name,
    email: state.user.email,
    color:state.user.company.color
  });
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    instance
      .get("/get-companies")
      .then((response) => {
        console.log(response.data);
        setCompanies(response.data.data);
      })
      .catch((response) => {
        console.log(response);
        toast.error(response.message);
      });
  }, []);

  const onChangeHandle = (index, value) => {
    let _formData = { ...formData };
    _formData[index] = value;
    setFormData(_formData);
  };

  const onSuccess = (response) => {
    console.log("response");
    localStorage.setItem("access", response.data.data.access);
    instance.defaults.headers.common.Authorization = response.data.data.access;
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        ...response.data.data,
      },
    });
    toast.success("New User Created Successfully.");
    navigate("/dashboard");
  };

  const handleSubmit = () => {
    signup(
      {
        ...formData,
        company: formData.company.name,
      },
      onSuccess
    );
  };

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
          Profile
        </Typography>
        <Box noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                disabled
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  onChangeHandle("email", e.target.value);
                }}
                value={formData.email}
                xs={{height:"50px"}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => {
                  onChangeHandle("firstName", e.target.value);
                }}
                value={formData.firstName}
                xs={{height:"50px"}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => {
                  onChangeHandle("lastName", e.target.value);
                }}
                value={formData.lastname}
                xs={{height:"50px"}}
              />
            </Grid>
            <Grid container xs={12} spacing={2} mt={1} ml={0} justifyContent={"space-around"}>
              <Grid item xs={6}>
                <TextField name="company" disabled value={formData.company}
                xs={{height:"50px"}}
                 />
              </Grid>
              <Grid item xs={6}>
                <ColorPicker
                  name="color"
                  defaultValue="#000"
                  // value={this.state.color} - for controlled component
                  onChange={(color) => console.log(color)}
                  fullWidth
                  variant="outlined"
                  label="Theme"
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
