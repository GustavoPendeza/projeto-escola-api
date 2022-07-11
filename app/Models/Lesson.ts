import Category from 'App/Models/Category';
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher';
import Enrollment from './Enrollment';

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public categoryId: number
  
  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public updatedAt: DateTime

  @hasMany(() => Teacher)
  public teacher: HasMany<typeof Teacher>

  @hasMany(() => Enrollment)
  public enrollment: HasMany<typeof Enrollment>
}
