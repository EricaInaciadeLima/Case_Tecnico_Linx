import { CardData } from "../Data/CardData";
import { CustomerData } from "../Data/CustomerData";
import { CustomError } from "../Error/CustomError";
import { CardInputDTO, CardModel } from "../Model/CardModel";
import { IdGenerator } from "../Services/idGenerator";
export class CardBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private cardData: CardData,
    private customerData: CustomerData
  ) {}
  card = async (input: CardInputDTO) => {
    try {
      const {
        card_holder_name,
        card_number,
        card_cvv,
        card_expiration_date,
        customer_id,
      } = input;
      if (!card_holder_name || !card_number || !card_cvv) {
        throw new CustomError(422, "Missing input");
      }
      if (card_number.length !== 16) {
        throw new CustomError(422, "Invalid card_number");
      }
      if (card_cvv.length !== 3) {
        throw new CustomError(422, "Invalid card_cvv");
      }
      const verificationCustomer_id = await this.customerData.getCustomerById(
        customer_id
      );

      if (!verificationCustomer_id) {
        throw new CustomError(404, `Customer could not be found`);
      }
      const id = this.idGenerator.generate();

      const [mes, ano] = card_expiration_date.split("/");
      const card_expiration_date_verification = new Date(`${ano}-${mes}-01`);
      if (card_expiration_date_verification.getTime() < Date.now()) {
        throw new CustomError(400, "Expired date card");
      }

      const newCard = new CardModel(
        id,
        card_holder_name,
        card_number,
        card_expiration_date,
        card_cvv,
        customer_id
      );

      await this.cardData.createCard(newCard);

      return newCard;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
