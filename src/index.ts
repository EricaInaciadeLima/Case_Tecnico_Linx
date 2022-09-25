import { CustomerBusiness } from "./Business/CustomerBusiness";
import { app } from "./Controller/app";
import { CustomerController } from "./Controller/CustomerController";
import { CustomerData } from "./Data/CustomerData";
import { IdGenerator } from "./Services/idGenerator";

const customerBusiness = new CustomerBusiness( new IdGenerator, new CustomerData)

const customerController = new CustomerController(customerBusiness)
app.get("/customer/:id", customerController.getCustomerId)
app.post("/customer", customerController.customer)