import config from '../config';
import axios from '../utils/axios';

/**
 * Exchange code for an access token.
 *
 * @param {string} code
 * @returns {Object}
 */
export async function getAccessToken(code) {
  const { accessTokenURL, clientID, clientSecret } = config.github;

  const { data } = await axios.post(accessTokenURL, null, {
    params: {
      client_id: clientID,
      client_secret: clientSecret,
      code,
    },
  });

  return data;
}

/**
 * Exchange code for a github profile.
 *
 * @param {string} code
 * @returns {Object}
 */
export async function getProfile(code) {
  const { access_token } = await getAccessToken(code);

  const { userURL } = config.github;

  const { data } = await axios.get(userURL, {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  return data;
}
