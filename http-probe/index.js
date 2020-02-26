const lynx = require('lynx');
const axios = require('axios');

const INTERVAL = process.env.TEST_INTERVAL || 1000;
const TEST_URL = process.env.TEST_URL || 'https://avatars3.githubusercontent.com/u/2832232';

const statsBucket = new lynx('localhost', 8125, { prefix: 'http-probe' });

const config = {
  timeout: 1000
};

const axiosGet = (url, options = {}) => {
  const abort = axios.CancelToken.source();
  const id = setTimeout(
    () => abort.cancel(`Timeout of ${config.timeout}ms.`),
    config.timeout
  );
  return axios
    .get(url, { cancelToken: abort.token, ...options })
    .then(response => {
      clearTimeout(id)
      return response
    });
};

async function sample() {
  const start = new Date();
  const result = { start: start.toISOString() };
  try {
    const response = await axiosGet(TEST_URL);
    result.code = response.status;
    result.elapsed = Date.now() - start.valueOf();
    result.length = parseInt(response.headers['content-length']);
    statsBucket.gauge('request.length', result.length);
    statsBucket.timing('request.timing', result.elapsed);
  } catch (e) {
    result.code = 500;
  }
  statsBucket.gauge('request.code', result.code);
  return result;
}

setInterval(async () => {
  const result = await sample();
  console.log(JSON.stringify(result));
}, INTERVAL);
