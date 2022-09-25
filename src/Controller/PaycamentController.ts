import { Request, Response } from "express";
import { CardBusiness } from "../Business/CardBusiness";
import { PaycamentBusiness } from "../Business/PaycamentBusiness";
import {
  PaycamentBoleto,
  PaycamentCard,
  TYPE_PAYCAMENT,
} from "../Model/PaycamentModel";

export class PaycamentController {
  constructor(
    private paycamentBusiness: PaycamentBusiness,
    private cardBusiness: CardBusiness
  ) {}
  paycament = async (req: Request, res: Response) => {
    try {
      console.log("Entrei no controller paymnet")
      const {
        amount,
        status,
        payment_method,
        customer_id,
        card_cvv,
        card_holder_name,
        card_number,
        card_expiration_date,
      } = req.body;

      const code = Date.now();
      if (payment_method === TYPE_PAYCAMENT.CARD) {
        const inputPaycament = {
          amount,
          code,
          payment_method,
          status,
          customer_id,
        };
        const inputCard: PaycamentCard = {
          card_cvv,
          card_expiration_date,
          card_number,
          card_holder_name,
          customer_id,
        };
        const result = await this.cardBusiness.card(inputCard);
        await this.paycamentBusiness.paycament(inputPaycament);
        res
          .status(201)
          .send({ message: "Paycament made successfully", result });
      } else {
        console.log("Entrei no controller paymnet")
        const inputBoleto: PaycamentBoleto = {
          amount,
          payment_method,
          status,
          customer_id,
        };
        await this.paycamentBusiness.paycament(inputBoleto);
        const numberBoleto = Date.now();
        res.status(201).send({ message: `Number the boleto ${numberBoleto}` });
      }
    } catch (error: any) {
      console.log("Entrei no controller paymnet error")
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  getPaycamentId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payment = await this.paycamentBusiness.getPaycamentId(id);
    res.status(200).send(payment);
  };
}
