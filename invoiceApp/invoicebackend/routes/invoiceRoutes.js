const express = require("express");
const {
  getInvoiceList,
  createInvoice,
  removeInvoice,
} = require("../controllers/invoiceController");

const router = express.Router();

router.get("/invoices", getInvoiceList);
router.post("/invoices", createInvoice);
router.delete("/invoices/:id", removeInvoice);

module.exports = router;
