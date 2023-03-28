import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import CryptoAPI  from './datasources/CryptoAPI.js';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data. 

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }
 
  type Author {
    name: String,
  }

  type Cat {
    name: String,
    breed: String,
    coat: String
  }

  type Currency {
    code: String,
    symbol: String,
    rate: String,
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    cats: [Cat]
    currencies: [Currency]
  }
`; 

const books = [
    {
      title: 'The Awakening',
      author: {
        name: 'Kate Chopin',
      },
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  const cats = [
    {
        name: "george",
        breed: "american shorthair",
        coat: "short",
    },
    {
        name: "Bill",
        breed: "British shorthair",
        coat: null,
    },
  ]

  // Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
      cats: () => cats,
      currencies: () => {
        const API = new CryptoAPI()
        return API.getCurrencyPrices()
      }
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);  