const xfetch = function(fetchTarget, fetchOptions) {

  manager = {};

  let onInitializing = null;
  let onLoading = null;
  let onResponse = null;
  let onTransform = null;
  let onData = null;
  let onDone = null;

  manager.initializing = function(callback) {
    onInitializing = callback;
    return this;
  };

  manager.loading = function(callback) {
    onLoading = callback;
    return this;
  };

  manager.response = function(callback) {
    onResponse = callback;
    return this;
  };

  manager.transform = function(callback) {
    onTransform = callback;
    return this;
  };

  manager.data = function(callback) {
    onData = callback;
    return this;
  };

  manager.done = function(callback) {
    onDone = callback;
    return this;
  };

  manager.send = function() {

    if (onInitializing !== null)
      onInitializing();

    const fetchPromise = fetch(fetchTarget, fetchOptions);

    if (onLoading !== null)
      onLoading();

    const responsePromise = fetchPromise.then(onResponse !== null ? onResponse : response => response.json());

    const transformPromise = responsePromise.then(onTransform !== null ? onTransform : rawData => rawData);

    const dataPromise = transformPromise.then(onData !== null ? onData : data => data);

    const donePromise = dataPromise.then(onDone !== null ? onDone : () => {});

    return {
      promises: {
        fetch: fetchPromise,
        response: responsePromise,
        transform: transformPromise,
        data: dataPromise,
        done: donePromise,
      }
    };

  };

  return manager;

};

/// testing ///

const fetchTarget = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchOptions = { method: 'GET', headers: { 'Accept': 'application/json' } };

const request = xfetch(fetchTarget, fetchOptions)
  .initializing(() => console.log('1. initializing'))
  .loading(() => console.log('loading'))
  .response(response => response.json())
  .transform(rawData => rawData)
  .data(data => console.log(data))
  .done(() => console.log('done'))
  .send();

request.promises.fetch.then(() => console.log('2. fetch'));
request.promises.response.then(() => console.log('3. response'));
request.promises.transform.then(() => console.log('4. transform'));
request.promises.data.then(() => console.log('5. data'));
request.promises.done.then(() => console.log('6. done'));
