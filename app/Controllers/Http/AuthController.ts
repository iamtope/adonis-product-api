import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { validationSchema, createUser } from 'App/Account/index'
import User from  'App/Models/User';
import Hash from "@ioc:Adonis/Core/Hash";

export default class AuthController {
  public async signup({ request, response }: HttpContextContract) {
    const userDetails = await request.validate({ schema: validationSchema });
    const user = await createUser(
      userDetails.username,
      userDetails.email,
      userDetails.password,
      userDetails.first_name,
      userDetails.last_name,
      userDetails.gender,
      userDetails.contact_number,
      userDetails.address,
      );
    return response.json(user.serialize());
  }


  public async login({ auth, request, response }) {
    try {
      // validate the user credentials and generate a JWT token
      const email = request.input('email')
      const inputPassword = request.input('password')

      const user = await User.findBy('email', email)
      if(!user){
        response.status(400).json({
          status: 'error',
          message: 'User does not exist'
        })
      }
      const userPassword = user?.password as string
      const isSame = await Hash.verify(userPassword, inputPassword)
      if (isSame == false){
        response.status(400).json({
          status: 'error',
          message: 'Invalid Email/Password'
        })
      }

      const newUser = new User();
      newUser.email = email;
      newUser.password = inputPassword;
      newUser.name = user?.first_name;
      const token = await auth.use('api').generate(user, {
        expiresIn: "2 days",
      })


      return response.json({
        status: 'successfully logged in',
        data: token
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password'
      })
    }
  }
}