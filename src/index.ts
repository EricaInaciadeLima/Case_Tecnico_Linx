import { CardBusiness } from "./Business/CardBusiness";
import { CustomerBusiness } from "./Business/CustomerBusiness";
import { PaycamentBusiness } from "./Business/PaycamentBusiness";
import { app } from "./Controller/app";
import { CardController } from "./Controller/CardController";
import { CustomerController } from "./Controller/CustomerController";
import { PaycamentController } from "./Controller/PaycamentController";
import { CardData } from "./Data/CardData";
import { CustomerData } from "./Data/CustomerData";
import { PaycamentData } from "./Data/PaycamentData";
import { IdGenerator } from "./Services/idGenerator";
import { TokenGenerator } from "./Services/tokenGenerator";

const customerBusiness = new CustomerBusiness( new IdGenerator, new CustomerData)

const customerController = new CustomerController(customerBusiness, new TokenGenerator)
app.get("/customer/:id", customerController.getCustomerId)
app.post("/customer", customerController.customer)

const paycamentBusiness = new PaycamentBusiness(
    new IdGenerator(),
    new PaycamentData()
    
  );
  const cardBusiness = new CardBusiness(
  
    new IdGenerator(),
    new CardData(),
    new CustomerData()
  
  );
  const paycamentController = new PaycamentController(paycamentBusiness, cardBusiness);
  app.post("/paycament", paycamentController.paycament);
  app.get("/paycament/:id", paycamentController.getPaycamentId)
  
  
  
  const cardController = new CardController(cardBusiness);
  app.post("/card", cardController.card);