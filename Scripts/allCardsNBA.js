const { GraphQLClient, gql } = require("graphql-request");

const CardNumber = gql`
query allCardsNBA{
  currentUser{
   	nbaCardCounts{
      limitedCount
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
  const cards = data["currentUser"]["nbaCardCounts"];
  console.log(cards);
}

module.exports.main=main;
main().catch((error) => console.error(error));