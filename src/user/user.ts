import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  public id: number;

  @Field()
  public firstName: string;

  @Field()
  public lastName: string;
}
