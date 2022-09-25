export enum TYPE {
  PessoaJuridica = "Pessoa Jurídica",
  Pessoafisica = "Pessoa Física",
}
export class CustomerModel {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private document: string,
    private type: TYPE,
    private phones: string,
    private birthdate: string,
    private address: string
  ) {}

  getId = (): string => {
    return this.id;
  };
  getName = (): string => {
    return this.name;
  };
  getEmail = (): string => {
    return this.email;
  };
  getDocument = (): string => {
    return this.document;
  };
  getType = (): string => {
    return this.type;
  };
  getPhones = (): string => {
    return this.phones;
  };
  getBirthdate = (): string => {
    return this.birthdate;
  };
  getAddress = (): string => {
    return this.address;
  };

  static toUserModel(data: any): CustomerModel{
      return new CustomerModel(data.id, data.name, data.email, data.document, data.type, data.phones, data.birthdate, data.address);
    }
}

export interface CustomerInputDTO {
  name: string;
  email: string;
  document: string;
  type: TYPE;
  phones: string;
  birthdate: string;
  address: string;
}
