import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import Fade from "react-reveal";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;
      <Button variant="contained" color="secondary" href="/">
        Launch 🔥
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button
        variant="contained"
        color="primary"
        target="_blank"
        href="https://github.com/masterchief01/dash19"
      >
        🌟 the project
      </Button>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

function About() {
  const classes = useStyles();
  return (
    <Fade duration={1500}>
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Dashboard Covid-19
          </Typography>
          <br />
          <Typography variant="body1">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;built
            on&nbsp;&nbsp;
            <span>
              <img src="./react.png" height="40" />{" "}
            </span>
            &nbsp;&nbsp;
            <span>
              <img src="./firebase.png" height="40" />{" "}
            </span>
            &nbsp;&nbsp; &nbsp;powered by,
          </Typography>
          <br />
          <br />

          <Typography variant="h5" component="h2" maxWidth="md" gutterBottom>
            {"_____________"}
            <a href="https://disease.sh/">
              <img src={"./icon-long.png"} height="40" />
            </a>
            {"____________"}
          </Typography>
          <br />
          <br />
          <br />

          <Typography variant="h5" component="h2" gutterBottom>
            <span role="img" aria-label="student">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {"😷"}
            </span>
          </Typography>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </footer>
      </div>
    </Fade>
  );
}

export default About;
