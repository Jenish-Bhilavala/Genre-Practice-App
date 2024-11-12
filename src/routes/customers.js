const {
  Customer,
  validateCustomer,
  validateCustomerOnUpdate,
} = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customers = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customers = await customers.save();

  res.status(201).send(customers);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomerOnUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customers = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customers) return res.status(404).send("Customer not found");
  res.send(customers);
});

router.delete("/:id", async (req, res) => {
  const customers = await Customer.findByIdAndDelete(req.params.id);

  if (!customers) return res.status(404).send("Customer not");

  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customers = await Customer.findById(req.params.id);

  if (!customers) return res.status(404).send("Customer not");

  res.send(customers);
});

module.exports = router;
