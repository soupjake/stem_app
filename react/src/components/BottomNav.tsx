import React from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import PagesIcon from "@material-ui/icons/Pages";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EventNoteIcon from "@material-ui/icons/EventNote";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  },
  buttonLink: {
    textDecoration: "none"
  }
});

const BottomNav: React.FunctionComponent = props => {
  const classes = useStyles({});
  const [value, setValue] = React.useState("/");

  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} component={Link} to="/" />
      <BottomNavigationAction label="Services" value="/services" icon={<PagesIcon />} component={Link} to="/services" />
      <BottomNavigationAction label="Jobs" value="/jobs" icon={<AssignmentIcon />} component={Link} to="/jobs" />
      <BottomNavigationAction label="Blogs" value="/blogs" icon={<EventNoteIcon />} component={Link} to="/blogs" />
    </BottomNavigation>
  );
};

export default withRouter(BottomNav);