import React, { useState } from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

import "../InfoBox.css";

function InfoBox(props) {
  const { title, cases, total, onClick } = props;

  return (
    <Card
      onClick={onClick}
      className="infoBox"
      style={{ backgroundColor: "#6c757d" }}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        <h2 className="infoBox__cases">{cases}</h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
