import React, { useEffect, useState, useCallback } from "react";
import { Box, Center, NativeBaseProvider, Heading, Text, HStack, Fab, Button, Icon, Flex, Divider, FlatList, ScrollView, SectionList, Circle, Pressable } from "native-base";
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { getAllUpcomingVisitors, getAllVisitorsHistory, listenForVisitationChanges, removeVisitor, supabaseClient } from "../lib/supabase-client";
import VisitorCard from "../components/VisitorCard";
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { createClient } from "@supabase/supabase-js";

const Visitors = ({ navigation }) => {
    const [visitationData, setVisitationData] = useState([]);
    const [visitationHistory, setVisitationHistory] = useState([]);
    const resident_id = supabaseClient.auth.user().id;

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'upcoming', title: 'Upcoming Visitors' },
        { key: 'history', title: 'History' },
    ]);

    const FirstRoute = () => (
        <Box bg="#fff">
            {
                visitationData.length != 0 ?
                    <FlatList
                        data={visitationData}
                        renderItem={({ item }) => <VisitorCard {...item
                        } navigation={navigation} />}
                        keyExtractor={item => item.id}
                        py={10}
                        bg="white"
                    /> : <Text color="black" fontSize="lg" p="10">No upcoming visitors...</Text>
            }
        </Box>

    );
    const SecondRoute = () => (
        <Box>
            {visitationHistory.length != 0 ? <FlatList
                data={visitationHistory}
                renderItem={({ item }) => <VisitorCard {...item} navigation={navigation} />}
                keyExtractor={item => item.id}
                py={10}
                bg="white"
            /> : <Text color="black" fontSize="lg" p="10">No visitors history...</Text>}
        </Box>

    );

    const renderScene = SceneMap({
        upcoming: FirstRoute,
        history: SecondRoute,
    });

    const loadAllVisitation = async () => {
        const { visitation, error } = await getAllUpcomingVisitors(resident_id);
        setVisitationData(visitation);
    }

    const loadAllHistory = async () => {
        const { visitation, error } = await getAllVisitorsHistory(resident_id);
        setVisitationHistory(visitation);
    }


    useEffect(() => {
        // let abortController = new AbortController();
        loadAllVisitation();
        loadAllHistory();
        listenForVisitationChanges(loadAllVisitation);
        listenForVisitationChanges(loadAllHistory);
        // return () => {
        //     abortController.abort();
        // }
    }, []);

    useEffect(() => {
        const client = createClient("https://ldfotgflxcncnaameeig.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZm90Z2ZseGNuY25hYW1lZWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ0ODcyMzEsImV4cCI6MTk3MDA2MzIzMX0.ahVip8dq6j2Pmyso84QAYeM10dsYmhF1zEiSYtnE8kc")
        const subscription = client
            .from('visitation')
            .on('*', payload => {
                console.log('Change received!', payload)
                loadAllVisitation();
                loadAllHistory();
            })
            .subscribe()
        return () => {
            subscription.unsubscribe()
        }
    }, [])


    // useEffect(() => {
    //     console.log("call listen")
    //     listenForVisitationChanges(loadAllVisitation);//
    //     listenForVisitationChanges(loadAllHistory);//
    //     loadAllVisitation();
    //     loadAllHistory();
    // }, [navigation])

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            // listenForVisitationChanges(); //no working
            loadAllVisitation();
            loadAllHistory();
            console.log("refreshed")
        });
        return focusHandler;
    }, [navigation]);



    return (
        <NativeBaseProvider>
            <Fab renderInPortal={false} shadow={2} size="sm" placement="bottom-left" bg="#4231FF" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} onPress={() => navigation.navigate('AddVisitor')} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </NativeBaseProvider>
    );
}

export default Visitors;