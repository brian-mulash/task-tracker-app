import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules} from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksController {
   public async index ({view, auth}: HttpContextContract) {
      const user = auth.user
      await user?.preload('Task')
      
      return view.render('tasks/index', { tasks: user?.Task })
   }

   /* create */
   public async store ({request, response, session, auth}: HttpContextContract) {
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

      await auth.user?.related('Task').create({
         title: validatedData.title,
      })

      session.flash('notification', 'Task Added')

      return response.redirect('back')
   }

   /* update */
   public async update ({response, request, session, params}: HttpContextContract) {
      const task = await Task.findOrFail(params.id)

      task.isCompleted = !!request.input('completed')
      await task.save()

      session.flash('notification', 'Task is updated')

      return response.redirect('back')
   }

   /* delete */
   public async delete ({response, session, params}: HttpContextContract) {
      const task = await Task.findOrFail(params.id)

      await task.delete()

      session.flash('notification', 'Task is deleted!')

      return response.redirect('back')
   }
}
