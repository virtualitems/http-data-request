// wrapper function
function xfetch(fetchTarget, fetchOptions) {

  // intructions before starting
  console.log('initializing')

  // wrapper promise
  return new Promise((greatResolve, greatReject) => {

    // send request
    const onRequest = fetch(fetchTarget, fetchOptions);

    // the response was received
    const onResponse = onRequest.then(response => {
      console.log('response', response);
      return response.json();
    });

    // the response was decoded
    const onTransform = onResponse.then(rawData => {
      console.log('transform', rawData);
      return rawData;
    });

    // the data was validated and transformed
    const onData = onTransform.then(data => {
      console.log('data', data);
      greatResolve(data);
    });

    // instructions after finishing
    const onDone = onData.then(() => {
      console.log('done');
    });

    // if something goes wrong
    const handleError = error => {
      console.warn('error', error);
      greatReject(error);
    };

    onRequest.catch(handleError);
    onResponse.catch(handleError);
    onTransform.catch(handleError);
    onData.catch(handleError);
    onDone.catch(handleError);

    // the fetch was sent
    console.log('loading');

  });  // new Promise

};  // xfetch


/// testing ///

const fetchTarget = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

xfetch(fetchTarget, fetchOptions)
  .then(data => console.log('from outside: ', data))
  .catch(error => console.warn('from outside: ', error));
