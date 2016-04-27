import superagent from 'superagent';
const methods = ['get', 'post', 'put', 'patch', 'del'];

/*
 * This silly underscore is here to avoid a mysterious
 * "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req, formatUrl, _params = {}) {
    methods.forEach((method) => {
      this[method] = (path, { params = {}, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        request.query(_params);
        request.query(params);

        if (data) {
          request.send(data);
        }

        console.log('yuck');

        request.end((err, { body } = {}) => {
          console.log('response', err, body);

          if (err) {
            reject(body || err);
          } else {
            resolve(body);
          }
        });
      });
    });
  }
}

const ApiClient = _ApiClient;
export default ApiClient;
