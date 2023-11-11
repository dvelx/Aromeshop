import DatabaseController from "./controllers/database.controller.js";

const phoneRegex = /^(?:\+?\d{1,3})(?:\(?\d{3}\)[-\s]{0,}\d{3}[-\s]{0,}\d{2}[-\s]{0,}\d{2})$/;

const emailRegex =
    /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

export default async function checkRequestParams(params){
  let error = {};
  for (const [key, value] of Object.entries(params)) {
    switch(key){
      case 'accessKey': {
        if(!value) {
          error = {...error, accessKey: "`accessKey` required"};
        }
        else {
          const res = await DatabaseController.getCart(value);
          if(!res) {
              error = {...error, accessKey: "wrong `accessKey`"};
          }
        }
        break;
      }
      case 'productId': {
        if(!value) {
          error = {...error, productId: "`productId` required"};
        }
        break;
      }
      case 'quantity': {
        if(!value) {
          error = {...error, quantity: "`quantity` required"};
        }
        break;
      }
      case 'name': {
        if (!value) {
          error = { ...error, name: "`name` required" };
        }
        break;
      }
      case 'address': { 
        if (!value) {
          error = { ...error, address: "`address` required" };
        }
        break;}
      case 'phone': { 
        if (!value) {
          error = { ...error, phone: "`phone` required" };
        } else if (!phoneRegex.test(value) || value.length > 20) {
          error = { ...error, phone: "invalid phone format" };
        }  
        break;
      }
      case 'email': { 
        if (!value) {
          error = { ...error, email: "`email` required" };
        } else if (!emailRegex.test(value) || value.length > 50) {
          error = { ...error, email: "invalid email format" };
        }
        break;}
      case 'comment': { break;}

    }
  }

  return error;
}
