import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../../static/InfoBox.css";

const InfoBox = (props) => {
  const { title, cases, total, onClick, active, isRed } = props;

  return (
    <Card
      onClick={onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" className="infoBox__title">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        <Typography color="textSecondary" className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
