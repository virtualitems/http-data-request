const httpRequest = function(fetchTarget, fetchOptions, handleBeforeSend, handleLoading, handleResponse, handleValidation, handleError, handleDone) {

  handleBeforeSend();

  let errorFound = false;

  fetch(fetchTarget, fetchOptions)
    .then(fetchResponse => {
      return handleResponse(fetchResponse) || fetchResponse.text();
    })
    .then(fetchData => {
      handleValidation(fetchData);
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
