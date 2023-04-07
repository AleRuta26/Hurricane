const { GraphQLClient, gql } = require("graphql-request");

const AllCardsFromUser = gql`
  query AllCardsFromUser($slug: String!, $cursor: String) {
    user(slug: $slug) {
      paginatedCards(after: $cursor) {
        nodes {
          slug
          userOwnersWithRate {
            from
            price
          }
        }
        pageInfo {
          endCursor
        }
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

  let cursor = null;
  let n = 0;
  do {
    const data = await graphQLClient.request(AllCardsFromUser, {
      slug,
      cursor,
    });
    const paginatedCards = data["user"]["paginatedCards"];
    paginatedCards["nodes"].forEach((card) => {
        n=n+1;
    });
    cursor = paginatedCards["pageInfo"]["endCursor"];
  } while (cursor != null);
 
}


main().catch((error) => console.error(error));