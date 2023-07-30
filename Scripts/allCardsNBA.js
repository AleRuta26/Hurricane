const { GraphQLClient, gql } = require("graphql-request");

const CardNumber = gql`
query CardNumber {
    currentSportsUser{
      nbaCardCounts{
        limitedCount
      }
    }
  }
`;
const tipo = 'limited'; //modificare per cambiare tipo di carta


var cardNumber;

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/sports/graphql", {
    
  });


 
  const data = await graphQLClient.request(CardNumber, {
  });
  const cardCounts = data["user"]["currentSportsUser"];
  cleanup(cardCounts);
}

function cleanup(cardCounts){
  
  console.log(cardNumber);
}

main().catch((error) => console.error(error));