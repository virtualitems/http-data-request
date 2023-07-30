# Usage

```javascript
httpRequest(
    'https://jsonplaceholder.typicode.com/todos/1',
  {},
  () => console.log('before send'),
  () => console.log('loading'),
  (response) => {
    console.log('response', response);
    return response.json();
  },
  (data) => console.log('validation', data),
  (error) => console.log('error', error),
  (errorFound) => console.log('done', errorFound),
);
```