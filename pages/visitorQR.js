import React, { useState, useEffect } from "react";
import { Box, Center, NativeBaseProvider, Heading, Text, Image, ScrollView, Button } from "native-base";
import { getVisitationById, listenForVisitationChanges, supabaseClient } from "../lib/supabase-client";
import { getDateFromDB, getTimeFromDB } from "../lib/functions";
import QRCode from "react-qr-code";
import { createClient } from "@supabase/supabase-js";

const VisitorQR = ({ navigation, route }) => {

    const { visitationID } = route.params;
    // load from db -> reload when status change to check-in -> navigate to verified visitaion

    const [visitationData, setVisitationData] = useState({});

    const loadVisitor = async () => {

        const { visitation, error } = await getVisitationById(visitationID);
        setVisitationData(visitation);

        if (visitation?.checkin_date != null) {
            navigation.navigate('VerifiedVisitation')
        }
    }

    useEffect(() => {
        loadVisitor();
    }, [visitationID]);


    useEffect(() => {
        const client = createClient("https://ldfotgflxcncnaameeig.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZm90Z2ZseGNuY25hYW1lZWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ0ODcyMzEsImV4cCI6MTk3MDA2MzIzMX0.ahVip8dq6j2Pmyso84QAYeM10dsYmhF1zEiSYtnE8kc")
        const subscription = client
            .from('visitation')
            .on('*', payload => {
                console.log('Change received!', payload)
                loadVisitor();
            })
            .subscribe()
        return () => {
            subscription.unsubscribe()
        }
    }, [])



    return (
        <NativeBaseProvider>
            <ScrollView h="100%" w="100%" bg="white">
                <Center mt={5} mb={20} >
                    <Heading mx={10} mb={10} size="md" textAlign="center">(Please show the qr code to security guards)</Heading>
                    <Box rounded="lg" w="90%" bg="white" shadow="3">
                        <Center bg="#4484FF" height={150} rounded="lg"  >
                            <Heading size="md" fontWeight="bold" color="white">Cypress Condominium</Heading>
                            <Heading size="md" fontWeight="bold" color="white">Visitation ID: {visitationData?.id} </Heading>
                            <Heading size="md" fontWeight="bold" color="white">Unit ID: {visitationData?.residents?.unit_id}  </Heading>
                        </Center>
                        <Center bg="white" py="5" rounded="lg"  >
                            <Box bg="white" padding="5">
                                <QRCode value={visitationID} />
                            </Box>
                            <Text fontSize="md" color="gray.500" fontWeight="bold">Visitor Name:</Text>
                            <Text fontSize="md" color="black" fontWeight="bold" mb={3}>{visitationData?.visitor_name}</Text>
                            <Text fontSize="md" color="gray.500" fontWeight="bold">Identification number:</Text>
                            <Text fontSize="md" color="black" fontWeight="bold" mb={3}>{visitationData?.visitor_ic}</Text>
                            <Text fontSize="md" color="gray.500" fontWeight="bold">Car Plate</Text>
                            <Text fontSize="md" color="black" fontWeight="bold" mb={3}>{visitationData?.carplate != "" ? visitationData?.carplate : "No carplate recorded"}</Text>
                            <Text fontSize="md" color="gray.500" fontWeight="bold">Mobile Number:</Text>
                            <Text fontSize="md" color="black" fontWeight="bold" mb={3}>{visitationData?.phone_no}</Text>
                            <Text fontSize="md" color="gray.500" fontWeight="bold">Date and Time:</Text>
                            <Text fontSize="md" color="black" fontWeight="bold" mb={3}>{visitationData?.visitation_date + "   " + visitationData?.visitation_time}</Text>
                        </Center>
                    </Box>
                </Center>
            </ScrollView>
        </NativeBaseProvider>);
}

export default VisitorQR;