import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules} from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksController {
   public async index ({view}: HttpContextContract) {
      return view.render('tasks/index')
   }

   public async store ({request, response}: HttpContextContract) {

      const validationSchema = schema.create({
         title: schema.string({trim: true}, [
            rules.maxLength(255)
         ])
      })

      const validatedData = await request.validate({
         schema: validationSchema,
         messages: {
            'title.required': 'Task is required',
            'title.maxLength': 'Task is not required to exceed 255 characters'
         }
      })

      await Task.create({
         title: validatedData.title
      })

      return response.redirect('back')
   }
}
