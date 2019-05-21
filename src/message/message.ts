import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Message {
  @Field()
  public id: number;

  @Field()
  public recverId: number;

  @Field()
  public senderId: number;

  @Field()
  public content: string;
}
