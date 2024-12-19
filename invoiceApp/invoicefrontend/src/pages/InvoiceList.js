import React, { useEffect, useState } from "react";
import {
  deleteInvoiceById,
  fetchInvoices,
} from "../api/services/invoiceService"; // Import the service
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import AddInvoiceForm from "./AddInvoiceForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // State to open/close dialog

  // Fetch invoices from backend using the service
  const fetchData = async () => {
    try {
      const invoicesData = await fetchInvoices();
      setInvoices(invoicesData);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Failed to load invoices!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Dialog open/close handlers
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Callback after adding an invoice
  const handleInvoiceAdded = (success) => {
    if (success) {
      fetchData(); // Refresh the invoice list
      handleCloseDialog(); // Close the dialog
    } else {
      toast.error("Failed to add invoice. Please try again.");
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (confirmDelete) {
      try {
        const result = await deleteInvoiceById(id);

        if (result.success) {
          toast.success("Invoice deleted successfully");
          setInvoices((prevInvoices) =>
            prevInvoices.filter((invoice) => invoice.id !== id)
          );
        }
      } catch (error) {
        // Handle errors and show an alert
        console.error("Error deleting invoice:", error);
        alert(`Error deleting invoice: ${error.message}`);
      }
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100vh",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Toast Notification Container */}
      <ToastContainer />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          Invoice List
        </Typography>

        {/* Button to Open Dialog */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            sx={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              textTransform: "none",
              position: { md: "absolute", sm: "relative" },
              left: 0,
            }}
          >
            Add Invoice
          </Button>
        </Box>
      </Box>
      {/* MUI Dialog for Add Invoice Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "#1976d2",
            color: "#fff",
          }}
        >
          Add New Invoice
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "20px",
          }}
        >
          <AddInvoiceForm onInvoiceAdded={handleInvoiceAdded} />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleCloseDialog}
            color="error"
            variant="contained"
            sx={{
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "8px",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invoice Table */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#1976d2",
                "& th": {
                  borderBottom: "1px solid #ccc",
                },
              }}
            >
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Client Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Amount
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Due Date
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(invoices) && invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <TableRow
                  key={invoice.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternate colors
                    "&:hover": {
                      backgroundColor: "#f1f1f1", // Add hover effect for rows
                    },
                  }}
                >
                  <TableCell>{invoice.clientName}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        invoice.status === "Paid"
                          ? "green"
                          : invoice.status === "Overdue"
                          ? "red"
                          : "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {invoice.status}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDelete(invoice.id)}
                      sx={{
                        padding: "5px 10px",
                        fontSize: "13px",
                        borderRadius: "5px",
                        textTransform: "none",
                      }}
                    >
                      Delete Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ color: "#666", fontStyle: "italic" }}
                >
                  No invoices available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvoiceList;
