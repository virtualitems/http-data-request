# Usage

```javascript
const request = httpDataRequest(
    'https://jsonplaceholder.typicode.com/todos/1',
  {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  },
  {
    onResponse: (response) => {
      console.log('parse', response);
      return response.json();
    },
    onTransform: (data) => {
      console.log('transform', data);
      return data;
    },
    onLoading: () => console.log('loading'),
  }
);

request
  .then((data) => console.log('data', data))
  .catch((error) => console.error('error', error))
  .finally(() => console.log('done'));
```