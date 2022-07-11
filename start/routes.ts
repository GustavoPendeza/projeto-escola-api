/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// ---------------------------ROTAS SEM LOGIN---------------------
Route.group(() => {

  Route.post('/login', 'AuthController.login')


  // ---------------------------ROTAS COM LOGIN------------------------
  Route.group(() => {

    Route.get('/category/list', 'CategoriesController.list')
    Route.get('/lesson/list', 'LessonsController.list')
  
    Route.patch('/profile/update', 'UsersController.profileUpdate')
    Route.patch('/password/update', 'UsersController.passwordUpdate')
    

    // -----------------------------ROTAS DE ADMIN--------------------------
    Route.group(() => {

      Route.get('/user/list', 'UsersController.list')
      Route.get('/teacher/list', 'TeachersController.list')

      Route.post('/register', 'AuthController.register')
      Route.post('/category/store', 'CategoriesController.store')
      Route.post('/lesson/store', 'LessonsController.store')
      Route.post('/teacher/store', 'TeachersController.store')

      Route.patch('/category/update/:id', 'CategoriesController.update')
      Route.patch('/lesson/update/:id', 'LessonsController.update')
      Route.patch('/user/update/:id', 'UsersController.userUpdate')
      Route.patch('/user/password/update/:id', 'UsersController.userPasswordUpdate')
      Route.patch('/teacher/update/:id', 'TeachersController.update')

      Route.delete('/category/delete/:id', 'CategoriesController.destroy')
      Route.delete('/lesson/delete/:id', 'LessonsController.destroy')
      Route.delete('/teacher/delete/:id', 'TeachersController.destroy')

    }).middleware('admin')

    // ----------------------------ROTAS DE STUDENT---------------------------
    Route.group(() => {
      
      Route.post('/enrollment/store', 'EnrollmentsController.store')
      
    }).middleware('student')


  }).middleware('auth')

}).prefix('/api')