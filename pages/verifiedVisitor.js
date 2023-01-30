import React, { useState } from "react";
import { Alert } from "react-native";
import { Box, Center, NativeBaseProvider, Heading, Text, Button, Image, Modal, FormControl, Input, VStack } from "native-base";
import QRScanner from "../components/QrScanner";
import { getVisitationById, supabaseClient, updateVisitation } from "../lib/supabase-client";
import { getTodayDate, getCurrentTime } from "../lib/functions";

const VerifyVisitor = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [visitationData, setVisitationData] = useState({});
    let securityID = supabaseClient.auth.user().id;

    const createTwoButtonAlert = () => {
        Alert.alert(
            "QR code is not found!",
            "Please try to scan again or scan another qr code. If the visitor is not register, you may register them as ad-hoc visitors.",
            [
                {
                    text: "Try to scan again",
                    onPress: () => console.log("Scan Again pressed"),
                    style: "default"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        );
    }

    const createAlert = () => {
        Alert.alert(
            "This visitation is verified.",
            "Please try to scan again or scan another qr code. If the visitor is not register, you may register them as ad-hoc visitors.",
            [
                {
                    text: "Try to scan again",
                    onPress: () => console.log("Scan Again pressed"),
                    style: "default"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        );
    }


    const loadVisitation = async (visitation_id) => {
        const { visitation, error } = await getVisitationById(visitation_id);
        setVisitationData(visitation);
        if (visitation == undefined) {
            createTwoButtonAlert();
        } else if (visitation.checkin_date != null) {
            createAlert();
        }
        else {
            setShowModal(true);
        }

    }

    const handleVerify = async () => {
        var checkin_date = getTodayDate();
        var checkin_time = getCurrentTime();
        var id = visitationData?.id;
        const { error } = await updateVisitation(checkin_time, checkin_date, securityID, id);
        if (error) {
            console.log(error)
        } else {
            setShowModal(false);
            navigation.navigate('VerifiedVisitation');
        }
    }

    return (
        <NativeBaseProvider>
            <Center bg="white" h="100%">
                <Center height="100%">

                    <QRScanner navigation={navigation} loadVisitationFromDB={loadVisitation} />

                    <Text fontSize="md" fontWeight="bold" m="8">(Scan the qr code shown by visitors)</Text>
                </Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Verify registered visitors</Modal.Header>
                        <Modal.Body>
                            <VStack>
                                <Text fontWeight="bold" fontSize="md" color="gray.400">Visitation ID:</Text>
                                <Text mb={4}>{visitationData?.id}</Text>
                                <Text fontWeight="bold" fontSize="md" color="gray.400">Unit ID:</Text>
                                <Text mb={4}>{visitationData?.residents?.unit_id}</Text>
                                <Text fontWeight="bold" fontSize="md" color="gray.400">Visitor Name:</Text>
                                <Text mb={4}>{visitationData?.visitor_name}</Text>
                                <Text fontWeight="bold" fontSize="md" color="gray.400">Car plate:</Text>
                                <Text mb={4}>{visitationData?.carplate}</Text>
                            </VStack>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setShowModal(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button onPress={handleVerify}>
                                    Verify
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        </NativeBaseProvider>);
}

export default VerifyVisitor;