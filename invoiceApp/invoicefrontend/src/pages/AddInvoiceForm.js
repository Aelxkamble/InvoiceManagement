import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addInvoice } from "../api/services/invoiceService";

const AddInvoiceForm = ({ onInvoiceAdded }) => {
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Unpaid");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!clientName || !amount || !dueDate || !status) {
      setError("All fields are required");
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Amount must be a valid positive number");
      return;
    }

    // Call the service to add an invoice
    addInvoice({ clientName, amount, dueDate, status })
      .then(() => {
        toast.success("Invoice added successfully!");
        setClientName("");
        setAmount("");
        setDueDate("");
        setStatus("Unpaid");

        // Callback to parent component after success
        onInvoiceAdded(true);
      })
      .catch((error) => {
        console.error("Error adding invoice:", error);
        toast.error("Failed to add invoice");
        setError("Failed to add invoice");

        // Callback to parent after failure
        onInvoiceAdded(false);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        label="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <FormControl required margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Unpaid">Unpaid</MenuItem>
        </Select>
      </FormControl>
      {error && <FormHelperText error>{error}</FormHelperText>}
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
        Add Invoice
      </Button>
    </Box>
  );
};

export default AddInvoiceForm;
