import { Request, Response } from "express";
import { CardBusiness } from "../Business/CardBusiness";
import { CardInputDTO } from "../Model/CardModel";

export class CardController {
  constructor(private cardBusiness: CardBusiness) {}
  card = async (req: Request, res: Response) => {
    try {
      const {
        card_holder_name,
        card_number,
        card_expiration_date,
        customer_id,
        card_cvv,
      } = req.body;
      const input: CardInputDTO = {
        card_holder_name,
        card_number,
        card_expiration_date,
        card_cvv,
        customer_id,
      };
      const result = await this.cardBusiness.card(input);
      res.status(201).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
