import React from "react";
import { Container, Typography } from "@mui/material";
import InvoiceList from "./pages/InvoiceList";

const App = () => {
  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginTop: 4 }}
      >
        Invoice Management
      </Typography>
      <InvoiceList />
    </Container>
  );
};

export default App;
