## ProjetoEscolaAPI

Fiz esse projeto para estudar sobre API em AdonisJS.

## Sobre

É uma API para cadastro de alunos e professores em suas matérias.

Tenha em mente que o "Admin" seria a coordenação da escola, que tem acesso à maioria das coisas e que controla basicamente tudo.

## Preparação de ambiente

Instale as dependências utilizando o comando:

```bash
npm install
```

Crie um banco de dados e em seguida rode as migrations com o comando: 

```bash
node ace migration:run
```

Para utilizar um servidor de teste do projeto é só usar o comando: 

```bash
node ace serve --watch
```

Se quiser já ter dados em seu banco de dados, pode utilizar o comando: 

```bash
# Para saber o que será cadastrado é só ir em 'database/seeders/'
node ace db:seed
```

## Classes

- User (Defini o nível de acesso nele mesmo(access), sendo eles 0 aluno, 1 professor e 2 admin)

- Category (Seriam as categorias de matérias, como por exemplo: Química se encaixa na categoria de Ciências)

- Lesson (Seriam as matérias, como por exemplo: Química, Física e Biologia)

- Teacher (Usuários com nível de acesso de professor podem ser cadastrados em matérias, como professores daquela matéria)

- Enrollment (Seriam as matrículas. Os usuários com nível de acesso de aluno podem se matrícular em em no máximo 4 matérias num período de 3 meses da primeira matrícula, após esse tempo, eles podem se matrícular em mais matérias)

## Rotas

Eu gosto de separar as rotas por pastas para deixar mais organizado, então também separei aqui para melhor vizualização.

### Login

```bash
http://127.0.0.1:3333/api/login
```

### Rotas com login sem limitação por acesso (qualquer usuário pode acessar)

GET:

```bash
# Listagem de categorias
http://127.0.0.1:3333/api/category/list
```

```bash
# Listagem de matérias
http://127.0.0.1:3333/api/lesson/list
```

PATCH:

```bash
# Alterar perfil do usuário autenticado (Mudar nome e e-mail)
http://127.0.0.1:3333/api/profile/update
```

```bash
# Alterar senha do usuário autenticado
http://127.0.0.1:3333/api/password/update
```

### Rotas de Admin
Auth ----------------------------------------------------------

POST:

```bash
# Cadastro de usuário
http://127.0.0.1:3333/api/register
```

Categories ----------------------------------------------------

POST:

```bash
# Cadastro de categoria
http://127.0.0.1:3333/api/category/store
```

PATCH:

```bash
# Altera uma categoria
http://127.0.0.1:3333/api/category/update/:id
```

DELETE:

```bash
# Deleta uma categoria
http://127.0.0.1:3333/api/category/delete/:id
```

Lessons -------------------------------------------------------

POST:

```bash
# Cadastro de matérias
http://127.0.0.1:3333/api/lesson/store
```

PATCH:

```bash
# Altera uma matéria
http://127.0.0.1:3333/api/lesson/update/:id
```

DELETE:

```bash
# Deleta uma matéria
http://127.0.0.1:3333/api/lesson/delete/:id
```

Enrollments ----------------------------------------------------

GET:

```bash
# Listagem de matrículas
http://127.0.0.1:3333/api/enrollment/list
```

PATCH:

```bash
# Altera uma matéria
http://127.0.0.1:3333/api/enrollment/update/:id
```

DELETE:

```bash
# Deleta uma matéria
http://127.0.0.1:3333/api/enrollment/delete/:id
```

Students (usuários com accesso de aluno) ------------------

GET:

```bash
# Listagem de alunos
http://127.0.0.1:3333/api/students/list
```

Teacher --------------------------------------------------------

GET:

```bash
# Listagem de professores cadastrados em matérias
http://127.0.0.1:3333/api/teacher/list
```

POST:

```bash
# Cadastro de professores em matérias
http://127.0.0.1:3333/api/teacher/store
```

PATCH:

```bash
# Alterar um professor e/ou a matéria
http://127.0.0.1:3333/api/teacher/update/:id
```

DELETE:

```bash
# Deletar um professor cadastrado em uma matéria
http://127.0.0.1:3333/api/teacher/delete/:id
```

User ----------------------------------------------------------

GET:

```bash
# Listagem de todos os usuários
http://127.0.0.1:3333/api/user/list
```

PATCH:

```bash
# Altera o perfil de um usuário (nome e e-mail)
http://127.0.0.1:3333/api/user/update/:id
```

```bash
# Altera a senha de um usuário
http://127.0.0.1:3333/api/user/password/update/:id
```

### Rotas de Teacher

GET:

```bash
# Listagem de matérias em que o professor está cadastrado
http://127.0.0.1:3333/api/teacher/my-lessons
```

```bash
# Listagem dos alunos cadastrados nas matérias desse professor
http://127.0.0.1:3333/api/teacher/my-students
```

### Rotas de Student (usuários com acesso de aluno)

GET:

```bash
# Listagem das matrículas do aluno
http://127.0.0.1:3333/api/enrollment/my-enrollments
```

POST:

```bash
# Cadastro da matrícula em uma matéria
http://127.0.0.1:3333/api/enrollment/store
```