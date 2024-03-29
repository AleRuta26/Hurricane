const { GraphQLClient, gql } = require("graphql-request");

const totETH = gql`
query totETH{
  currentUser{
   	availableBalance
  }
}
`;

var ETH;

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/federation/graphql", {
    headers: {
    },
  });
  const data = await graphQLClient.request(totETH, {
  });
  ETH = data["currentUser"];
  console.log(ETH);
}


main().catch((error) => console.error(error));
