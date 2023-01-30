import React from "react";
import { Box, Center, NativeBaseProvider, Button, Image, Heading, Text, Link, Pressable } from "native-base";

const Welcome = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Box bg="white" h="100%" position='relative'>
                <Image src="https://ldfotgflxcncnaameeig.supabase.co/storage/v1/object/public/resident.profile/welcome.png" alt="welcome"
                    position="absolute" width="100%" height="100%"
                />
                <Box pt={10} p={6}>
                    <Heading size="3xl" color="blue">Residents & </Heading>
                    <Heading size="3xl" mb={10}>Visitors Management Application</Heading>
                    <Center >
                        <Heading size="lg" mb={5}> Login as</Heading>
                        <Pressable
                            borderColor="#4484FF" mb={3} p="2" rounded="lg" borderWidth="1" bg="#fff"
                            onPress={() => navigation.navigate('LoginR')}
                        ><Text color="#4484FF" fontWeight="bold">Resident</Text></Pressable>
                        <Text fontSize="md" fontWeight="bold" mb={3}>or</Text>
                        <Pressable
                            borderColor="#4484FF" mb={3} p="2" rounded="lg" borderWidth="1" bg="#fff"
                            onPress={() => navigation.navigate('LoginV')}
                        ><Text color="#4484FF" fontWeight="bold">Visitor</Text></Pressable>
                        <Text fontSize="md" fontWeight="bold" mb={3}>or</Text>
                        <Pressable
                            borderColor="#4484FF" mb={3} p="2" rounded="lg" borderWidth="1" bg="#fff"
                            onPress={() => navigation.navigate('LoginSG')}
                        ><Text color="#4484FF" fontWeight="bold">Security Guard</Text></Pressable>
                        <Text>Contact <Link href="mailto:management@rsvm.com">Management Team</Link></Text>
                    </Center>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
}

export default Welcome;