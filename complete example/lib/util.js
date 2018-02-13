const crypto = require('crypto');

exports.filterKeys = function filterKeys(validKeys, obj) {
  return validKeys.reduce((newObj, key) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }

    return newObj;
  }, {});
};

exports.joinKeys = function joinKeys(prefix, keys) {
  return keys.map(key => `${prefix}.${key} AS ${prefix}_${key}`);
};

exports.getRandomToken = function getRandomToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(50, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('base64'));
      }
    });
  });
};

exports.encodeRFC5987ValueChars = function (str) {
  return encodeURIComponent(str).
  // Note that although RFC3986 reserves "!", RFC5987 does not,
  // so we do not need to escape it
  replace(/['()]/g, escape). // i.e., %27 %28 %29
  replace(/\*/g, '%2A').
  // The following are not required for percent-encoding per RFC5987,
  // so we can allow for a little better readability over the wire: |`^
  replace(/%(?:7C|60|5E)/g, unescape);
}