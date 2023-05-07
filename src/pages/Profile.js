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
import { signup, updateUser } from "../api/auth";
import ColorPicker from "material-ui-color-picker";

export default function SignUp() {
  const { state, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id:state.user.id,
    first_name: state.user.first_name,
    last_name: state.user.last_name,
    company: state?.user?.company?.name,
    email: state.user.email,
    color:state?.user?.company?.color
  });
  const navigate = useNavigate();

  const onChangeHandle = (index, value) => {
    let _formData = { ...formData };
    _formData[index] = value;
    setFormData(_formData);
  };

  const onSuccess = (response) => {
    console.log("response");
    dispatch({
      type: "UPDATE_USER",
      payload: {
        ...response.data.data,
      },
    });
    toast.success("Updated Successfully");
    navigate("/dashboard");
  };

  const handleSubmit = () => {
    updateUser(
      {
        ...formData,
        company:{
          name: formData.company,
          color:formData.color
        }
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
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                onChange={(e) => {
                  onChangeHandle("first_name", e.target.value);
                }}
                value={formData.first_name}
                xs={{height:"50px"}}
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
                value={formData.last_name}
                xs={{height:"50px"}}
              />
            </Grid>
            <Grid container xs={12} spacing={2} mt={1} ml={0} justifyContent={"space-around"}>
              <Grid item xs={6}>
                <TextField name="company" disabled value={formData.company}
                xs={{height:"50px"}}
                label="Company"
                 />
              </Grid>
              <Grid item xs={6}>
                <ColorPicker
                  name="color"
                  // value={this.state.color} - for controlled component
                  onChange={(color) => onChangeHandle("color", color) }
                  fullWidth
                  variant="outlined"
                  label="Theme"
                  value={formData.color}
                  TextFieldProps={{ value: formData.color }}
                  InputLabelProps={{shrink: true}}
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
