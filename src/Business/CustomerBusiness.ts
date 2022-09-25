import { CustomerData } from "../Data/CustomerData";
import { CustomError } from "../Error/CustomError";
import { CustomerInputDTO, CustomerModel, TYPE } from "../Model/CustomerModel";
import { IdGenerator } from "../Services/idGenerator";


export class CustomerBusiness{
    constructor(private idGenerator: IdGenerator, private customerData: CustomerData){}
    customer = async(input:CustomerInputDTO) => {
        try {
            const {name, email, document, type, phones, birthdate, address} = input
            if (!name || !email || !document || !type || !phones || !birthdate || !address) {
                throw new CustomError(422, "Missing input!");
              }

              if (!email.includes("@") || !email.includes(".com")) {
        throw new CustomError(422, "Invalid email!");
      }
      const verificationEmail = await this.customerData.findCustomerByEmail(email);

      if (verificationEmail) {
        throw new CustomError(401, "Invalid credentials!");
      }
      if(document.length < 11 || document.length > 14){
        throw new CustomError(401, "Invalid CPF!");
      }
      const verificationDocument = await this.customerData.findCustomerbyDocument(document)
      if(verificationDocument){
        throw new CustomError(401, "Invalid credentials!");
      }
 
      if (type === TYPE.PessoaJuridica.toLocaleLowerCase() || type === TYPE.Pessoafisica.toLocaleLowerCase() ) {
        throw new CustomError(403, "Incorrect type, put 'Pessoa fisica' or 'Pessoa Juridica'!");
      }
       if(phones.length === 11){
        throw new CustomError(422, "Invalid phones!");
       }
    const  verificationBirthdate = new Date(birthdate);
      
      let formattedDate = ((verificationBirthdate.getDate() )) + "/" + ((verificationBirthdate.getMonth() + 1)) + "/" + verificationBirthdate.getFullYear();
      
      if(!formattedDate){
        throw new CustomError(422, "Invalid birthdate!");
      }

      const id = this.idGenerator.generate();

     const  newCustomer = new CustomerModel(id, name, email, document, type, phones, birthdate, address);

     await this.customerData.createCustomer(newCustomer)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    getCustomerId = async (id: string) => {
    if (!id) {
      throw new CustomError(400, "Enter a buyer id");
    }
    const customerId = await this.customerData.getCustomerById(id);

    if (!customerId) {
      throw new CustomError(400, "There is no buyer with this id");
    }
    return customerId;
  };
}