import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Box, Center, HStack, Flex, Circle, Pressable, Text } from "native-base";
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { listenForVisitationChanges, removeVisitor } from "../lib/supabase-client";



const VisitorCard = ({ id, visitor_name, visitor_ic, phone_no, carplate, visitation_date, visitation_time, checkin_time, navigation }) => {

    const handleClick = async () => {
        Alert.alert(
            'Delete Visitor',
            'Are you sure you want to delete this visitor?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => handleCancelButton() },
            ],
            { cancelable: false }
        )
    }

    const handleCancelButton = async () => {
        const { error } = await removeVisitor(id);
        if (error) {
            Alert.alert("Error Remove Visitors, ", error.message, [{ text: 'OK', onPress: () => null }]);
        } else {
            Alert.alert("Visitor Removed", "", [{ text: 'OK', onPress: () => navigation.navigate("Visitors") }]);
        }
    }

    return (
        <Box m={3}>
            <Flex direction="row" justify="space-between" borderColor="coolGray.300" borderWidth="1" rounded="lg" px="3" py="5">
                <Center w="25%" maxW="100">
                    <Circle size="80px" bg="#EDF3FF">
                        <HStack alignItems="center">
                            <Text fontSize="3xl">{visitation_date?.slice(8, 10)}</Text>
                            <Text fontSize="md">  / {visitation_date?.slice(5, 7)}</Text>
                        </HStack>
                    </Circle>
                    <Text>{visitation_date?.slice(0, 4)}</Text>
                </Center>
                <Box w="50%" pl="3">
                    <Text fontSize="md" fontWeight="bold">{visitor_name}</Text>
                    <Text color="gray.400">{phone_no}</Text>
                    <Text mt="3" textTransform="uppercase">{carplate}</Text>
                </Box>
                <Flex align="flex-end" w="25%">
                    <Pressable onPress={() => navigation.navigate('ViewVisitor', { visitationID: id })} mb="1" >
                        <Circle size="50px" bg="#4484FF"><MaterialIcons name="remove-red-eye" size={24} color="black" /></Circle>
                    </Pressable>

                    {/* <Button onPress={() => navigation.navigate('ViewVisitor', { visitationID: id })} >View</Button> */}
                    {!checkin_time ?
                        <Pressable onPress={handleClick} >
                            <Circle size="50px" bg="#4484FF"><FontAwesome name="trash" size={24} color="black" /></Circle>
                        </Pressable>
                        : ""}

                    {/* {!checkin_time ? <Button onPress={handleCancelButton}>Cancel</Button> : ""} */}
                </Flex>
            </Flex>

        </Box>);
};
export default VisitorCard;