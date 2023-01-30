import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Box, Center, NativeBaseProvider, Button, Heading, Text, FormControl, Input, Divider, Link, VStack, HStack } from "native-base";
import { signIn } from "../lib/supabase-client";

const LoginSecurityGuard = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //validation
    const [passEmail, setPassEmail] = useState(false);
    const [passPassword, setPassPassword] = useState(false);
    const [valEmail, setValEmail] = useState("");
    const [valPassword, setValPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [submit, setSubmit] = useState(0);

    const handleLogin = async () => {
        setChecked(true);
        setSubmit(submit + 1);
        var emailReg = /^\S+@\S+\.\S+$/
        var passwordReg = /^[a-zA-Z0-9@#._-]{8,}$/
        if (email == "") {
            setPassEmail(false);
            setValEmail("!! Please enter email address.");
        } else if (emailReg.test(email) == false) {
            setPassEmail(false);
            setValEmail("!! Invalid email format. Please enter correct email format.");
        }
        else {
            setPassEmail(true);
        }

        if (password == "") {
            setPassPassword(false);
            setValPassword("!! Please enter your password")
        } else if (passwordReg.test(password) == false) {
            setPassPassword(false);
            setValPassword("!! Please enter your password in vlaid format.")
        }
        else {
            setPassPassword(true);
        }
        // when valid pass, use useEffect to login
    }
    useEffect(() => {
        (async () => {
            if (passEmail == true && passPassword == true) {
                const { error } = await signIn(email, password);
                if (error) {
                    Alert.alert("Error Signing in", error.message, [
                        { text: "OK", onPress: () => null },
                    ]);
                }
            }
        })();
    }, [submit])


    // login button - validation -> from db -> verify -> navigate to SG home
    return (
        <NativeBaseProvider>
            <Box alignItems="center" justifyContent="center" bg="white" w="100%" h="100%">
                <Heading size="md">Security Guard</Heading>
                <Box safeArea p="2" py="8" width="70%" >
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Email Address</FormControl.Label>

                            <Input placeholder="Please enter your email address." value={email} onChangeText={(v) => setEmail(v)} />
                            <FormControl.HelperText>
                                Eg: aaron@gmail.com
                            </FormControl.HelperText>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>

                            <Input type="password" placeholder="Please enter your password." value={password} onChangeText={(v) => setPassword(v)} />
                            <FormControl.HelperText>
                                ** Password must be more than 8 numbers/letters. (Special case like ._-@# are allowed to use.)**
                            </FormControl.HelperText>
                            <FormControl.HelperText>
                                ** For first time user, your password would be your ic number. **
                            </FormControl.HelperText>
                        </FormControl>
                    </VStack>
                </Box>
                {!passEmail & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valEmail} </Text> : <></>}
                {!passPassword & checked ? <Text Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valPassword}</Text> : <></>}
                <Button bg="#4484FF" w="200px"
                    onPress={handleLogin}
                >Login</Button>
            </Box>
        </NativeBaseProvider>
    );
}

export default LoginSecurityGuard;