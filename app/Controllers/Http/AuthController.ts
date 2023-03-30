import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {rules, schema} from '@ioc:Adonis/Core/Validator'

export default class AuthController {
   public async showRegister ({view}: HttpContextContract) {
      return view.render('auth/register')
   }

   public async registerUser ({request, response, auth}: HttpContextContract) {
      const validationSchema = schema.create({
         username: schema.string({trim:true}, []),

         email: schema.string({trim:true}, [
            rules.email(),
            rules.unique({ table: 'users', column: 'email' }),
            rules.maxLength(40)
         ]),

         password: schema.string({trim:true}, [
            rules.confirmed()
         ])

      })

      const validatedData = await request.validate({
         schema: validationSchema,

         messages: {
            'username.required': 'username is required',
            'email.required': 'email is required',
            'password.required': 'password is required',
            'password.confirmed': 'password confirmation is required'
         }

      })

      const user = await User.create(validatedData)

      await auth.login(user)

      return response.redirect('/')
   }

   /* logout */
   public async logout ({auth, response}: HttpContextContract) {
      await auth.logout()

      return response.redirect('/')
   }

   /* show login */
   public async showLogin ({view}: HttpContextContract) {
      return view.render('auth/login')
   }

   /* login user */
   public async loginUser ({request, response, session, auth}: HttpContextContract) {
      const {email, password} = request.all()

      try {
         await auth.attempt(email, password)

         return response.redirect('/')
      } catch (error) {
         session.flash('notification', 'we can not verifiy your credentials')

         return response.redirect('back')
      }
   }
}
