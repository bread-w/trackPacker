import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuDropdown from "../MenuDropdown/MenuDropdpown";
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
   /*  backgroundColor: "#b44b3c", */
   /*  color: "#13160e", */
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="transparent" position="static">
        <Toolbar color="transparent">
          <Typography variant="h2" className={classes.title}>
            TrackPacker
          </Typography>
          <HomeIcon/>
          <MenuDropdown  />
        </Toolbar>
      </AppBar>
    </div>
  );
}
