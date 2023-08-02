console.log('1. initializing');

const fetchTarget = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchOptions = { method: 'GET', headers: { 'Accept': 'application/json' } };

console.log('2. requesting');

const fetchPromise = fetch(fetchTarget, fetchOptions);

const responsePromise = fetchPromise.then(response => {
                                console.log('4. response', response);
                                return response.json();
                              });

const transformPromise = responsePromise.then(rawData => {
                          console.log('5. rawData', rawData);
                          const transformedData = rawData;
                          return transformedData;
                        });

const dataPromise = transformPromise.then(data => {
                      console.log('6. data', data);
                    });

const donePromise = dataPromise.then(() => {
                      console.log('7. done');
                    });

console.log('3. loading');
