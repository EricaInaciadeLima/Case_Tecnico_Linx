export class CardModel{
    constructor(
        private id: string,
        private card_holder_name: string,
        private card_number: string,
        private card_expiration_date: string,
        private card_cvv: string,
        private customer_id: string
    ){}

    getId = ():string => {
        return this.id
    }
    getCardHolderName = ():string => {
        return this.card_holder_name
    }
    getCardNumber = ():string => {
        return this.card_number
    }
    getCardExpirationDate= ():string => {
        return this.card_expiration_date
    }
    getCardCvv = ():string => {
        return this.card_cvv
    }
    getCustomerId = ():string => {
        return this.customer_id
    }
    // static toUserModel(data: any): Card {
    //     return new Card(data.id, data.card_holder_name, data.card_number, data.card_expiration_date, data.card_cvv, data.buyer_id);
    //   }
}

  export interface CardInputDTO {
    card_holder_name: string,
    card_number: string,
    card_expiration_date: string,
    card_cvv: string,
    customer_id: string
  }
  