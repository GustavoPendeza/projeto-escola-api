import Lesson from 'App/Models/Lesson';
import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public updatedAt: DateTime

  @hasMany(() => Lesson)
  public lesson: HasMany<typeof Lesson>
}
