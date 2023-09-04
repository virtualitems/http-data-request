const fetchData = function(fetchTarget, fetchOptions, transform, loading, done) {

  if (typeof transform !== 'function')
    throw new Error('transform must be a function');

  const process = new Promise((resolve, reject) => {

    let result = fetch(fetchTarget, fetchOptions)
      .catch(error => reject({ step: 'request', error }))

      // on response
      .then(response => {
        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);

        return response;
      })
      .catch(error => reject({ step: 'response', error }))

      // on decode
      .then(response => response.json())
      .catch(error => reject({ step: 'decode', error }))

      // on transform
      .then(rawData => {
        const transformedData = transform(rawData);

        if (transformedData === undefined) {
          throw new Error('transform function must have a return');
        }

        return transformedData;
      })
      .catch(error => reject({ step: 'transform', error }))

      // on resolve
      .then(data => resolve(data));

    // on done
    if (typeof done === 'function')
      result.finally(done);

  });

  // on loading
  if (typeof loading === 'function')
    loading();

  return process;

};


class Post {

  static fromJSON(json) {
    const post = new Post();
    post.id = json.id;
    post.title = json.title;
    post.body = json.body;
    post.userId = json.userId;
    return post;
  }

};


const fetchTarget = 'https://jsonplaceholder.typicode.com/posts/';

const fetchOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
  },
};

const transform = function(rawData) {
  if (!Array.isArray(rawData))
    throw new Error('Response data must be a list');

  return rawData.map(Post.fromJSON);
};

const loading = function() {
  console.log('loading');
};

const done = function() {
  console.log('done');
};

fetchData(fetchTarget, fetchOptions, transform, loading, done)
  .then(console.log)
  .catch(console.error);
