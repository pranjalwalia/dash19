import React from "react";
import { Link } from "react-router-dom";

//make styles
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";

//grid
import Grid from "@material-ui/core/Grid";

//mediaquery
import useMediaQuery from "@material-ui/core/useMediaQuery";

//sns icon
// import InstagramIcon from "@material-ui/icons/Instagram";
// import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: `100%`,
    position: "relative",
    overflow: "hidden",
    zIndex: 1302,
    padding: "20px 0",
    "&:before": {
      width: "200%",
      height: "100%",
      top: 0,
      left: "-100%",
      backgroundColor: "#000",
      content: '" "',
      position: "absolute",
      transform: ` rotateZ(-60deg)`,
      [theme.breakpoints.down("sm")]: {
        height: "180%",
      },
    },
  },
  footerContainer: {
    position: "absolute",
    zIndex: 10,
  },
  footerLink: {
    textDecoration: "none",
    color: "#fff",
  },
  gridItem: {
    margin: "2.25em",
    [theme.breakpoints.down("sm")]: {
      margin: "0.5em",
    },
  },
  snsIcon: {
    width: "40px",
    height: "40px",
    color: "white",
    margin: "10px",
    [theme.breakpoints.down("xs")]: {
      width: "30px",
      height: "30px",
    },
  },
  copyRightContainer: {
    position: "relative",
    zIndex: 50,
    margin: "30px 10px ",
  },
  copyRight: {
    color: "#fff",
    textDecoration: "none",
  },
}));

const Footer = ({ setValue, setSelectedIndex }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <div className={classes.copyRightContainer}>
          <a href="https://satoruakiyama.com/" className={classes.copyRight}>
            &copy;Satoru Akiyama
          </a>
        </div>

        <Grid
          container
          direction={matchesSM ? "column" : "row"}
          justify="center"
          className={classes.footerContainer}
        >
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.footerLink}
                component={Link}
                to="/"
                onClick={() => setValue(0)}
              >
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.footerLink}
                component={Link}
                to="/about"
                onClick={() => {
                  setValue(1);
                  setSelectedIndex(0);
                }}
              >
                About
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Grid container justify="flex-end">
            <Grid
              item
              component={"a"}
              target="_blank"
              rel="noreferrer noopener"
              href="https://satoruakiyama.com"
            >
              <HomeIcon className={classes.snsIcon} />
            </Grid>
            <Grid
              item
              component={"a"}
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/SatoruAkiyama/material-ui-header-and-footer/"
            >
              <GitHubIcon className={classes.snsIcon} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
