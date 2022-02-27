import './App.css';

function App() {

  const client = {
    client_id: '<YOUR-CLIENT-ID>',
    redirect_uris: ['http://localhost:3000/cb'],
    scope: 'openid'
  };
  const domain = '<YOUR-DOMAIN>';
  const region = '<REGION-NAME>';

  const issuer = {
    authorization_endpoint: `https://${domain}.auth.${region}.amazoncognito.com/oauth2/authorize`
  };

  function generateState(len: number) {
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return Array.from(crypto.getRandomValues(new Uint8Array(len))).map((n) => str[n % str.length]).join('')
  };

  function handleAuthorizationRequest() {
    const state = generateState(32);
    localStorage.setItem('oauth-state', state);
    window.location.href = `${issuer.authorization_endpoint}?response_type=token&state=${state}&scope=${client.scope}&client_id=${client.client_id}&redirect_uri=${client.redirect_uris[0]}`
  }

  function handleAuthorizationResponse() {
    const h = window.location.hash.substring(1);
    const params = new URLSearchParams(h);
    const state = params.get('state');
    if (state !== localStorage.getItem('oauth-state')) {
      console.log(`State DOES NOT MATCH: expected ${localStorage.getItem('oauth-state')} got ${state}}`)
    } else {
      console.log(`access_token: ${params.get('access_token')}`);
      console.log(`id_token: ${params.get('id_token')}`);
    }
  }

  return (
    <div className="App">
      <button onClick={handleAuthorizationRequest}>
        Start OAuth flow
      </button>
      <script>
        if (location.hash) {
          handleAuthorizationResponse()
        }
      </script>
    </div>
  );
}

export default App;
