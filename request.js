const httpRequest = function(fetchTarget, fetchOptions, handleBeforeSend, handleLoading, handleResponse, handleValidation, handleManipulation, handleError, handleDone) {

  handleBeforeSend();

  let errorFound = false;

  fetch(fetchTarget, fetchOptions)
    .then(fetchResponse => {
      return handleResponse(fetchResponse) || fetchResponse.text();
    })
    .then(fetchData => {
      return handleValidation(fetchData) || fetchData;
    })
    .then(cleanedData => {
      handleManipulation(cleanedData);
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
