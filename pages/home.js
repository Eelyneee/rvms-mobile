import React, { useState, useEffect } from 'react';
import { Box, Center, NativeBaseProvider, Heading, Image, Text, ScrollView, Icon, Button, Pressable, Avatar, HStack, VStack, AspectRatio } from "native-base";
import AnnouncementCard from '../components/AnnouncementCard';
import { listenForAnnouncementChange, getLatestAnnouncement, getAllUpcomingVisitors, listenForVisitationChanges, getUpcomingVisitor, supabaseClient, signOut, getResidentByID, listenForResidentChange } from '../lib/supabase-client';
import VisitorCard from '../components/VisitorCard';
import { MaterialIcons, AntDesig, FontAwesome } from '@expo/vector-icons';

const Home = ({ navigation }) => {

    const [residentData, setResidentData] = useState([]);
    const [announcementData, setAnnouncementData] = useState([]);
    const [visitationData, setVisitationData] = useState([]);
    const resident_id = supabaseClient.auth.user().id;

    const loadResident = async () => {
        const { resident, error } = await getResidentByID(resident_id);
        setResidentData(resident);
    }

    const loadLatestAnnouncement = async () => {

        const { announcement, error } = await getLatestAnnouncement();
        setAnnouncementData(announcement);
    }

    const loadUpcomingVisitation = async () => {
        const { visitation, error } = await getUpcomingVisitor(resident_id);
        setVisitationData(visitation);
    }

    useEffect(() => {
        const controller = new AbortController();
        loadResident();
        listenForResidentChange(loadResident);
        loadLatestAnnouncement();
        listenForAnnouncementChange(loadLatestAnnouncement);
        loadUpcomingVisitation();
        listenForVisitationChanges(loadUpcomingVisitation);
        return () => controller.abort();
    }, [])

    return (
        <NativeBaseProvider>
            <ScrollView>
                <Box bg="red">
                    <AspectRatio w="100%" ratio={16 / 9} opacity="50" zIndex={-1}>
                        {
                            <Image source={{
                                uri: "https://ldfotgflxcncnaameeig.supabase.co/storage/v1/object/public/resident.profile/Bangalore_citycover_20190613234056.jpg"
                            }} alt="Announcement-image" />
                        }
                    </AspectRatio>
                    <Box zIndex={0} position="absolute">
                        <HStack>
                            <Box py="5" w="85%" px="5" mt="10">
                                <Text fontSize="md" fontWeight="bold">Welcome to:</Text>
                                <Text fontSize="xl" fontWeight="bold" mb="10" >Evergreen Cypress</Text>
                            </Box>
                            <Pressable onPress={() => navigation.navigate('Profile')} py="5" w="15%" mt="10">
                                <Avatar bg="green.500" source={{
                                    uri: "https://ldfotgflxcncnaameeig.supabase.co/storage/v1/object/public/registration.proof/public/profile.png"
                                }}>{residentData.name}</Avatar>

                            </Pressable>
                        </HStack>
                        <Box bg="blue.100" opacity="70" px="5" pt="2" pb="3" mt="18">
                            <Text fontWeight="bold">How can we help you, {residentData?.name} ? </Text>
                        </Box>
                    </Box>
                </Box>
                <Box bg="white" px="5" pt="10">
                    <HStack borderColor="coolGray.300" borderWidth="1" rounded="lg" px="3" py="5" space="5" mb="10" bg="white">
                        <Pressable onPress={() => navigation.navigate('Visitors')}>
                            <VStack alignItems="center">
                                <MaterialIcons name="people-alt" size={35} color="black" />
                                <Text>Visitors</Text>
                            </VStack>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Announcement')}>
                            <VStack alignItems="center">
                                <FontAwesome name="volume-up" size={35} color="black" />
                                <Text>Announcement</Text>
                            </VStack>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Feedback')}>
                            <VStack alignItems="center">
                                <MaterialIcons name="feedback" size={35} color="black" />
                                <Text>Feedbacks</Text>
                            </VStack>
                        </Pressable>
                    </HStack>
                    <Box mb="10">
                        <Heading size="md" mb="5">Upcoming Visitors</Heading>
                        {
                            visitationData != null ? <VisitorCard {...visitationData} navigation={navigation} /> : <Center mb="5"><Text>No upcoming visitors.</Text></Center>
                        }
                        <Center>
                            <Pressable
                                onPress={() => navigation.navigate('Visitors')}
                            >
                                <Text mt="1" fontSize={16} fontWeight="bold" color="gray.400" alignSelf="flex-start">
                                    View All Visitors
                                </Text>
                            </Pressable>
                        </Center>
                    </Box>
                    <Box mb="10">
                        <Heading size="md" mb="5">Latest Announcements</Heading>
                        <AnnouncementCard {...announcementData} navigation={navigation} divider={false} />
                    </Box>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
    );
}

export default Home;