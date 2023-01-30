import React, { useState, useEffect } from "react";
import { Alert, DatePickerIOS, Platform } from "react-native"
import { Box, Center, NativeBaseProvider, FormControl, Input, Heading, VStack, ScrollView, Button, isReadOnly, Text, Select } from "native-base";
import { saveVisitor, saveVisitorSG, supabaseClient, getResidentByID, getAccountByID, getHouseUnit } from "../lib/supabase-client";
import { getTodayDate, getCurrentTime } from "../lib/functions";
import DateTimePicker from '@react-native-community/datetimepicker';
const AddVisitor = ({ navigation }) => {

    const [name, setName] = useState("");
    const [ic, setIC] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [chosenDate, setChosenDate] = useState(new Date());
    const [carPlate, setCarPlate] = useState("");
    const [unitID, setUnitID] = useState("");
    const [accountType, setAccountType] = useState("");
    const session_id = supabaseClient.auth.user()?.id;
    const [residentData, setResidentData] = useState([]);
    const [houseData, setHouseData] = useState([]);
    const [datePicker, setDatePicker] = useState(false);
    const [timePicker, setTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date(Date.now()));
    const [submit, setSubmit] = useState(0);

    //validation R
    const [valName1, setValName1] = useState("");
    const [passName1, setPassName1] = useState(false);
    const [valIC1, setValIC1] = useState("");
    const [passIC1, setPassIC1] = useState(false);
    const [valPhone1, setValPhone1] = useState("");
    const [passPhone1, setPassPhone1] = useState(false);
    const [valCarplate1, setValCarplate1] = useState("");
    const [passCarplate1, setPassCarplate1] = useState(false);
    const [checked, setChecked] = useState(false);
    //validation SG
    const [valName2, setValName2] = useState("");
    const [passName2, setPassName2] = useState(false);
    const [valIC2, setValIC2] = useState("");
    const [passIC2, setPassIC2] = useState(false);
    const [valPhone2, setValPhone2] = useState("");
    const [passPhone2, setPassPhone2] = useState(false);
    const [valCarplate2, setValCarplate2] = useState("");
    const [passCarplate2, setPassCarplate2] = useState(false);
    const [valUID2, setValUID2] = useState("");
    const [passUID2, setPassUID2] = useState(false);
    const [checked2, setChecked2] = useState(false);

    function showDatePicker() {
        setDatePicker(true);
    };

    function showTimePicker() {
        setTimePicker(true);
    };

    function onDateSelected(event, value) {
        setDate(value);
        if (Platform.OS !== 'ios') {
            setDatePicker(false)
        }
    };

    function onTimeSelected(event, value) {
        setTime(value);
        if (Platform.OS !== 'ios') {
            setTimePicker(false);
        }
    };

    const loadAllHouses = async () => {
        const { house_unit, error } = await getHouseUnit();
        setHouseData(house_unit);
    }

    const loadAccount = async () => {
        const { account, error } = await getAccountByID(session_id);
        setAccountType(account?.account_type);
    }
    const loadResident = async () => {
        const { resident, error } = await getResidentByID(session_id);
        setResidentData(resident);
        setUnitID(resident?.unit_id);
    }

    const handleSelectChange = async (itemValue) => {
        setUnitID(itemValue)
    }



    /**
     *   if residents == add visitor info only. note when do validation, set some as optional some is must
     *   if is security guards = add all including checkin time, use unit id to search resident id
     */
    const handleAddVisitor = async () => {
        setChecked(true);
        setSubmit(submit + 1);
        var nameReg = /^[a-zA-Z ,.'-]+$/
        var icReg = /^(([[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01]))([0-9]{6})$/
        var carplateReg = /^([A-Z]{1}|[A-Z]{2}|[A-Z]{3})([0-9]{1}|[0-9]{2}|[0-9]{3}|[0-9]{4})[A-Z]{0,1}$/
        var phoneReg = /^(6?01){1}(([0145]{1}\d{7,8})|([236789]{1}\d{7}))$/
        if (name == "") {
            setValName1("!! Please enter name.")
            setPassName1(false);
        } else if (nameReg.test(name) == false) {
            setValName1("!! Please enter name in valid format.")
            setPassName1(false);
        } else {
            setPassName1(true);
        }
        if (ic == "") {
            setValIC1("!! Please enter ic.")
            setPassIC1(false);
        } else if (icReg.test(ic) == false) {
            setValIC1("!! Please enter ic in valid format.")
            setPassIC1(false);
        } else {
            setPassIC1(true);
        }
        if (phoneNumber == "") {
            setValPhone1("!! Please enter phone number.")
            setPassPhone1(false);
        } else if (phoneReg.test(phoneNumber) == false) {
            setValPhone1("!! Please enter phone in valid format.")
            setPassPhone1(false);
        } else {
            setPassPhone1(true);
        }
        if (carPlate == "") {
            setPassCarplate1(true);
        } else if (carplateReg.test(carPlate) == true) {
            setPassCarplate1(true);
        } else {
            setPassCarplate1(false);
            setValCarplate1("!! Please enter a valid carplate.")
        }

    }
    useEffect(() => {
        (async () => {
            if (passName1 == true & passIC1 == true & passPhone1 == true & passCarplate1 == true) {
                try {
                    let id = "CY" + unitID + Math.floor(Math.random() * 10000);
                    let visitation_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    let visitation_time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
                    const { error } = await saveVisitor(name, ic, phoneNumber, carPlate, session_id, unitID, id, visitation_date, visitation_time);
                    if (error) {
                        Alert.alert("Error Saving Visitor, " + error.message, [{ text: 'OK', onPress: () => null }]);
                    }
                    else {
                        Alert.alert("Visitors added", "Visitor is added. Please remember to send your unit id and visitation id to your visitors for verification purpose.", [
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.navigate('Visitors')
                                }
                            },
                        ])
                    }
                } catch (e) {
                    console.log(e.message)
                }
            }
        })();
    }, [submit])

    const handleAddVisitorSG = async () => {
        setChecked2(true);
        setSubmit(submit + 1);
        var nameReg = /^[a-zA-Z ,.'-]+$/
        var icReg = /^(([[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01]))([0-9]{6})$/
        var carplateReg = /^([A-Z]{1}|[A-Z]{2}|[A-Z]{3})([0-9]{1}|[0-9]{2}|[0-9]{3}|[0-9]{4})[A-Z]{0,1}$/
        var phoneReg = /^(6?01){1}(([0145]{1}\d{7,8})|([236789]{1}\d{7}))$/
        if (name == "") {
            setValName2("!! Please enter name.")
            setPassName2(false);
        } else if (nameReg.test(name) == false) {
            setValName2("!! Please enter name in valid format.")
            setPassName2(false);
        } else {
            setPassName2(true);
        }
        if (ic == "") {
            setValIC2("!! Please enter ic.")
            setPassIC2(false);
        } else if (icReg.test(ic) == false) {
            setValIC2("!! Please enter ic in valid format.")
            setPassIC2(false);
        } else {
            setPassIC2(true);
        }
        if (phoneNumber == "") {
            setValPhone2("!! Please enter phone number.")
            setPassPhone2(false);
        } else if (phoneReg.test(phoneNumber) == false) {
            setValPhone2("!! Please enter phone in valid format.")
            setPassPhone2(false);
        } else {
            setPassPhone2(true);
        }
        if (carPlate == "") {
            setPassCarplate2(true);
        } else if (carplateReg.test(carPlate) == true) {
            setPassCarplate2(true);
        } else {
            setPassCarplate2(false);
            setValCarplate2("!! Please enter a valid carplate.")
        }
        if (unitID == "") {
            setValUID2("!! Please enter unit ID.")
            setPassUID2(false);
        } else {
            setPassUID2(true);
        }
    }
    useEffect(() => {
        (async () => {
            if (passCarplate2 == true & passIC2 == true & passName2 == true & passPhone2 == true & passUID2 == true) {
                try {
                    let id = "CY" + unitID + Math.floor(Math.random() * 10000)
                    let date = getTodayDate();
                    let time = getCurrentTime();
                    const { error } = await saveVisitorSG(name, ic, phoneNumber, carPlate, session_id, unitID, id, date, time);
                    if (error) {
                        Alert.alert("Error Saving Visitor, " + error.message, [{ text: 'OK', onPress: () => null }]);
                    }
                    else {
                        Alert.alert("Visitors added", "Visitor is added. Please allow the visitor to enter.", [
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.navigate('HomeSG')
                                }
                            },
                        ])
                    }
                } catch (e) {
                    console.log(e.message)
                }
            }
        })();
    }, [submit])

    useEffect(() => {
        const controller = new AbortController();
        loadAccount();
        return () => controller.abort();
    }, [])

    useEffect(() => {
        const controller = new AbortController();
        if (accountType == "resident") {
            loadResident();
            return () => controller.abort();
        } else {
            loadAllHouses();
        }
    }, [accountType])


    return (
        <NativeBaseProvider>
            <ScrollView bg="white">
                <Center>
                    <Box safeArea mb={20} mt={10} w="90%" maxW="290">
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>Visitor's Name</FormControl.Label>
                                <Input placeholder="Please enter visitor's name." value={name} onChangeText={(v) => setName(v)} />
                                <FormControl.HelperText>
                                    Eg: Lim Kwah Ho
                                </FormControl.HelperText>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Visitor's IC no.</FormControl.Label>
                                <Input placeholder="Please enter visitor's identification number." value={ic} onChangeText={(v) => setIC(v)} />
                                <FormControl.HelperText>
                                    Eg: 780512086632
                                </FormControl.HelperText>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Phone number</FormControl.Label>
                                <Input placeholder="Please enter visitor's phone number." value={phoneNumber} onChangeText={(v) => setPhoneNumber(v)} />
                                <FormControl.HelperText>
                                    Eg: 60123547895
                                </FormControl.HelperText>
                            </FormControl>
                            {
                                accountType == "resident" &&
                                <FormControl>
                                    <FormControl.Label>Date visited</FormControl.Label>
                                    {datePicker && (
                                        <DateTimePicker
                                            value={date}
                                            mode={'date'}
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            // is24Hour={true}
                                            onChange={onDateSelected}

                                        />
                                    )}

                                    {!datePicker ?
                                        <Box m="1">
                                            <Button bg="#4484FF" onPress={showDatePicker}>Select Date</Button>
                                            <Text>Date selected: {date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</Text>
                                        </Box> : (Platform.OS === 'ios' ? <Box m="1">
                                            <Button bg="#4484FF" onPress={() => setDatePicker(false)}>Confirm date</Button>
                                            <Text>Date: {date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</Text>
                                        </Box> : <></>)
                                    }
                                </FormControl>
                            }
                            {accountType == "resident" &&
                                <FormControl>
                                    <FormControl.Label>Time visited</FormControl.Label>
                                    {timePicker && (
                                        <DateTimePicker
                                            value={time}
                                            mode={'time'}
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            is24Hour={false}
                                            onChange={onTimeSelected}

                                        />
                                    )}
                                    {!timePicker ?
                                        <Box m="1">
                                            <Button bg="#4484FF" onPress={showTimePicker}>Select Time</Button>
                                            <Text>Time selected: {time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()}</Text>
                                        </Box> : (Platform.OS === 'ios' ? <Box m="1">
                                            <Button bg="#4484FF" onPress={() => setTimePicker(false)}>Confirm Time</Button>
                                            <Text>Time: {time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()}</Text>
                                        </Box> : <></>)
                                    }
                                </FormControl>
                            }
                            <FormControl>
                                <FormControl.Label>Car Plate</FormControl.Label>
                                <Input placeholder="Please enter visitor's carplate." value={carPlate} onChangeText={(v) => setCarPlate(v)} />
                                <FormControl.HelperText>
                                    (optional: Visitors without vehicle does not need to fill this)
                                    Eg: KLS1234
                                </FormControl.HelperText>
                            </FormControl>
                            {
                                accountType == "resident" ? <FormControl isReadOnly>
                                    <FormControl.Label>Unit ID</FormControl.Label>
                                    <Box borderRadius="1" borderColor="black" borderStyle="solid">
                                        {unitID}
                                    </Box>
                                </FormControl>
                                    :
                                    <FormControl>
                                        <FormControl.Label>Unit ID</FormControl.Label>
                                        <Select
                                            placeholder="Select unit id"
                                            selectedValue={unitID}
                                            width={"100%"}
                                            onValueChange={handleSelectChange}
                                        >
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
                            {!passName1 & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valName1} </Text> : <></>}
                            {!passIC1 & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valIC1} </Text> : <></>}
                            {!passPhone1 & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valPhone1} </Text> : <></>}
                            {!passCarplate1 & checked ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valCarplate1} </Text> : <></>}
                            {!passName2 & checked2 ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valName2} </Text> : <></>}
                            {!passIC2 & checked2 ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valIC2} </Text> : <></>}
                            {!passPhone2 & checked2 ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valPhone2} </Text> : <></>}
                            {!passCarplate2 & checked2 ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valCarplate2} </Text> : <></>}
                            {!passUID2 & checked2 ? <Text color="#f23730" fontSize="xs" borderWidth="1" p="2" borderColor="#f23730" rounded="lg" bg="#fcf0f0" mb="2">{valUID2} </Text> : <></>}
                            {
                                accountType == "resident" ?
                                    <Button bg="#4484FF" mt={5}
                                        onPress={handleAddVisitor}
                                    >Submit</Button> :
                                    <Button bg="#4484FF" mt={5}
                                        onPress={handleAddVisitorSG}
                                    >Submit</Button>
                            }
                        </VStack>
                    </Box>
                </Center>
            </ScrollView>
        </NativeBaseProvider>);
}

export default AddVisitor;