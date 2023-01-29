
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
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOWI0OWFkZC01ZWRkLTQzZDEtYThlOS00ZWJhODllZjQyZDYiLCJzY3AiOiJ1c2VyIiwiYXVkIjoiSHVycmljYW5lIiwiaWF0IjoxNjc0OTk3MTEzLCJleHAiOiIxNjc3NTg5MTEzIiwianRpIjoiMWU0NjVhZGItMzVjOS00NTM5LWFlNjMtNTJkMmMxMzc2ZDI4In0.z2Lwvs5QSvdORhyIhX6FnacAZ2Lwhv0PE1PAo7d7kHw`,
      'APIKEY': '1a8f2f62c33a59b503229515eb5c81150fa8ed68ad3be4edf2f65dc2a57f2a92afc0447178bdcf8fde1bcd179672f43df338b4ee8a7e74f100edfbfccf0sr128'
    },
  });

  let cursor = null;
  do {
    console.log("Page starting from cursor", cursor);
    const data = await graphQLClient.request(AllCardsFromUser, {
      slug,
      cursor,
    });
    const paginatedCards = data["user"]["paginatedCards"];
    paginatedCards["nodes"].forEach((card) => {
      console.log(card);
    });
    cursor = paginatedCards["pageInfo"]["endCursor"];
  } while (cursor != null);
}

main().catch((error) => console.error(error));