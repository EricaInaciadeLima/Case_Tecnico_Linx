import {CustomError} from "../Error/CustomError";
import { CustomerModel } from "../Model/CustomerModel";
import { BaseData } from "./BaseData";

export class CustomerData extends BaseData{
    protected tableName:string = "CUSTOMER"

    public async createCustomer (customer: CustomerModel) : Promise<void>{
       
        try {
            await BaseData.connection(this.tableName).insert({
                id: customer.getId(),
                name: customer.getName(),
                email: customer.getEmail(),
                document: customer.getDocument(),
                type: customer.getType(),
                phones: customer.getPhones(),
                birthdate: customer.getBirthdate(),
                address: customer.getAddress()
                
            })
        } catch (error:any) {
            
            throw new CustomError(400, error.sqlMessage);
            
        }
    }
    public async findCustomerByEmail(email:string) : Promise<CustomerModel | undefined>{

        try {
           const customer = await BaseData.connection(this.tableName).select("*")
            .where({email: email})
            return customer[0] && CustomerModel.toUserModel(customer[0])
        }   
        catch (error:any) {
            console.log(error)
            throw new CustomError(400, error.sqlMessage);

        }
    }
    public async findCustomerbyDocument(document:string) : Promise<CustomerModel | undefined>{

        try {
           const customer = await BaseData.connection(this.tableName).select("*")
            .where({document: document})
            return customer[0] && CustomerModel.toUserModel(customer[0])
        }   
        catch (error:any) {
            console.log(error)
            throw new CustomError(400, error.sqlMessage);

        }
    }
    public async getCustomerById(id:string) : Promise<CustomerModel | undefined>{

        try {
           const [customer]:CustomerModel[] = await BaseData.connection(this.tableName).select("*")
            .where({id})
            
            return customer
        }
        catch (error:any) {
            console.log(error)
            throw new CustomError(400, error.sqlMessage);

        }
    }
   
}