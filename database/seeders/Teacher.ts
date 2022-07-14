import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Teacher from 'App/Models/Teacher'

export default class TeacherSeeder extends BaseSeeder {
  public async run () {
    await Teacher.createMany([
      {
        userId: 2,
        lessonId: 1
      },
      {
        userId: 2,
        lessonId: 2
      },
      {
        userId: 2,
        lessonId: 3
      },
    ])
  }
}
