import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Platform } from "react-native";
import { Box, Center, NativeBaseProvider, Heading, Text, FormControl, Input, ScrollView, VStack, Button, Image, Icon, Select, Checkbox } from "native-base";
import { signOut, signUp } from "../lib/supabase-client";
import * as ImagePicker from "expo-image-picker";
import Constants from 'expo-constants';
import { supabaseClient, getAddress, getHouseUnit } from "../lib/supabase-client"

const Register = ({ navigation }) => {


    const [houseData, setHouseData] = useState([]);
    const [show, setShow] = useState(false);

    const [name, setName] = useState("");
    const [ic, setIC] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [carplate, setCarplate] = useState("");
    const [unitID, setUnitID] = useState("");
    const [address, setAddress] = useState("");
    const [proof, setProof] = useState("");
    const [image, setImage] = useState(null);
    //validation
    const [valName, setValName] = useState("");
    const [valIC, setValIC] = useState("");
    const [valPassword, setValPassword] = useState("");
    const [valEmail, setValEmail] = useState("");
    const [valPhone, setValPhone] = useState("");
    const [valCarplate, setValCarplate] = useState("");
    const [valUID, setValUID] = useState("");
    const [valAddress, setValAddress] = useState("");
    const [valDoc, setValDoc] = useState("");
    const [passPassword, setPassPassword] = useState(false);
    const [passPhone, setPassPhone] = useState(false);
    const [passCarplate, setPassCarplate] = useState(false);
    const [passName, setPassName] = useState(false);
    const [passIC, setPassIC] = useState(false);
    const [passEmail, setPassEmail] = useState(false);
    const [passUID, setPassUID] = useState(false);
    const [passAddress, setPassAddress] = useState(false);
    const [passDoc, setPassDoc] = useState(false);
    const [checked, setChecked] = useState(false);
    const [submit, setSubmit] = useState(0);


    const account_type = "resident";
    const status = "pending";
    // after submit 
    // -> validation -> post to db -> alert -> navigate to login

    const callWelcomePage = () => {
        navigation.navigate('Welcome')
    }

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Registration submitted",
            "Management teams may take up to 24 hours to response your registration. Please email to the management teams if you still cannot access your account after 48 hours.",
            [
                {
                    text: "Ok",
                    onPress: callWelcomePage,
                    style: "default"
                }
            ]
        );

    const handleSelectChange = async (itemValue) => {
        if (itemValue == "0") {
            setShow(!show);
            setUnitID("")
        } else {
            setUnitID(itemValue)
        }
    }

    const handleSignUp = async () => {
        setChecked(true);
        setSubmit(submit + 1);
        var nameReg = /^[a-zA-Z ,.'-]+$/
        var icReg = /^(([[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01]))([0-9]{6})$/
        var emailReg = /^\S+@\S+\.\S+$/
        var phoneReg = /^(6?01){1}(([0145]{1}\d{7,8})|([236789]{1}\d{7}))$/
        var carplateReg = /^([A-Z]{1}|[A-Z]{2}|[A-Z]{3})([0-9]{1}|[0-9]{2}|[0-9]{3}|[0-9]{4})[A-Z]{0,1}$/
        var passwordReg = /^[a-zA-Z0-9@#._-]{8,}$/
        var unitRegex = /^[0-9]*$/
        if (name == "") {
            setPassName(false);
            setValName("Please enter name. ");
        } else if (nameReg.test(name) == false) {
            setPassName(false);
            setValName("Invalid name format. Please enter name in valid format.t");
        } else {
            setPassName(true);
        }

        if (ic == "") {
            setPassIC(false);
            setValIC("Please enter ic.");
        } else if (icReg.test(ic) == false) {
            setPassIC(false);
            setValIC("Invalid ic format. Please enter ic in valid format. ");
        } else {
            setPassIC(true);
        }

        if (email == "") {
            setPassEmail(false);
            setValEmail("Please enter email. ");
        } else if (emailReg.test(email) == false) {
            setPassEmail(false);
            setValEmail("Invalid email format. Please enter email in valid format. ");
        } else {
            setPassEmail(true);
        }

        if (phoneNumber == "") {
            setPassPhone(false);
            setValPhone("!! Please enter a phone number.")
        } else if (phoneReg.test(phoneNumber) == false) {
            setPassPhone(false);
            setValPhone("!! Please enter a phone number with valid format.")
        } else {
            setPassPhone(true);
        }

        if (carplate == "") {
            setPassCarplate(true);
        } else if (carplateReg.test(carplate) == false) {
            setPassCarplate(false);
            setValCarplate("!! Please enter a valid carplate.")
        } else {
            setPassCarplate(true);
        }

        if (password == "") {
            setPassPassword(false);
            setValPassword("!! Please enter password.")
        } else if (passwordReg.test(password) == false) {
            setPassPassword(false);
            setValPassword("!! Please enter the correct format of password.")
        } else {
            setPassPassword(true);
        }

        if (unitID == "") {
            setPassUID(false);
            setValUID("!! Please enter unitID.")
        } else if (unitRegex.test(unitID) == false) {
            setPassUID(false);
            setValUID("!! Please enter valid unitID.")
        }
        else {
            setPassUID(true);
        }

        if (address == "") {
            setPassAddress(false);
            setValAddress("!! Please enter address.")
        } else {
            setPassAddress(true);
        }

        if (image == null) {
            setPassDoc(false);
            setValDoc("!! Please upload a proof.")
        } else {
            setPassDoc(true);
        }

    }
    useEffect(() => {
        (async () => {
            console.log(submit);
            if (passName == true & passIC == true & passEmail == true & passPhone == true & passPassword == true
                & passCarplate == true & passUID == true & passAddress == true & passDoc == true) {
                const { error } = await signUp(email, password, account_type, status, image, name, ic, phoneNumber, carplate, unitID, address);
                if (error) {
                    Alert.alert("Error Sign Up", error.message, [
                        { text: "OK", onPress: () => null },
                    ]);
                } else {
                    createTwoButtonAlert();
                }
            }
        })();
    }, [passName, passIC, passPhone, passEmail, passPassword, passCarplate, passUID, passAddress, passDoc])

    const imagePickerPermission = async () => {
        if (Platform.OS != 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission denied!')
            }
        }
    }

    const loadAllHouses = async () => {
        const { house_unit, error } = await getHouseUnit();
        setHouseData(house_unit);
    }

    const loadUnit = async () => {
        const { house_unit, error } = await getAddress(unitID);
        setAddress(house_unit[0]?.address)
    }


    useEffect(() => {
        imagePickerPermission();
        loadAllHouses();
    }, [])

    useEffect(() => {
        loadUnit();
    }, [unitID])

    const PickerImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true, aspect: [9, 16], quality: 1
            })
            if (!result.cancelled) {
                setImage(result.uri)

                //this is example of image picker from yotube may remove later
                // //get extension
                // const ext = result.uri.substring(result.uri.lastIndexOf(".") + 1);
                // console.log("filename: " + result.uri)
                // // get filename
                // const fileName = result.uri.replace(/^.*[\\\/]/, "");
                // console.log("hello" + fileName)
                // var formData = new FormData();
                // formData.append("files", {
                //     uri: result.uri, name: fileName, type: result.type ? `image/${ext}` : `video/${ext}`,
                // });

                // // upload to supabse bucket
                // const { data, error } = await supabaseClient.storage.from("registration.proof").upload(fileName, formData);

                // //throw error
                // if (error) throw new Error(error.message);

                // //return photo and supabase image data
                // return { ...result, imageData: data }
                return result;
            } else {
                return result;
            }
        } catch (e) {
            // ErrorAlert({ title: "Image Upload", message: e.message })
            console.log(({ title: "Image Upload", message: e.message }))
        }
    }

    return (
        <NativeBaseProvider>
            <ScrollView bg="white" h="100%">
                <Center my="10">
                    <Heading size="md" >Register as Residents</Heading>
                    <Text fontSize="sm" fontWeight="bold" color="gray.500">User Information</Text>
                    <Box safeArea py="4" w="90%" maxW="290">
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>Name</FormControl.Label>
                                <Input placeholder="Please enter your name." value={name} onChangeText={(v) => setName(v)} />
                                <FormControl.HelperText>
                                    Eg: Lim Kwah Ho
                                </FormControl.HelperText>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>IC no.</FormControl.Label>
                                <Input placeholder="Please enter your identification number." value={ic} onChangeText={(v) => setIC(v)} />
                                <FormControl.HelperText>
                                    Eg: 780512086632
                                </FormControl.HelperText>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Phone number</FormControl.Label>
                                <Input placeholder="Please enter your phone number." value={phoneNumber} onChangeText={(v) => setPhoneNumber(v)} />
                                <FormControl.HelperText>
                                    Eg: 0123547895
                                </FormControl.HelperText>
                            </FormControl>
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
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Car plate</FormControl.Label>
                                <Input placeholder="Please enter your carplate number." value={carplate} onChangeText={(v) => setCarplate(v)} />
                                <FormControl.HelperText>
                                    (Optional) Eg: KLS1234
                                </FormControl.HelperText>
                            </FormControl>
                        </VStack>
                    </Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.500" mt="8">House / unit Information</Text>
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <VStack space={3}>
                            {show ?
                                <FormControl>
                                    <FormControl.Label>Unit ID:</FormControl.Label>
                                    <Input placeholder="Please enter your unitID." value={unitID} onChangeText={(v) => setUnitID(v)} />
                                </FormControl>
                                :
                                <FormControl>
                                    <FormControl.Label>Unit ID</FormControl.Label>
                                    <Select
                                        placeholder="Select your unit id"
                                        selectedValue={unitID}
                                        width={"100%"}
                                        onValueChange={handleSelectChange}
                                    >
                                        <Select.Item label={"None"} value="0" />
                                        {
                                            houseData.map((unit) => {
                                                return (
                                                    <Select.Item label={unit?.unit_id} value={unit?.unit_id} key={unit?.unit_id} />
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            }
                            {/* {
                                address && show == false ?
                                    <FormControl>
                                        <FormControl.Label>Address</FormControl.Label>
                                        <Input isReadOnly placeholder="Please enter your address." value={address} onChangeText={(v) => setAddress(v)} />
                                    </FormControl> :
                                    <></>

                            } */}
                            {
                                show == true && address ? <FormControl>
                                    <FormControl.Label>Address</FormControl.Label>
                                    <Input placeholder="Please enter your address." value={address} onChangeText={(v) => setAddress(v)} />
                                </FormControl> : <FormControl>
                                    <FormControl.Label>Address</FormControl.Label>
                                    <Input color="gray.500" placeholder="Please enter your address." value={address} onChangeText={(v) => setAddress(v)} />
                                </FormControl>
                            }

                            <FormControl>
                                <FormControl.Label>Upload supporting document</FormControl.Label>
                                {/* <Input value={proof} onChangeText={(v) => setProof(v)} /> */}
                                <Button bg="#4484FF" onPress={PickerImage}>Choose Image</Button>
                                {image && <Box><Text color="green.400">(Successfully uploaded an image)</Text>
                                    {/* <Image source={{ uri: image }} alt="proof" size="2xl" /> */}
                                </Box>}
                                <FormControl.HelperText>
                                    Eg: Water bill, or electric bill
                                </FormControl.HelperText>
                            </FormControl>
                            {!passName & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valName} </Text> : <></>}
                            {!passIC & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valIC} </Text> : <></>}
                            {!passPhone & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valPhone} </Text> : <></>}
                            {!passEmail & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valEmail} </Text> : <></>}
                            {!passPassword & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valPassword} </Text> : <></>}
                            {!passCarplate & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valCarplate} </Text> : <></>}
                            {!passUID & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valUID} </Text> : <></>}
                            {!passAddress & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valAddress} </Text> : <></>}
                            {!passDoc & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valDoc} </Text> : <></>}
                            <Button bg="#4484FF" onPress={async () => await handleSignUp()} mt="10">Sign Up</Button>
                        </VStack>
                    </Box>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}

export default Register;