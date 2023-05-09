import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function SideNav() {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  const {state, dispatch} = useContext(AuthContext);


  const toggle = () => {
    toggleSidebar();
    if (toggled) {
      console.log(true);
      collapseSidebar();
    } else {
      console.log(false);
      collapseSidebar();
    }
  };

  return (
      <Sidebar
        breakPoint="sm"
        transitionDuration={800}
        rtl={false}
        // backgroundColor={state?.user?.company?.color}
        style={{ height: "100vh", position:"sticky" }}
      >
        {/* {!broken && ( */}
        <Menu>
          <MenuItem icon={<AddCircleRoundedIcon />}>Create New Form</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
        </Menu>
        {/* )} */}
      </Sidebar>
  );
}

export default SideNav;