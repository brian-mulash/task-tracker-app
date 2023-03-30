import Route from '@ioc:Adonis/Core/Route'

/* task */
Route.group(() => {
   Route.get('/', 'TasksController.index').middleware('auth')
   Route.post('/tasks', 'TasksController.store')
   Route.patch('/tasks/:id', 'TasksController.update')
   Route.delete('/tasks/:id', 'TasksController.delete')
}).middleware('auth')


/* user */
Route.get('/register', 'AuthController.showRegister').middleware('guest')
Route.post('/register', 'AuthController.registerUser')
Route.post('/logout', 'AuthController.logout')
Route.get('/login', 'AuthController.showLogin').middleware('guest')
Route.post('/login', 'AuthController.loginUser')
