const FetchWizard = function(fetchTarget, fetchOptions, callbacks) {

  // Callbacks
  const onInitializingCallback = typeof callbacks.onInitializing === 'function' ? callbacks.onInitializing : () => {};
  const onRequestCallback = () => fetch(fetchTarget, fetchOptions);
  const onLoadingCallback = typeof callbacks.onLoading === 'function' ? callbacks.onLoading : () => {};
  const onResponseCallback = typeof callbacks.onResponse === 'function' ? callbacks.onResponse : response => response.arrayBuffer();
  const onTransformCallback = typeof callbacks.onTransform === 'function' ? callbacks.onTransform : rawData => rawData;
  const onDataCallback = typeof callbacks.onData === 'function' ? callbacks.onData : data => data;
  const onDoneCallback = typeof callbacks.onDone === 'function' ? callbacks.onDone : () => {};

  // Promises
  this.onInitializing = new Promise(resolve => resolve(onInitializingCallback()));

  this.onRequest = this.onInitializing.then(onRequestCallback);

  this.onLoading = this.onInitializing.then(onLoadingCallback);

  this.onResponse = this.onRequest.then(onResponseCallback);

  this.onTransform = this.onResponse.then(onTransformCallback);

  this.onData = this.onTransform.then(onDataCallback);

  this.onDone = this.onData.then(onDoneCallback);

};


/// testing ///

const fetchTarget = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchOptions = { method: 'GET', headers: { 'Accept': 'application/json' } };

const fwizard = new FetchWizard(fetchTarget, fetchOptions, {
  onInitializing: () => console.log('initializing'),
  onLoading: () => console.log('loading'),
  onResponse: response => {
    console.log('response', response);
    return response.json();
  },
  onTransform: rawData => {
    console.log('transform', rawData);
    return rawData;
  },
  onData: data => console.log('data', data),
  onDone: () => console.log('done'),
});

fwizard.onInitializing.then(() => console.log('1. onInitializing'));
fwizard.onRequest.then(() => console.log('2. onRequest'));
fwizard.onLoading.then(() => console.log('3. onLoading'));
fwizard.onResponse.then(() => console.log('4. onResponse'));
fwizard.onTransform.then(() => console.log('5. onTransform'));
fwizard.onData.then(() => console.log('6. onData'));
fwizard.onDone.then(() => console.log('7. onDone'));
