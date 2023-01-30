import React, { useState, useEffect } from "react";
import { Alert } from "react-native"
import { Box, Center, NativeBaseProvider, Button, Heading, Text, FormControl, Input, Divider, Link, VStack, HStack } from "native-base";
import { getVisitationById } from "../lib/supabase-client";

const LoginVisitor = ({ navigation }) => {

    // login button - validation -> from db -> verify -> navigate to home
    const [unitID, setUnitID] = useState("");
    const [visitationID, setVisitationID] = useState("");
    const [visitationData, setVisitationData] = useState({});
    //validation
    const [valVID1, setvalVID1] = useState("");
    const [valVID2, setvalVID2] = useState("");
    const [passVID1, setPassVID1] = useState(false);
    const [passVID2, setPassVID2] = useState(false);
    const [checked, setChecked] = useState(false);
    const [submit, setSubmit] = useState(0);
    const [count, setCount] = useState(0);
    const loadVisitor = async () => {
        const { visitation, error } = await getVisitationById(visitationID);
        setVisitationData(visitation);
        setCount(count + 1);
    }


    const handleSubmit = () => {
        setChecked(true);
        setSubmit(submit + 1)
        var visitRegex = /^CY[0-9]{6,9}$/
        var unitRegex = /^[0-9]*$/
        if (visitationID == "") {
            setPassVID1(false);
            setvalVID1("!! Please enter visitationID.")
        } else if (visitRegex.test(visitationID) == false) {
            setPassVID1(false);
            setvalVID1("!! VisitationID in wrong format")
        } else {
            setPassVID1(true);
        }
        if (unitID == "") {
            setPassVID2(false);
            setvalVID2("!! Please enter unitID.")
        } else if (unitRegex.test(unitID) == false) {
            setPassVID2(false);
            setvalVID2("!! Please enter valid unitID.")
        }
        else {
            setPassVID2(true);
        }

    }

    useEffect(() => {
        if (passVID1 == true & passVID2 == true) {
            console.log(count);
            loadVisitor();
            if (count != 0) {
                // if visitation id same > navigate > else modal > load the page again
                if (visitationData?.residents?.unit_id == unitID) {
                    navigation.navigate('VisitorQR', { visitationID: visitationData.id })
                }
                else {
                    Alert.alert("Invalid Visitation ", "Wrong visitation id/unit id.", [{ text: 'OK', onPress: () => null }]);
                    navigation.navigate("LoginV")
                }
            }
        }

    }, [submit])

    return (
        <NativeBaseProvider>
            <Center bg="white" h="100%">
                <Heading size="md">Visitor</Heading>
                <Heading size="md">(Check-in visitations)</Heading>
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Visitation ID</FormControl.Label>
                            <Input value={visitationID} onChangeText={(v) => setVisitationID(v)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Unit ID</FormControl.Label>
                            <Input value={unitID} onChangeText={(v) => setUnitID(v)} />
                            <FormControl.HelperText>
                                ** You can get the unit id and visitation id from residents.
                            </FormControl.HelperText>
                        </FormControl>
                    </VStack>
                </Box>
                {!passVID1 & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valVID1} </Text> : <></>}
                {!passVID2 & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valVID2} </Text> : <></>}
                <Button bg="#4484FF" w="200px"
                    onPress={handleSubmit}
                >Submit</Button>
            </Center>
        </NativeBaseProvider>
    );

}
export default LoginVisitor;