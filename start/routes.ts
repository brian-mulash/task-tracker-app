import Route from '@ioc:Adonis/Core/Route'


Route.get('/', 'TasksController.index')

Route.post('/tasks', 'TasksController.store')