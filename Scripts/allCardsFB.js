const { GraphQLClient, gql } = require("graphql-request");

const CardNumber = gql`
query allCardsFB{
  currentUser{
    cardCounts{
      limited
    }
  }
}
`;

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/federation/graphql", {
    headers:{

    },
  }); 
  const data = await graphQLClient.request(CardNumber, {
  });
  const cards = data["currentUser"]["cardCounts"];
  console.log(cards);
}
 

module.exports.main = main;


main().catch((error) => console.error(error));