import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import path from 'path';

const { PORT = 3000 } = process.env;

(async () => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, '../**/*resolvers.ts')],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
})();
