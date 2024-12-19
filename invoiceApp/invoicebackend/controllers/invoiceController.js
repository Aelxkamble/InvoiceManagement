const {
  getInvoices,
  addInvoice,
  deleteInvoiceById,
} = require("../models/invoiceModel");
const { sendResponse, sendError } = require("../utils/responseHandler");

// GET /invoices
const getInvoiceList = (req, res) => {
  try {
    const invoices = getInvoices();
    sendResponse(res, 200, invoices);
  } catch (error) {
    sendError(res, 500, "Error fetching invoices");
  }
};

// POST /invoices
const createInvoice = (req, res) => {
  const { clientName, amount, dueDate, status } = req.body;

  if (!clientName || !amount || !dueDate || !status) {
    return sendError(res, 400, "All fields are required");
  }

  if (isNaN(amount) || amount <= 0) {
    return sendError(res, 400, "Amount must be a valid positive number");
  }

  const newInvoice = {
    id: Date.now().toString(),
    clientName,
    amount,
    dueDate,
    status,
  };

  try {
    const createdInvoice = addInvoice(newInvoice);
    sendResponse(res, 201, createdInvoice);
  } catch (error) {
    sendError(res, 500, "Error adding invoice");
  }
};

// DELETE /invoices/:id
const removeInvoice = (req, res) => {
  const { id } = req.params;

  try {
    const deletedInvoice = deleteInvoiceById(id);

    if (!deletedInvoice) {
      return sendError(res, 404, "Invoice not found");
    }

    sendResponse(res, 200, {
      message: "Invoice deleted successfully",
      deletedInvoice,
    });
  } catch (error) {
    sendError(res, 500, "Error deleting invoice");
  }
};

module.exports = {
  getInvoiceList,
  createInvoice,
   removeInvoice
};
