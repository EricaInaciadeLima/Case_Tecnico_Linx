import { CustomError } from "../Error/CustomError";
import { CardModel } from "../Model/CardModel";
import { BaseData } from "./BaseData";

export class CardData extends BaseData {
  protected tableName: string = "CARD_LINX";

  public async createCard(card: CardModel): Promise<void> {
    try {
      await BaseData.connection(this.tableName).insert({
        id: card.getId(),
        card_holder_name: card.getCardHolderName(),
        card_expiration_date: card.getCardExpirationDate(),
        card_number: card.getCardNumber(),
        card_cvv: card.getCardCvv(),
        customer_id: card.getCustomerId(),
      });
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async getCardById(id: string): Promise<CardModel | undefined> {
    try {
      const [card]: CardModel[] = await BaseData.connection(this.tableName)
        .select("*")
        .where({ id });
      return card;
    } catch (error: any) {
      console.log(error);
      throw new CustomError(400, error.sqlMessage);
    }
  }
}
