import React, { useState, useEffect } from "react";
import { Box, Center, NativeBaseProvider, Button, Heading, Text, HStack, VStack, AspectRatio, Image, Stack, Divider, ScrollView } from "native-base";
import { getAnnouncementById } from "../lib/supabase-client";
import { getDateAndTimeFromDB } from "../lib/functions";

const ViewAnnouncement = ({ route, navigation }) => {

    const { announcementID } = route.params;
    const [announcementData, setAnnouncementData] = useState({});
    const [imageURL, setImageURL] = useState("https://www.w3schools.com/css/img_lights.jpg");

    const loadAnnouncement = async () => {
        const { announcement, error } = await getAnnouncementById(announcementID);
        setAnnouncementData(announcement);
        let image = "https://ldfotgflxcncnaameeig.supabase.co/storage/v1/object/public/" + announcement?.images?.Key;
        setImageURL(image);
    }

    useEffect(() => {
        loadAnnouncement();
    }, [announcementID]);


    return (
        <NativeBaseProvider>
            <ScrollView bg="white">
                <Box alignItems="center" mt={10} mb={20}>
                    <Box p="4" maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700"
                    }} _web={{
                        shadow: 2,
                        borderWidth: 0
                    }} _light={{
                        backgroundColor: "gray.50"
                    }}>
                        <Stack space={2}>
                            <Heading size="lg" ml="-1">
                                {announcementData?.title}
                            </Heading>
                            <Text fontSize="xs" _light={{
                                color: "blue.500"
                            }} _dark={{
                                color: "blue.400"
                            }} fontWeight="500" ml="-0.5" mt="-1">
                                Published by: {announcementData?.administrators?.name}
                            </Text>
                        </Stack>

                        <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }} fontWeight="400" mb={10}>
                            {
                                announcementData?.publish_date + " " + announcementData?.publish_time
                            }
                        </Text>
                        <Center>
                            <AspectRatio w="100%" ratio={4 / 3}>
                                {
                                    announcementData?.images != null ?
                                        <Image source={{
                                            uri: imageURL
                                        }} alt="Announcement image" />
                                        :
                                        <Image source={{
                                            uri: "https://ldfotgflxcncnaameeig.supabase.co/storage/v1/object/public/announcement.img/fallback"
                                        }} alt="Announcement image" />
                                }
                            </AspectRatio>
                        </Center>

                        <Stack p="4">
                            <Text fontWeight="400">
                                {announcementData?.description}
                            </Text>

                        </Stack>
                    </Box>
                </Box>
            </ScrollView>
        </NativeBaseProvider>);
}

export default ViewAnnouncement;