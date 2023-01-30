import React, { useEffect, useState } from "react";
import { Box, Center, NativeBaseProvider, Heading, Image, Button } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { getAccountByID, supabaseClient } from "../lib/supabase-client";
const VerifiedVisitation = ({ navigation }) => {

    const [accountType, setAccountType] = useState("");
    var account_id;
    if (supabaseClient.auth.user() != undefined) {
        account_id = supabaseClient.auth.user()?.id;

    }
    // check account type then assign button
    const loadAccount = async () => {
        if (account_id != undefined) {
            const { account, error } = await getAccountByID(account_id);
            if (!error) {
                setAccountType(account?.account_type);
            }
        }
    }
    useEffect(() => {
        loadAccount();
    }, [])
    return (
        <NativeBaseProvider>
            <Center height="100%" bg="white">
                <AntDesign name="checkcircle" size={50} color="green" />
                <Heading mt="10">Visitations is verified.</Heading>
                <Heading my="5">Thank you.</Heading>
                {
                    accountType == "security_guard" ? <Button bg="#4484FF" onPress={() => { navigation.navigate('HomeSG') }}>Back to Home Screen</Button> :
                        <Button onPress={() => { navigation.navigate('Welcome') }}>Back</Button>
                }

            </Center>
        </NativeBaseProvider>);
}

export default VerifiedVisitation;