const { GraphQLClient, gql } = require("graphql-request");

const CardNumber = gql`
query CardNumber($slug: String!) {
  user(slug: $slug) {
   cardCounts{
    limited
  }
  }
}
`;

const slug = "xaloc";


async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql", {
    headers: {
      'APIKEY': '1a8f2f62c33a59b503229515eb5c81150fa8ed68ad3be4edf2f65dc2a57f2a92afc0447178bdcf8fde1bcd179672f43df338b4ee8a7e74f100edfbfccf0sr128'
    },
  });


 
  const data = await graphQLClient.request(CardNumber, {
    slug
  });
  const cardCounts = data["user"]["cardCounts"];
  var cardNumber;
  cardNumber = JSON.stringify(cardCounts);
  cardNumber = cardNumber.replace('{', '');
  cardNumber = cardNumber.replace('}', '');
  cardNumber = cardNumber.replace('limited', '');
  cardNumber = cardNumber.replace(':', '');
  cardNumber = cardNumber.replace('"', '');
  cardNumber = cardNumber.replace('"', '');
  cardNumber= parseInt(cardNumber);
  console.log(cardNumber);
}

main().catch((error) => console.error(error));