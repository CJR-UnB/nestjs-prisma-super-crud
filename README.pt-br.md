# @cjr-unb/super-crud
Uma superclasse genérica para NestJS que contém a implementação de um CRUD utilizando o Prisma.

# Instalação
É necessário ter instalado o prisma e executado pelo menos uma migração. Feito isso, instale o pacote:
```
npm i @cjr-unb/super-crud
```
# Como usar
Gere os resources da sua model atraves do nest-cli. Verifique se o novo módulo importa o PrismaModule, que deve conter o PrismaServices.

Primeiramente, é necessário configurar as opções de retorno das operação CRUD. Para isso, no seu arquivo de Services, importe o namespace Prisma, que possui um tipo do formato 'NomeDaModel'.Delegate que recebe RejectOptions. Feito isso, crie um tipo auxilar com o nome de sua model:
```typescript
import { Prisma } from '@prisma/client';
import { RejectOptions } from '@cjr-unb/super-crud';

type UserModel = Prisma.UserDelegate<RejectOptions>;
```
Em seguida obtenha o objeto defaultOptions e a função getCrud
```typescript
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';

type UserModel = Prisma.UserDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<UserModel>().setOptions({});
```
Você pode customizar as opções mudando o argumento de setOption: 
```typescript
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';

type UserModel = Prisma.UserDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<UserModel>().setOptions({
    select: { id: true, name: true, password:false },
});
```
Depois disso, crie sua classe Service injetável que deve extender a superclasse Crud da seguinte forma:
```typescript
import { Injectable } from '@nestjs/common';
import { Crud, CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';

type UserModel = Prisma.UserDelegate<RejectOptions>;
const defaultOptions = new CrudOptions<UserModel>().setOptions({});

@Injectable()
export class UserServices extends getCrud<
    Prisma.UserGetPayload<typeof defaultOptions>
>() {}
```
O parâmetro de tipo da função deve ser o tipo presente no namespace prisma que possui o formato 'NomeDaModel'.GetPayload, que recebe o tipo do objeto defaultOptions

Por fim, adicione o construtor da classe que recebe uma instância do PrismaService. No super, passe como primeiro argumento o prisma.'nomeDaModel' e o objeto defaultOptions como segundo argumento.
```typescript
import { Injectable } from '@nestjs/common';
import { Crud, CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';

type UserModel = Prisma.UserDelegate<RejectOptions>;
const defaultOptions = new CrudOptions<UserModel>().setOptions({});

@Injectable()
export class UserServices extends getCrud<
    Prisma.UserGetPayload<typeof defaultOptions>
>() {
    constructor(protected readonly prisma: PrismaClient) {
        super(prisma.user, defaultOptions);
    }
}
```
E pronto! Agora seu service possui todas as operações CRUD.

Você pode utilizar o defaultOptions e os métodos do super parar criar novos métodos ou reescrever os já existentes. 
# 