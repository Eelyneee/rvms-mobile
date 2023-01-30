import React, { useState, useEffect } from "react";
import { Box, Center, NativeBaseProvider, ScrollView, FormControl, Input, Heading, Text, VStack, Button } from "native-base";
import { getVisitationById } from "../lib/supabase-client";

const ViewVisitor = ({ route, navigation }) => {

    const { visitationID } = route.params;
    const [visitationData, setVisitationData] = useState({});

    const loadVisitor = async () => {
        const { visitation, error } = await getVisitationById(visitationID);
        setVisitationData(visitation);
    }

    useEffect(() => {

        loadVisitor();

    }, [visitationID]);

    return (
        <NativeBaseProvider>
            <ScrollView bg="white">
                <Center>
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <VStack space={3} mt="5">
                            <Box borderWidth="1" borderColor="black" py="2" px="4" borderRadius="md">
                                <Text fontWeight="bold" fontSize="md" color="blue.400">Visitation ID:</Text>
                                <Text mt="2" ml="2">{visitationData.id}</Text>
                            </Box>
                            <Box borderWidth="1" borderColor="black" py="2" px="4" borderRadius="md">
                                <Text fontWeight="bold" fontSize="md" color="blue.400">Visitor's Name</Text>
                                <Text>{visitationData.visitor_name}</Text>
                            </Box>
                            <Box borderWidth="1" borderColor="black" py="2" px="4" borderRadius="md">
                                <Text fontWeight="bold" fontSize="md" color="blue.400">Visitor's IC no.</Text>
                                <Text>{visitationData.visitor_ic}</Text>
                            </Box>
                            <Box borderWidth="1" borderColor="black" py="2" px="4" borderRadius="md">
                                <Text fontWeight="bold" fontSize="md" color="blue.400">Phone number</Text>
                                <Text>{visitationData.phone_no}</Text>
                            </Box>
                            <Box borderWidth="1" borderColor="black" py="2" px="4" borderRadius="md">
                                <Text fontWeight="bold" fontSize="md" color="blue.400">Date and Time visited</Text>
                                <Text>{visitationData.visitation_date + ", " + visitationData.visitation_time}</Text>
                            </Box>
                            {
                                visitationData.carplate != "" &&
                                <Box borderWidth="1" borderColor="black" py="2" px="4" borderRadius="md">
                                    <Text fontWeight="bold" fontSize="md" color="blue.400">Car Plate</Text>
                                    <Text>{visitationData.carplate}</Text>
                                </Box>
                            }
                        </VStack>
                    </Box>
                </Center>
            </ScrollView>
        </NativeBaseProvider>);
}

export default ViewVisitor;