import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run () {
    await Category.createMany([
      {
        name: 'Matemática'
      },
      {
        name: 'História'
      },
      {
        name: 'Geografia'
      },
      {
        name: 'Línguas'
      },
      {
        name: 'Ciências'
      },
    ])
  }
}
