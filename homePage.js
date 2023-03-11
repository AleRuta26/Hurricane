const { GraphQLClient, gql } = require("graphql-request");

const AllCardsFromUser = gql`
  query AllCardsFromUser($slug: String!, $cursor: String) {
    user(slug: $slug) {
      paginatedCards(after: $cursor) {
        nodes {
          rarity
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;

const slug = "soraredata";
const rarity = "limited";

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql", {
    headers: {
      'APIKEY': '1a8f2f62c33a59b503229515eb5c81150fa8ed68ad3be4edf2f65dc2a57f2a92afc0447178bdcf8fde1bcd179672f43df338b4ee8a7e74f100edfbfccf0sr128'
    },
  });

  let cursor = null;
  let n = 0;
  let totCards = 0;
  do {
    const data = await graphQLClient.request(AllCardsFromUser, {
      slug,
      cursor,
    });
    const paginatedCards = data["user"]["paginatedCards"];
    paginatedCards["nodes"].forEach((card) => {
        card = JSON.stringify(card);
        card = card.replace('{', '');
        card = card.replace('}', '');
        card = card.replace('"rarity":', '');
        card = card.replace('"', '');
        card = card.replace('"', '');
        console.log(card);
        if (card == "limited"){
            n=n+1;
        }
    });
    totCards = totCards + n;
    cursor = paginatedCards["pageInfo"]["endCursor"];
  } while (cursor != null);
  console.log(totCards)
  return totCards;
}

main().catch((error) => console.error(error));