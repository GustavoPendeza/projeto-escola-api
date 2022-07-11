import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Lesson from 'App/Models/Lesson'

export default class LessonSeeder extends BaseSeeder {
  public async run () {
    await Lesson.createMany([
      {
        name: 'Química',
        description: 'Química é a ciência que estuda a composição, estrutura, propriedades da matéria, as mudanças sofridas por ela durante as reações químicas e sua relação com a energia.',
        categoryId: 5
      },
      {
        name: 'Física',
        description: 'A Física é o campo da ciência que investiga os fenômenos e as estruturas mais fundamentais da natureza, procurando sua compreensão e descrição em termos de leis mais gerais possíveis.',
        categoryId: 5
      },
      {
        name: 'Biologia',
        description: 'Biologia é uma ciência que estuda a vida em seus mais variados aspectos, importando-se em compreender, por exemplo, o funcionamento dos organismos vivos, a relação desses seres com o meio e seu processo de evolução.',
        categoryId: 5
      },
      {
        name: 'Inglês',
        description: 'Inglês é a língua da comunicação mundial. O domínio do idioma significa crescimento, desenvolvimento e, acima de tudo, melhores condições para acompanhar as rápidas mudanças que têm vindo a ocorrer.',
        categoryId: 4
      },
      {
        name: 'Álgebra',
        description: 'A álgebra está inclusa nos ramos da matemática e se direciona ao estudo de ideia de variável de um número em um conjunto de regras definidas por expressões algébricas.',
        categoryId: 1
      },
      {
        name: 'História do mundo',
        description: 'A história do mundo busca padrões comuns que surgem em todas as culturas. Os historiadores do mundo usam uma abordagem temática, com dois pontos focais principais: integração (como os processos da história do mundo atraíram as pessoas do mundo) e diferença (como os padrões da história do mundo revelam a diversidade de experiências humano).',
        categoryId: 2
      },
    ])
  }
}
