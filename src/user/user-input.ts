import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  public firstName: string;

  @Field()
  public lastName: string;
}
