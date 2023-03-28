import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TasksController {
   public async index ({view}: HttpContextContract) {
      return view.render('tasks/index')
   }
}
