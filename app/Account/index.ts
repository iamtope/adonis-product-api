// app/Account/index.ts

import User from "App/Models/User";
import { rules, schema } from "@ioc:Adonis/Core/Validator";

// the validations here could normally be bootstrapped in another file as 
// this is not the best place for it, but for a small app like this, doing this
// here is not entirely bad
export const validationSchema = schema.create({
    email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
    ]),
    username: schema.string({ trim: true }, [
        rules.unique({ table: "users", column: "username" }),
    ]),
    password: schema.string({ trim: true }),
    first_name: schema.string({
        escape: true,
        trim: true
    }),
    last_name: schema.string({
        escape: true,
        trim: true
    }),
    gender: schema.string({
        escape: true,
        trim: true
    }),
    contact_number: schema.string({
        escape: true,
        trim: true
    }),
    address: schema.string({
        escape: true,
        trim: true
    })
});

export const createUser = async (
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    gender: string,
    contact_number: string,
    address: string,
    ) => {

  const user = new User(); 
  user.username = username,
  user.email = email;
  user.password = password;
  user.type  = 'admin',
  user.first_name = first_name,
  user.last_name = last_name,
  user.gender = gender,
  user.contact_number = contact_number,
  user.address = address
  
  return await user.save();
};