const sendGridClient = require('@sendgrid/client');

/**
 * https://sendgrid.com/docs/API_Reference/api_v3.html#ip-addresses
 * @class IPs
 */
class IPs {
  /**
 * @param {Client} options.sendGridClient
 */
  constructor({ sendGridClient }) {
    this._sendGridClient = sendGridClient;
    this._apiVersionPath = '/v3';
  }

  /**
   * @param {string} apiKey
   */
  setApiKey(apiKey) {
    this._sendGridClient.setApiKey(apiKey);
  }

  /**
   * @param {number} options.count
   * @param {string[]} [options.subusers]
   * @param {boolean} [options.warmup]
   * @returns {Promise.<Object>}
   */
  addIPs({ count, subusers, warmup } = {}) {
    return this._sendGridClient.request({
      method: 'POST',
      url: `/${this._apiVersionPath}/ips`,
      body: {
        count,
        subusers,
        warmup,
      },
    });
  }

  /**
   * @returns {Promise.<Object>}
   */
  getRemainingIPs() {
    return this._sendGridClient.request({
      method: 'GET',
      url: `/${this._apiVersionPath}/ips/remaining`,
    });
  }

  /**
   * @param {string} [options.ip]
   * @param {excludeWhitelabels} [options.excludeWhitelabels]
   * @param {number} [options.limit]
   * @param {number}  [options.offset]
   * @param {string}  [options.subuser]
   * @param {string}  [options.sortByDirection]
   * @returns {Promise.<Object>}
   */
  getAllIPs({ ip, excludeWhitelabels, limit, offset, subuser, sortByDirection } = {}) {
    return this._sendGridClient.request({
      method: 'GET',
      url: `/${this._apiVersionPath}/ips`,
      qs: {
        ip,
        exclude_whitelabels: excludeWhitelabels,
        limit,
        offset,
        subuser,
        sort_by_direction: sortByDirection,
      }
    });
  }

  /**
   * @returns {Promise.<Object>}
   */
  getAllAssignedIPs() {
    return this._sendGridClient.request({
      method: 'GET',
      url: `/${this._apiVersionPath}/ips/assigned`,
    });
  }

  /**
  * @param {string} options.ip
   * @returns {Promise.<Object>}
   */
  getAllIPPools({ ip }) {
    return this._sendGridClient.request({
      method: 'GET',
      url: `/${this._apiVersionPath}/ips/${ip}`,
    });
  }
}

module.exports = new IPs({ sendGridClient });
