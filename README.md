[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/CJR-UnB/nestjs-prisma-super-crud/blob/main/README.pt-br.md)

# @cjr-unb/super-crud
A generic superclass for NestJS that contains the implementation of a CRUD using Prisma.

# Installation
It is necessary to have Prisma installed and at least one migration executed. After that, install the package:
```
npm i @cjr-unb/super-crud
```
# How to use
Generate the resources of your model through the nest-cli. Make sure the new module imports the PrismaModule, which should contain the PrismaServices.

First, it is necessary to configure the return options of the CRUD operations. To do this, in your Services file, import the Prisma namespace, which has a type of the format 'ModelName'. Delegate that receives RejectOptions. After that, create an auxiliary type with the name of your model:
```typescript
import { Prisma } from '@prisma/client';
import { RejectOptions } from '@cjr-unb/super-crud';

type UserModel = Prisma.UserDelegate<RejectOptions>;
```
Then, obtain the defaultOptions object containing the return options of the operations.
```typescript
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';

type UserModel = Prisma.UserDelegate<RejectOptions>;
const defaultOptions = new CrudOptions<UserModel>().setOption({});
```
You can customize the options by changing the setOption argument:
```typescript
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';

type UserModel = Prisma.UserDelegate<RejectOptions>;
const defaultOptions = new CrudOptions<UserModel>().setOption({
  select: { email: true, name: true, password: false },
});
```
After that, create your injectable Service class that should extend the Crud superclass as follows:
```typescript
import { Injectable } from '@nestjs/common';
import { Crud, CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type UserModel = Prisma.UserDelegate<RejectOptions>;
const defaultOptions = new CrudOptions<UserModel>().setOption({});

@Injectable()
export class UsersService extends Crud<
  UserModel,
  Prisma.UserGetPayload<typeof defaultOptions>
> {}
```
The first argument of the Crud class should be the auxiliary type created at the beginning. The second argument should contain the type present in the Prisma namespace that has the following format 'ModelName'.GetPayload, which receives the type of the defaultOptions object

Finally, add the class constructor that receives an instance of PrismaService. In the super, pass as the first argument the prisma.'modelName' and the defaultOptions object as the second argument.
```typescript
import { Injectable } from '@nestjs/common';
import { Crud, CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type UserModel = Prisma.UserDelegate<RejectOptions>;
const defaultOptions = new CrudOptions<UserModel>().setOption({
  select: { email: true, name: true, password: false },
});

@Injectable()
export class UsersService extends Crud<
  UserModel,
  Prisma.UserGetPayload<typeof defaultOptions>
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.user, defaultOptions);
  }
}

```
And that's it! Now your service has all CRUD operations.

You can use the this.defaultOptions and the super methods to create new methods or override existing ones.