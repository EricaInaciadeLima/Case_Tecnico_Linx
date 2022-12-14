import { Request, Response } from "express";
import { CustomerBusiness } from "../Business/CustomerBusiness";
import { CustomerData } from "../Data/CustomerData";
import { CustomerInputDTO } from "../Model/CustomerModel";
import { IdGenerator } from "../Services/idGenerator";
import { TokenGenerator } from "../Services/tokenGenerator";

export class CustomerController {
  constructor(
    private customerBusiness: CustomerBusiness,
    private tokenGenerator: TokenGenerator
  ) {}
  customer = async (req: Request, res: Response) => {
    try {
      
      const { name, email, document, type, phones, birthdate, address } =
        req.body;

      const input: CustomerInputDTO = {
        name,
        email,
        document,
        type,
        phones,
        birthdate,
        address,
      };
      const result = await this.customerBusiness.customer(input);
      res.status(201).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  getCustomerId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await this.customerBusiness.getCustomerId(id);
    res.status(200).send(customer);
  };
}
