import React, { useState, useEffect } from "react";
import { Box, Center, NativeBaseProvider, Badge, Icon, Heading, ScrollView, Text, Divider, VStack, HStack, Flex } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { getFeedbackById, getRepliesFromAdministrator } from "../lib/supabase-client";
import { getDateAndTimeFromDB, getFeedbackCategoryColor, getFeedbackStatusColor, getFeedbackCategoryLabel } from "../lib/functions";

const ViewFeedback = ({ route, navigation }) => {

    const { feedbackID } = route.params;
    const [feedbackData, setFeedbackData] = useState({});
    const [replyMessage, setReplyMessage] = useState({});

    const loadFeedback = async () => {
        const { feedback, error } = await getFeedbackById(feedbackID);
        setFeedbackData(feedback);
    }

    const loadReply = async () => {
        const { reply, error } = await getRepliesFromAdministrator(feedbackID);
        setReplyMessage(reply);
    }

    useEffect(() => {
        loadFeedback();
        loadReply();

    }, [feedbackID]);


    return (
        <NativeBaseProvider>
            <ScrollView bg="white">
                <Center>
                    <Box mx={10} mt={5} mb={20}>
                        <HStack space={3} my={5}>
                            <MaterialIcons name="feedback" size={24} color="blue" />
                            <Text>ID: {feedbackData?.id}</Text>
                        </HStack>
                        <Heading size="md">{feedbackData?.title}</Heading>
                        <Text>{getDateAndTimeFromDB(feedbackData?.created_at)}</Text>
                        <HStack space={5} mb={10}>
                            <Badge colorScheme={getFeedbackCategoryColor(feedbackData?.category)} >{getFeedbackCategoryLabel(feedbackData?.category)}</Badge>
                            <Badge colorScheme={getFeedbackStatusColor(feedbackData?.status)} variant="outline" >{feedbackData?.status}</Badge>
                        </HStack>
                        <Box p={3} maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1"
                            backgroundColor="gray.50"
                        >
                            <Text fontWeight="bold" mb="2" fontSize="xs">Description:</Text>
                            <Text>{feedbackData.description}</Text>
                        </Box>
                        <Divider my={10} />
                        {
                            feedbackData?.status == "replied" ? <Box p={3} maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                                borderColor: "coolGray.600",
                                backgroundColor: "gray.700"
                            }} _web={{
                                shadow: 5,
                                borderWidth: 0
                            }} _light={{
                                backgroundColor: "gray.50"
                            }}>
                                <Heading size="sm"> Reply from {replyMessage?.administrators?.name}</Heading>
                                <Text ml="1" mt="2">{replyMessage?.content}</Text>
                            </Box> : <Box p={3}><Text>Your feedback will be replied by management soon.</Text></Box>
                        }

                    </Box>
                </Center>
            </ScrollView>
        </NativeBaseProvider>);
}

export default ViewFeedback;