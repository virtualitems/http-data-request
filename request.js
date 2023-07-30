const httpRequest = function(fetchTarget, fetchOptions, handleBeforeSend, handleLoading, handleResponse, handleError, handleDone) {

  handleBeforeSend();

  let errorFound = false;

  fetch(fetchTarget, fetchOptions)
    .then(fetchResponse => {
      handleResponse(fetchResponse);
    })
    .catch(fetchError => {
      errorFound = true;
      handleError(fetchError);
    })
    .finally(() => {
      handleDone(errorFound);
    });

  handleLoading();

};
