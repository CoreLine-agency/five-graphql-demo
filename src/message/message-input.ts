import { Field, InputType } from 'type-graphql';

@InputType()
export class MessageInput {
  @Field()
  public recverId: number;

  @Field()
  public senderId: number;

  @Field()
  public content: string;
}
