import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, NavigationContainerRefContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RHomeScreenStack from './pages/Screens/RHomeScreenStack';
import AuthScreenStack from './pages/Screens/AuthScreenStack';
import SGHomeScreenStack from './pages/Screens/SGHomeScreenStack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
/*** polyfilles */
/** URL polyfill */
import 'react-native-url-polyfill/auto'
import { supabaseClient, getAccountByID } from './lib/supabase-client';
import Screen from './Screen';

const Stack = createNativeStackNavigator();

// change to class component to use component did mout those 
function App() {
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState("");

  const loadAccount = async () => {
    console.log(accountType);
    if (supabaseClient.auth.user()) {
      const { account, error } = await getAccountByID(supabaseClient.auth.user().id);
      setAccountType(account?.account_type);
      console.log("Aocount type " + accountType)
    } else {
      setAccountType("");
    }
  }

  const loadScreen = () => {

    if (auth == null || auth == true) {
      return <AuthScreenStack />
    } else {

      if (accountType == "resident") {
        return <RHomeScreenStack />

      } else if (accountType == "security_guard") {
        return <SGHomeScreenStack />
      }
    }
  }

  // from tutorial videos
  useEffect(() => {
    setAuth(supabaseClient.auth.session());

    console.log("Session: " + supabaseClient.auth.session())
    setLoading(false);

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      console.log(session);
      setAuth(session);

      if (_event == 'SIGNED_OUT') {
        console.log('SIGNED_OUT', session)
        console.log("signout before set" + accountType)
        setAccountType("");
        console.log("signout set " + accountType)

        // console.log("auth " + auth);
      }
    });

    console.log("session", supabaseClient.auth.session());
  }, []);

  useEffect(() => {
    loadAccount();
    console.log("ue" + accountType)
  }, [auth]);

  useEffect(() => {
    loadScreen();
    console.log("ue2" + accountType)
  }, [accountType])


  //holding to make sure give supabase sometimes to get the auth session before render any stack
  if (loading) return null;

  return (
    <SafeAreaProvider>

      <NavigationContainer>
        {loadScreen()}
        {/* {<Screen auth={auth} accountType={accountType} />} */}
        {console.log("dom auth" + auth)}
        {/* {auth ? <RHomeScreenStack /> : <AuthScreenStack />} */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;