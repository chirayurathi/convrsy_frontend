import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { Grid } from '@mui/material';
import { getUserForms } from '../api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  searchBar: {
    marginBottom: theme.spacing(2),
  },
  listItem: {
    marginBottom: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default function MyForms() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    getUserForms(setItems);
  },[]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid item xs p={5} sx={{height:"100vh", overflow:"auto"}}>
    <div className={classes.root}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
      <Typography variant="h4" gutterBottom>
        My Forms
      </Typography>
      </Grid>
      <Grid item>
      <TextField
        className={classes.searchBar}
        label="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </Grid>
      </Grid>
      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.name} alignItems="flex-start" className={classes.listItem}>
            <ListItemText
              primary={item.title}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {item.description}
                  </Typography>
                </>
              }
            />
            <IconButton aria-label="Edit item" onClick={()=>{navigate(`/forms/${item.id}`)}}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Share item">
              <ShareIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
    </Grid>
  );
}
