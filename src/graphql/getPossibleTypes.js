const fetch = require('cross-fetch');
const fs = require('fs');
const path = require('path');

const getPossibleTypes = () => {
  fetch(`${process.env.GRAPHQL_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GRAPHQL_ACCESS_TOKEN}`,
    },

    body: JSON.stringify({
      variables: {},
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
    }),
  })
    .then((result) => result.json())
    .then((result) => {
      const possibleTypes = {};

      result.data.__schema.types.forEach((supertype) => {
        if (supertype.possibleTypes) {
          possibleTypes[supertype.name] = supertype.possibleTypes.map(
            (subtype) => subtype.name
          );
        }
      });

      fs.writeFile(
        path.resolve(__dirname, 'possibleTypes.json'),
        JSON.stringify(possibleTypes),
        (err) => {
          if (err) {
            console.error('Error writing possibleTypes.json', err);
          } else {
            console.log('Fragment types successfully extracted!');
          }
        }
      );
    });
};

getPossibleTypes();
