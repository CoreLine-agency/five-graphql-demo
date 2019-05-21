import { Arg, FieldResolver, Mutation, PubSub, Query, Resolver, Root, Subscription, PubSubEngine } from 'type-graphql';
import { Message } from './message';
import { User } from '../user/user';
import { users } from '../user/user-resolvers';
import { MessageInput } from './message-input';

const messages: Message[] = [{
  id: 1,
  senderId: 1,
  recverId: 2,
  content: 'Hello, it is I'
}, {
  id: 2,
  senderId: 2,
  recverId: 1,
  content: 'Yeah, I know'
}];

@Resolver(() => Message)
export class MessageResolvers {
  @Query(() => [Message])
  public messages() {
    return messages;
  }

  @FieldResolver()
  public sender(@Root() message: Message): User {
    const { senderId } = message;

    return users.filter(user => user.id == senderId)[0];
  }

  @Mutation(() => Message)
  public async createMessage(@Arg('input') input: MessageInput, @PubSub() pubSub: PubSubEngine) {
    const { senderId, recverId, content } = input;

    const id = messages.length + 1;

    const message: Message = {
      id, content, recverId, senderId,
    };

    messages.push(message);

    await pubSub.publish('new-message', message);

    return message;
  }

  @Subscription(() => Message, {
    topics: 'new-message',
    filter: (({ payload: message, args }) => message.recverId === args.recverId),
  })
  public newMessageNotification(@Root() message: Message, @Arg('recverId') recverId: number) {
    return message;
  }
}
