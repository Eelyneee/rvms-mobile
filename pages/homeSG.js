import React from "react";
import { Box, Center, NativeBaseProvider, HStack, Text, Button, VStack } from "native-base";
import { signOut, supabaseClient } from "../lib/supabase-client";

const HomeSG = ({ navigation }) => {
    const handleSignOut = async () => {
        await supabaseClient.auth.signOut();
        navigation.navigate('Welcome')
    }
    return (
        <NativeBaseProvider>
            <Box bg="white" >
                <VStack h="100%" justifyContent="space-between">
                    <HStack py={10} space={5} justifyContent="center">
                        <Button h="150" w="150" bg="white" borderWidth="2" borderColor="blue.600" colorScheme={"#dbdeff"} rounded="md" shadow={3} onPress={() => navigation.navigate('VerifyVisitor')}>
                            <Text px={5} textAlign="center" fontWeight={"bold"} color="blue.600" fontSize="md">Verify registered visitors</Text>
                        </Button>
                        <Button h="150" w="150" bg="white" borderWidth="2" borderColor="#f04911" colorScheme={"#ffb49c"} rounded="md" shadow={3} onPress={() => navigation.navigate('AddVisitor')} >
                            <Text px={5} textAlign="center" fontWeight={"bold"} color="#f04911" fontSize="md" >Register Ad-hoc visitors</Text>
                        </Button>
                    </HStack>
                    <Box m="8">
                        <Button background={"blue.600"} onPress={handleSignOut}>Sign Out</Button>
                    </Box>
                </VStack>
            </Box>
        </NativeBaseProvider>);
}

export default HomeSG;