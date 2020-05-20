const { GraphQLServer } = require('graphql-yoga');


let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (id) => Link,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let linkToUpdate = links.find(link => link.id === args.id);
      linkToUpdate.id = args.id;
      linkToUpdate.description = args.description;
      linkToUpdate.url = args.url;
      return linkToUpdate;
    },
    deleteLink: (parent, args) => {
      let removeLink = links.find(link => link.id === args.id);
      links = links.filter(link => link !== removeLink);
      return removeLink;
    }
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log('Server is running on http://localhost:4000'));