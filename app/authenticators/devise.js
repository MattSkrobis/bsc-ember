import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import ENV from 'bsc-ember/config/environment';

export default DeviseAuthenticator.extend({
  serverTokenEndpoint: `${ENV.APP.host}/users/sign_in`
});