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
import 'react-native-gesture-handler';
import { createClient } from '@supabase/supabase-js';

const Stack = createNativeStackNavigator();

// change to class component to use component did mout those 
function App() {
  const [session, setSession] = useState(null)
  const client = createClient('https://ldfotgflxcncnaameeig.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZm90Z2ZseGNuY25hYW1lZWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ0ODcyMzEsImV4cCI6MTk3MDA2MzIzMX0.ahVip8dq6j2Pmyso84QAYeM10dsYmhF1zEiSYtnE8kc')

  useEffect(() => {
    const controller = new AbortController();
    setSession(supabaseClient.auth.session())
    console.log("first sess: " + session)
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log("auth change sess: " + session);
      if (_event == 'SIGNED_OUT') console.log('SIGNED_OUT', session, "true / falase", !session)
    })
    return () => controller.abort();

  }, [])




  //holding to make sure give supabase sometimes to get the auth session before render any stack
  // if (loading) return null;

  return (
    <SafeAreaProvider>

      <NavigationContainer>
        {!session ? <AuthScreenStack /> : <Screen key={session.user.id} session={session} />}
      </NavigationContainer>

    </SafeAreaProvider>
  );
}


export default App;