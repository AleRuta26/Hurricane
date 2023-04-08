const { GraphQLClient, gql } = require("graphql-request");

const totETH = gql`
mutation TotalETH($input: signInInput!){
    signIn(input: $input) {
      currentUser {
        availableBalance
      }
  }
  }
`;
const input = {
    "email" : "xaloc.ventus@proton.me",
    "password" : "$2a$11$zh0JOQd4ugiJa/4ROvNWFuWRLfMHCcJPX0.QyJZpi3TyDan81SL8m"
}


async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql", {
    headers: {
      'APIKEY': '1a8f2f62c33a59b503229515eb5c81150fa8ed68ad3be4edf2f65dc2a57f2a92afc0447178bdcf8fde1bcd179672f43df338b4ee8a7e74f100edfbfccf0sr128'
    },
  });


 
  const data = await graphQLClient.request(totETH, {
    input
  });
  const currentUser = data["signIn"]["currentUser"];
  
  console.log(currentUser);
  var n = JSON.stringify(currentUser);
  n = n.replace('{', '');
  n = n.replace('}', '');
  n = n.replace('"', '');
  n = n.replace('"', '');
  n = n.replace('availableBalance', '');
  n = n.replace(':', '');
  n = n.replace('"', '');
  n = n.replace('"', '');
  n = parseInt(n);
  
  
  n = n/1000000000000000000;
  
  console.log(n);
  
}



main().catch((error) => console.error(error));