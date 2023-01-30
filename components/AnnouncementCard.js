import React from "react";
import { Box, AspectRatio, Stack, Heading, Text, Button, Divider, Image, HStack } from "native-base";
import { getDateAndTimeFromDB } from "../lib/functions";

const AnnouncementCard = ({ id, title, administrators, description, publish_date, publish_time, navigation, divider, images }) => {

    let imageURL = "https://ldfotgflxcncnaameeig.supabase.co/storage/v1/object/public/" + images?.Key;

    return (
        <Box>
            <Box alignItems="center">
                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                            {
                                images != null ?
                                    <Image source={{
                                        uri: imageURL
                                    }} alt="Announcement-image" />
                                    :
                                    <Image source={{
                                        uri: "https://ldfotgflxcncnaameeig.supabase.co/storage/v1/object/public/announcement.img/fallback"
                                    }} alt="Announcement-image" />
                            }
                        </AspectRatio>
                    </Box>
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                                {title}
                            </Heading>
                            <Text fontSize="xs" _light={{
                                color: "blue.500"
                            }} _dark={{
                                color: "blue.400"
                            }} fontWeight="500" ml="-0.5" mt="-1">
                                Published by: {administrators?.name}
                            </Text>
                        </Stack>
                        <Text fontWeight="400" noOfLines={1}>
                            {description}
                        </Text>
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    {publish_date + " " + publish_time}
                                </Text>
                            </HStack>
                        </HStack>
                        <Button bg="#4484FF"
                            onPress={() => navigation.navigate('ViewAnnouncement', { announcementID: id })}>View More</Button>
                    </Stack>
                </Box>
            </Box>
            {
                divider == true ? <Divider my={10} /> : ""
            }

        </Box>
    );

};

export default AnnouncementCard;