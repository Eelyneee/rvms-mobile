import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Box, Center, NativeBaseProvider, FormControl, Input, Select, Button, Text, VStack, TextArea } from "native-base";
import { saveFeedback, supabaseClient, getResidentByID } from "../lib/supabase-client";
import { capitalizeFirstLetter } from "../lib/functions";

const NewFeedback = ({ navigation }) => {
    let [category, setCategory] = useState('');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // validation
    const [valTitle, setValTitle] = useState("");
    const [valDesc, setValDesc] = useState("");
    const [valCat, setValCat] = useState("");
    const [passTitle, setPassTitle] = useState(false);
    const [passDesc, setPassDesc] = useState(false);
    const [checked, setChecked] = useState(false);
    const [passCat, setPassCat] = useState(false);
    const [submit, setSubmit] = useState(0);

    let resident_id = supabaseClient.auth.user().id;
    let status = "pending"


    // read from input -> load to db -> navigate to feedback
    const handleAddFeedback = async () => {
        setChecked(true);
        setSubmit(submit + 1);
        if (title == "") {
            setPassTitle(false);
            setValTitle("!! Please enter feedback title.");
        } else {
            setPassTitle(true);
        }

        if (description == "") {
            setPassDesc(false);
            setValDesc("!! Please enter feedback description.")
        } else {
            setPassDesc(true);
        }

        if (category == "") {
            setPassCat(false);
            setValCat("!! Please select your feedback category")
        } else {
            setPassCat(true);
        }

    }

    useEffect(() => {
        (async () => {
            if (passDesc == true & passTitle == true & passCat == true) {
                let id = "FD" + Math.floor(Math.random() * 1000000);
                const { error } = await saveFeedback(id, title, description, category, resident_id, status);
                if (error) {
                    Alert.alert("Error Saving Visitor, " + error.message, [{ text: 'OK', onPress: () => null }]);
                }
                else {
                    Alert.alert("Sent your feedback", "Your feedback is sent to management team.", [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate('Feedback')
                        },

                    ])
                }

            }
        })();
    }, [submit])

    return (
        <NativeBaseProvider>
            <Center bg="white" h="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Feedback form title</FormControl.Label>
                            <Input type="text" value={title} onChangeText={(v) => setTitle(capitalizeFirstLetter(v))} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Description</FormControl.Label>
                            <TextArea h={20} w="100%" maxW="300" value={description} onChangeText={(v) => setDescription(capitalizeFirstLetter(v))} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Categories</FormControl.Label>
                            <Select
                                placeholder="Feedback"
                                selectedValue={category}
                                w="100%"
                                onValueChange={(itemValue) => setCategory(itemValue)}
                            >
                                <Select.Item label="Technical Support" value="technical_support" />
                                <Select.Item label="Billing Support" value="billing_support" />
                                <Select.Item label="Security Issue" value="security_issue" />
                                <Select.Item label="Car Park Issue" value="car_park_issue" />
                                <Select.Item label="Defect of Common Area" value="defect_of_common_area" />
                                <Select.Item label="Suggestion" value="suggestion" />
                                <Select.Item label="Others" value="others" />
                            </Select>
                        </FormControl>
                        {!passTitle & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valTitle} </Text> : <></>}
                        {!passDesc & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valDesc} </Text> : <></>}
                        {!passCat & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valCat} </Text> : <></>}
                        <Button bg="#4484FF" mt="5"
                            onPress={handleAddFeedback}
                        >Submit</Button>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>);
}

export default NewFeedback;