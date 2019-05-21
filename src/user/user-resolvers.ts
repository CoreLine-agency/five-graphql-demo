import { Query, FieldResolver, Root, Resolver, Arg, Mutation } from 'type-graphql';

import { User } from './user';
import { UserInput } from './user-input';

export const users: User[] = [{
  id: 1,
  firstName: 'Hello',
  lastName: 'Kitty',
}, {
  id: 2,
  firstName: 'Bond',
  lastName: 'James Bond'
}];

@Resolver(() => User)
export class UserResolvers {
  @Query(() => [User])
  public users() {
    return users;
  }

  @FieldResolver(() => String)
  public fullName(@Root() user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  @Mutation(() => User)
  public createUser(@Arg('input') input: UserInput) {
    const { firstName, lastName } = input;

    const id = users.length + 1;
    const user: User = {
      id, firstName, lastName
    };

    users.push(user);

    return user;
  }

  @Query(() => User)
  public user(@Arg('id') id: number) {
    return users.filter(user => user.id === id)[0];
  }
}
