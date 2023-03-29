import Route from '@ioc:Adonis/Core/Route'


Route.get('/', 'TasksController.index')

Route.post('/tasks', 'TasksController.store')

Route.patch('/tasks/:id', 'TasksController.update')

Route.delete('/tasks/:id', 'TasksController.delete')