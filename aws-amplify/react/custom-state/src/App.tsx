import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState<any | null>(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
        case 'customOAuthState':
          console.log('Custom OAuth state', data);
          setCustomState(data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  return (
    <div className="App">
      <button onClick={() => Auth.signOut()}>Sign Out</button>
      <button onClick={() => Auth.federatedSignIn(
        { provider: CognitoHostedUIIdentityProvider.Google, customState: window.location.href }
      )}>Federated Sign In</button>
      <div>{user && user.getUsername()}</div>
      <div>{customState}</div>
    </div>
  );
}

export default App;