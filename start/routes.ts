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

// ---------------------------ROTAS SEM LOGIN---------------------
Route.group(() => {

  Route.post('/login', 'AuthController.login')


  // ---------------------------ROTAS COM LOGIN------------------------
  Route.group(() => {

    Route.get('/category/list', 'CategoriesController.list')
    Route.get('/lesson/list', 'LessonsController.list')

    Route.post('/logout', 'AuthController.logout')
  
    Route.patch('/profile/update', 'UsersController.profileUpdate')
    Route.patch('/password/update', 'UsersController.passwordUpdate')
    

    // -----------------------------ROTAS DE ADMIN--------------------------
    Route.group(() => {

      Route.get('/user/list', 'UsersController.list')
      Route.get('/teacher/list', 'TeachersController.list')
      Route.get('/enrollment/list', 'EnrollmentsController.list')
      Route.get('/students/list', 'StudentsController.list')

      Route.post('/register', 'AuthController.register')
      Route.post('/category/store', 'CategoriesController.store')
      Route.post('/lesson/store', 'LessonsController.store')
      Route.post('/teacher/store', 'TeachersController.store')

      Route.patch('/category/update/:id', 'CategoriesController.update')
      Route.patch('/lesson/update/:id', 'LessonsController.update')
      Route.patch('/user/update/:id', 'UsersController.userUpdate')
      Route.patch('/user/password/update/:id', 'UsersController.userPasswordUpdate')
      Route.patch('/teacher/update/:id', 'TeachersController.update')
      Route.patch('/enrollment/update/:id', 'EnrollmentsController.update')

      Route.delete('/category/delete/:id', 'CategoriesController.destroy')
      Route.delete('/lesson/delete/:id', 'LessonsController.destroy')
      Route.delete('/teacher/delete/:id', 'TeachersController.destroy')
      Route.delete('/enrollment/delete/:id', 'EnrollmentsController.destroy')

    }).middleware('admin')

    // ---------------------------ROTAS DE TEACHER----------------------------
    Route.group(() => {

      Route.get('/teacher/my-lessons', 'TeachersController.myLessons')
      Route.get('/teacher/my-students', 'TeachersController.myStudents')

    }).middleware('teacher')

    // ----------------------------ROTAS DE STUDENT---------------------------
    Route.group(() => {

      Route.get('/enrollment/my-enrollments', 'StudentsController.myEnrollments')
      
      Route.post('/enrollment/store', 'EnrollmentsController.store')
      
    }).middleware('student')


  }).middleware('auth')

}).prefix('/api')