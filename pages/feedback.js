import React, { useEffect, useState } from "react";
import { Box, Center, NativeBaseProvider, Badge, Text, Icon, Button, HStack, ScrollView, Flex, Fab, Divider, FlatList, Pressable } from "native-base";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { getAllFeedbacks, listenForFeedbackChanges, getResidentByID, supabaseClient } from '../lib/supabase-client'
import { getDateAndTimeFromDB, getFeedbackCategoryColor, getFeedbackStatusColor, getFeedbackCategoryLabel } from "../lib/functions";
import CategoryBadge from "../components/CategoryBadge";
import { createClient } from "@supabase/supabase-js";

const Feedback = ({ id, title, description, category, status, navigation, created_at, isFocused }) => {
    return (
        <Box m={3} alignItems="center">
            <Flex direction="row" justify="space-between">
                <Box w="65%" maxW="250">
                    <Flex direction="row" >
                        <MaterialIcons name="feedback" size={24} color="#4484FF" />
                        <Text ml={3}>{"ID: " + id}</Text>
                    </Flex>
                    <Text fontSize="lg" fontWeight="bold">{title}</Text>
                    <Text fontSize="sm" noOfLines={2}>{description}</Text>
                    <Text mt="2" fontSize="xs">{getDateAndTimeFromDB(created_at)}</Text>
                    <Pressable
                        onPress={() => navigation.navigate('ViewFeedback', { feedbackID: id })}
                    >
                        {isFocused ? <Text mt="1" fontSize={12} fontWeight="medium" textDecorationLine="underline" color="darkBlue.600" alignSelf="flex-start">
                            View more
                        </Text> : <Text mt="1" fontSize={12} fontWeight="medium" color="darkBlue.600" underline>
                            View More
                        </Text>}

                    </Pressable>
                </Box>
                <Flex align="flex-end" w="35%">
                    <Badge colorScheme={getFeedbackCategoryColor(category)} mb={2}>{getFeedbackCategoryLabel(category)}</Badge>
                    <Badge colorScheme={getFeedbackStatusColor(status)} variant="outline" width="50%">{status}</Badge>

                </Flex>
            </Flex>
            <Divider my={5} />
        </Box>
    );
}


const Feedbacks = ({ navigation }) => {

    const [feedback, setFeedbackData] = useState([]);
    const [residentData, setResidentData] = useState({});
    const [loading, setLoading] = useState(true);
    const resident_id = supabaseClient.auth.user().id;

    const loadAllFeedbacks = async () => {
        const { feedbacks, error } = await getAllFeedbacks(resident_id);
        setFeedbackData(feedbacks);
    }

    useEffect(() => {
        // let abortController = new AbortController();
        loadAllFeedbacks();
        // listenForFeedbackChanges(loadAllFeedbacks);
        // return () => {
        //     abortController.abort();
        // }
    }, []);


    useEffect(() => {
        const client = createClient("https://ldfotgflxcncnaameeig.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZm90Z2ZseGNuY25hYW1lZWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ0ODcyMzEsImV4cCI6MTk3MDA2MzIzMX0.ahVip8dq6j2Pmyso84QAYeM10dsYmhF1zEiSYtnE8kc")
        const subscription = client
            .from('feedbacks')
            .on('*', payload => {
                console.log('Change received!', payload)
                loadAllFeedbacks();
            })
            .subscribe()
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return (
        <NativeBaseProvider>
            <ScrollView bg="white" h="100%">
                <Box bg="white" h="100%">
                    <Fab renderInPortal={false} shadow={2} size="sm" placement="top-right" bg="#4231FF" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} onPress={() => navigation.navigate('NewFeedback')} />
                    <CategoryBadge />
                    {
                        (feedback === undefined || feedback.length == 0) ? <Center><Text>You have not submit any feedback yet.</Text></Center>
                            : feedback.map((item) => {
                                return <Feedback {...item} navigation={navigation} key={item.id} />
                            })
                    }
                    {/* <FlatList
                    data={feedback}
                    renderItem={({ item }) => <Feedback {...item} navigation={navigation} />}
                    keyExtractor={item => item.id}
                /> */}
                </Box>
            </ScrollView>

        </NativeBaseProvider>);
}

export default Feedbacks;