import api from "../api";
import { INVOICES_API } from "../endpoints/invoice";

// Fetch invoices from the API using the Axios instance
const fetchInvoices = async () => {
  try {
    const response = await api.get(INVOICES_API);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch invoices");
  }
};

// Add an invoice to the API
const addInvoice = async (invoiceData) => {
  try {
    const response = await api.post(INVOICES_API, invoiceData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add invoice");
  }
};

// Delete an invoice by its ID
const deleteInvoiceById = async (invoiceId) => {
  try {
    // Send DELETE request to the API
    const response = await api.delete(`${INVOICES_API}/${invoiceId}`);

    // Check if the response indicates success
    if (response.data.success) {
      return response.data; // Return success response
    } else {
      throw new Error("Failed to delete invoice");
    }
  } catch (error) {
    // Handle errors during deletion
    throw new Error(`Failed to delete invoice: ${error.message}`);
  }
};

export { fetchInvoices, addInvoice, deleteInvoiceById };
