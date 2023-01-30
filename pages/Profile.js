import React, { useState, useEffect } from "react";
import { Box, Center, NativeBaseProvider, Heading, Avatar, Text, FormControl, Input, VStack, ScrollView, Button, Pressable } from "native-base";
import { Alert } from "react-native";
import { getAccountByID, getResidentByID, resetPassword, supabaseClient, updateProfile, signOut } from "../lib/supabase-client";

const Profile = ({ navigation }) => {

    const resident_id = supabaseClient.auth.user().id;
    const [accountData, setAccountData] = useState({});
    const [residentData, setResidentData] = useState([]);
    const [name, setName] = useState("");
    const [ic, setIC] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [carplate, setCarplate] = useState("");
    const [password, setPassword] = useState("");
    //validation
    const [valPassword, setValPassword] = useState("");
    const [valPhone, setValPhone] = useState("");
    const [valCarplate, setValCarplate] = useState("");
    const [passPassword, setPassPassword] = useState(false);
    const [passPhone, setPassPhone] = useState(false);
    const [passCarplate, setPassCarplate] = useState(false);

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [submit1, setSubmit1] = useState(0);

    const loadAccount = async () => {
        const { account, error } = await getAccountByID(resident_id);
        setAccountData(account);
    }
    const loadResident = async () => {
        const { resident, error } = await getResidentByID(resident_id);
        setResidentData(resident);
        setName(resident?.name);
        setIC(resident?.ic);
        setPhoneNo(resident?.phone_no);
        setCarplate(resident?.carplate);

    }

    // load from db -> edit -> update

    useEffect(() => {
        const controller = new AbortController();
        loadAccount();
        loadResident();
        return () => controller.abort();
    }, [])

    const handleSubmit = async () => {
        // need more validation
        setChecked2(true);
        setSubmit1(submit1 + 1);
        var phoneReg = /^(6?01){1}(([0145]{1}\d{7,8})|([236789]{1}\d{7}))$/
        var carplateReg = /^([A-Z]{1}|[A-Z]{2}|[A-Z]{3})([0-9]{1}|[0-9]{2}|[0-9]{3}|[0-9]{4})[A-Z]{0,1}$/
        if (phoneNo == "") {
            setPassPhone(false);
            setValPhone("!! Please enter a phone number.")
        } else if (phoneReg.test(phoneNo) == false) {
            setPassPhone(false);
            setValPhone("!! Please enter a phone number with valid format.")
        } else {
            setPassPhone(true);
        }

        if (carplate == "") {
            setPassCarplate(true);
        } else if (carplateReg.test(carplate) == true) {
            setPassCarplate(true);
        } else {
            setPassCarplate(false);
            setValCarplate("!! Please enter a valid carplate.")
        }

    }

    useEffect(() => {
        (async () => {
            if (passPhone == true & passCarplate == true) {
                const { error } = await updateProfile(resident_id, phoneNo, carplate);
                if (error) {
                    Alert.alert("Error Editing Profile, " + error.message, [{ text: 'OK', onPress: () => null }]);
                }
                else {
                    Alert.alert("Updated profile", "Your profile is updated.", [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate('HomeTab')
                            }
                        },
                    ])
                }
            }

        })();
    }, [submit1])

    const handlePassword = async () => {
        setChecked1(true);
        var passwordReg = /^[a-zA-Z0-9@#._-]{8,}$/
        if (password != "") {
            if (passwordReg.test(password) == true) {
                setPassPassword(true);

                const { error } = await resetPassword(password);
                if (error) {
                    Alert.alert("Error update password, " + error.message, [{ text: 'OK', onPress: () => null }]);
                }
                else {
                    Alert.alert("Updated password", "Your password is updated.You will required to log out and log in again", [
                        {
                            text: "Logout",
                            onPress: async () => {
                                await supabaseClient.auth.signOut();
                                navigation.navigate('Welcome')
                            }
                        },
                    ])
                }
            } else {
                setPassPassword(false);
                setValPassword("Please enter the correct format of password.")
            }
        }
    }

    return (
        <NativeBaseProvider>
            <ScrollView h="100%" bg="white">
                <Center>
                    <Box safeArea py="8" w="100%" px="20" bg="white">
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>Name</FormControl.Label>
                                <Input placeholder={residentData?.name} value={name} onChangeText={(v) => setName(v)} isReadOnly />
                                <FormControl.HelperText>
                                    Eg: Lim Kwah Ho
                                </FormControl.HelperText>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>IC no.</FormControl.Label>
                                <Input type="number" placeholder={`${residentData?.ic}`} value={`${ic}`} onChangeText={(v) => setIC(v)} isReadOnly />
                                <FormControl.HelperText>
                                    Eg: 780512086632
                                </FormControl.HelperText>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Phone number</FormControl.Label>
                                <Input type="number" placeholder={`${residentData?.phone_no}`} value={`${phoneNo}`} onChangeText={(v) => setPhoneNo(v)} />
                                <FormControl.HelperText>
                                    Eg: 60123547895
                                </FormControl.HelperText>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Car plate</FormControl.Label>
                                <Input placeholder={residentData?.carplate} value={carplate} onChangeText={(v) => setCarplate(v)} />
                                <FormControl.HelperText>
                                    Eg: KLS1234
                                </FormControl.HelperText>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input type="number" placeholder={`Please enter your new password`} value={password} onChangeText={(v) => setPassword(v)} />
                                <FormControl.HelperText>
                                    ** Password must be more than 8 numbers/letters. (Special case like ._-@# are allowed to use.)
                                </FormControl.HelperText>
                            </FormControl>
                            {!passPassword & checked1 ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valPassword} </Text> : <></>}
                            {password != "" && <Button mt={4} bg="#4484FF" onPress={handlePassword}>Edit Password</Button>}
                            {!passPhone & checked2 ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valPhone} </Text> : <></>}
                            {!passCarplate & checked2 ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valCarplate} </Text> : <></>}
                            <Button mt={4} bg="#4484FF" onPress={handleSubmit}>Edit Profile</Button>
                            <Button mt={4} bg="#4484FF" onPress={async () => await signOut()}>Sign Out</Button>
                        </VStack>
                    </Box>
                </Center>
            </ScrollView>
        </NativeBaseProvider>);
}

export default Profile;