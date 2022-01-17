const { Client } = require('@elastic/elasticsearch')

module.exports.esSearchBooks = (title, author, isbn) => {
  const client = new Client({ node: process.env.ES_URI })
  let matchQueries = [];

  if (title) {
    matchQueries.push({
      match: {
        title: {
          query: title,
          operator: "AND",
        }
      }
    });
  }

  if (author) {
    matchQueries.push({
      match: {
        authorName: {
          query: author,
          operator: "AND",
        }
      }
    });
  }

  if (isbn) {
    matchQueries.push({
      match: {
        isbn: {
          query: isbn,
          operator: "AND",
        }
      }
    });
  }

  return new Promise((resolve, reject) => {
    console.log(matchQueries)

    client.search({
      index: 'librarydb_books',
      body: {
        query: {
          bool: {
            must: matchQueries
          }
        }
      }
    }, (err, result) => {
      if (err) reject(err);
      if (result) resolve(result.body.hits.hits);
    })
  });
}