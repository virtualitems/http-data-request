/**
 * @param {RequestInfo | URL} fetchTarget
 * @param {RequestInit} fetchOptions
 * @param {Object} processOptions
 * @param {Function} processOptions.onResponse
 * @param {Function} processOptions.onTransform
 * @param {Function} processOptions.onLoading
 * @returns {Promise}
 */
const httpDataRequest = function(fetchTarget, fetchOptions=null, processOptions=null) {

  if (!fetchTarget)
    throw new Error('Target is not defined');

  let responseCallback, transformCallback, loadingCallback;

  if (processOptions) {

    if (processOptions.onResponse)
      if (typeof processOptions.onResponse === 'function')
        responseCallback = processOptions.onResponse;
      else
        throw new Error('Invalid onResponse callback');

    if (processOptions.onTransform)
      if (typeof processOptions.onTransform === 'function')
        transformCallback = processOptions.onTransform;
      else
        throw new Error('Invalid onTransform callback');

    if (processOptions.onLoading)
      if (typeof processOptions.onLoading === 'function')
        loadingCallback = processOptions.onLoading;
      else
        throw new Error('Invalid onLoading callback');

  }

  if (!responseCallback)
    responseCallback = response => response.text();

  if (!transformCallback)
    transformCallback = rawData => rawData;

  const process = new Promise((resolve, reject) => {

    fetch(fetchTarget, fetchOptions)
      .catch(error => reject({
        step: 'request',
        error,
      }))

      .then(responseCallback)
      .catch(error => reject({
        step: 'response',
        error,
      }))

      .then(transformCallback)
      .catch(error => reject({
        step: 'transform',
        error,
      }))

      .then(data => resolve(data))
      .catch(error => reject({
        step: 'resolve',
        error,
      }));

  });

  if (loadingCallback)
    loadingCallback();

  return process;
};
