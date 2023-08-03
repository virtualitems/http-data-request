const FetchWizard = function(fetchTarget, fetchOptions) {

  // Fetch
  this.fetchTarget = fetchTarget;
  this.fetchOptions = fetchOptions;

  // Callbacks
  this.onInitializingCallback = null;
  this.onLoadingCallback = null;
  this.onResponseCallback = null;
  this.onTransformCallback = null;
  this.onDataCallback = null;
  this.onDoneCallback = null;

  // Promises
  this.onInitializing = null;
  this.onLoading = null;
  this.onResponse = null;
  this.onTransform = null;
  this.onData = null;
  this.onDone = null;

};

FetchWizard.prototype.initializing = function(callback) {
  this.onInitializingCallback = callback;
  return this;
};

FetchWizard.prototype.loading = function(callback) {
  this.onLoadingCallback = callback;
  return this;
};

FetchWizard.prototype.response = function(callback) {
  this.onResponseCallback = callback;
  return this;
};

FetchWizard.prototype.transform = function(callback) {
  this.onTransformCallback = callback;
  return this;
};

FetchWizard.prototype.data = function(callback) {
  this.onDataCallback = callback;
  return this;
};

FetchWizard.prototype.done = function(callback) {
  this.onDoneCallback = callback;
  return this;
};

FetchWizard.prototype.send = function() {

  if (this.onInitializingCallback !== null)
    this.onInitializingCallback();

  const fetchPromise = fetch(this.fetchTarget, this.fetchOptions);

  if (this.onLoadingCallback !== null)
    this.onLoadingCallback();

  this.onResponse = fetchPromise.then(this.onResponseCallback !== null ? this.onResponseCallback : response => response.arrayBuffer());

  this.onTransform = this.onResponse.then(this.onTransformCallback !== null ? this.onTransformCallback : rawData => rawData);

  this.onData = this.onTransform.then(this.onDataCallback !== null ? this.onDataCallback : data => data);

  this.onDone = this.onData.then(this.onDoneCallback !== null ? this.onDoneCallback : () => {});

};
