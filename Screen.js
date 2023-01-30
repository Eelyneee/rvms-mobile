import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, NavigationContainerRefContext } from '@react-navigation/native';
import RHomeScreenStack from './pages/Screens/RHomeScreenStack';
import AuthScreenStack from './pages/Screens/AuthScreenStack';
import SGHomeScreenStack from './pages/Screens/SGHomeScreenStack';
import { supabaseClient, getAccountByID } from './lib/supabase-client';

function Screen({ session }) {

    const [loading, setLoading] = useState(true)
    const [accountType, setAccountType] = useState(null)

    useEffect(() => {
        getAccount();
        console.log("called");
    }, [session])

    useEffect(() => {
        setLoading(false);
        console.log("useEffect acc: " + accountType)
        console.log("loading" + loading)
    }, [accountType])


    const getAccount = async () => {
        try {
            setLoading(true)
            const user = supabaseClient.auth.user()

            let { account, error } = await getAccountByID(user.id)
            if (error) {
                throw error
            }
            console.log("data:" + account)
            if (account) {
                setAccountType(account?.account_type)
                console.log("Account type " + accountType)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            // setLoading(false)
        }
    }

    const loadScreen = () => {
        if (!loading) {
            if (accountType == "resident")
                return <RHomeScreenStack />
            else if (accountType == "security_guard")
                return <SGHomeScreenStack />
        } else {
            <Text>Loading</Text>
        }
    }

    return (
        <>
            {loadScreen()}
        </>
    );


    // if (auth == null || auth == true) {
    //     return <AuthScreenStack />
    // } else {

    //     if (accountType == "resident") {
    //         return <RHomeScreenStack />

    //     } else if (accountType == "security_guard") {
    //         return <SGHomeScreenStack />
    //     }
    // }
}


export default Screen;