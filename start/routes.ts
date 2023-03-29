import Route from '@ioc:Adonis/Core/Route'

/* task */
Route.get('/', 'TasksController.index')
Route.post('/tasks', 'TasksController.store')
Route.patch('/tasks/:id', 'TasksController.update')
Route.delete('/tasks/:id', 'TasksController.delete')

/* user */
Route.get('/register', 'AuthController.showRegister')
Route.post('/register', 'AuthController.registerUser')

Route.get('/login', 'AuthController.showLogin')
Route.post('/login', 'AuthController.loginUser')
