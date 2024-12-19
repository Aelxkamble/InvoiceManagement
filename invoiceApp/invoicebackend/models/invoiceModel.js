const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "../data/invoices.json");

// Helper function to read data from the file
const readDataFromFile = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2)); // Create file if it doesn't exist
  }
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write data to the file
const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Get all invoices
const getInvoices = () => {
  return readDataFromFile();
};

// Add a new invoice
const addInvoice = (invoice) => {
  const invoices = readDataFromFile();
  invoices.push(invoice);
  writeDataToFile(invoices);
  return invoice;
};

// Delete an invoice by ID
const deleteInvoiceById = (id) => {
  const invoices = readDataFromFile();
  const index = invoices.findIndex((invoice) => invoice.id == id);
  if (index === -1) {
    return null; // Invoice not found
  }

  const [deletedInvoice] = invoices.splice(index, 1);
  writeDataToFile(invoices);
  return deletedInvoice;
};

module.exports = {
  getInvoices,
  addInvoice,
   deleteInvoiceById
};
