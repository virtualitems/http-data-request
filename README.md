# Usage

```javascript
httpRequest(
  'https://example.com/',
  {},
  () => console.log('before send'),
  () => console.log('loading'),
  (response) => console.log('response', response),
  (error) => console.log('error', error),
  (errorFound) => console.log('done', errorFound),
);
```