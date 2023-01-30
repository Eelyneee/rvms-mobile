import React, { useEffect, useState } from "react";
import { Box, Center, NativeBaseProvider, Heading, Text, HStack, Fab, Button, Icon, Flex, Divider, FlatList, ScrollView, SectionList, Circle, Pressable } from "native-base";
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { getAllUpcomingVisitors, getAllVisitorsHistory, listenForVisitationChanges, removeVisitor, supabaseClient } from "../lib/supabase-client";
import VisitorCard from "../components/VisitorCard";

// visitator view in section list
const Visitors = ({ navigation }) => {

    const [visitationData, setVisitationData] = useState([]);
    const [visitationHistory, setVisitationHistory] = useState([]);
    const resident_id = supabaseClient.auth.user().id;

    const DATA = [
        {
            title: "Upcoming Visitors",
            data: visitationData
        },
        {
            title: "Visitors' History",
            data: visitationHistory
        }
    ]

    const loadAllVisitation = async () => {
        const { visitation, error } = await getAllUpcomingVisitors(resident_id);
        setVisitationData(visitation);
    }
    const loadAllHistory = async () => {
        const { visitation, error } = await getAllVisitorsHistory(resident_id);
        setVisitationHistory(visitation);
    }


    useEffect(() => {
        let abortController = new AbortController();
        loadAllVisitation();
        loadAllHistory();
        listenForVisitationChanges(loadAllVisitation);
        listenForVisitationChanges(loadAllHistory);
        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <NativeBaseProvider>
            <Fab renderInPortal={false} shadow={2} size="sm" placement="top-right" colorScheme="blue" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} onPress={() => navigation.navigate('AddVisitor')} />
            {/** possibly change to tab view so no need to do the no visitation first */}
            <SectionList
                sections={DATA}
                renderItem={({ item }) => <VisitorCard {...item} navigation={navigation} />}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={({ section: { title } }) => (
                    <Flex justify="center" bg="white" h={20} >
                        <Heading size="md" ml={2} >{title}</Heading>
                    </Flex>
                )}
                bg="white"
            />

        </NativeBaseProvider>
    );
}

export default Visitors;