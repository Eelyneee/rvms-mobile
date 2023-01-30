import React, { useState, useEffect } from "react";
import { Box, Center, NativeBaseProvider, Button, Heading, Text, HStack, VStack, AspectRatio, Image, Stack, Divider, ScrollView, FlatList } from "native-base";
import { getAllAnnouncements, listenForAnnouncementChange, supabaseClient } from "../lib/supabase-client";
import AnnouncementCard from "../components/AnnouncementCard";
import { createClient } from "@supabase/supabase-js";

const Announcement = ({ navigation }) => {

    const [announcementData, setAnnouncementData] = useState([]);



    const loadAllAnnouncements = async () => {

        const { announcements, error } = await getAllAnnouncements();
        setAnnouncementData(announcements);
    }


    useEffect(() => {
        loadAllAnnouncements();
    }, [])


    useEffect(() => {
        const client = createClient("https://ldfotgflxcncnaameeig.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZm90Z2ZseGNuY25hYW1lZWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ0ODcyMzEsImV4cCI6MTk3MDA2MzIzMX0.ahVip8dq6j2Pmyso84QAYeM10dsYmhF1zEiSYtnE8kc")
        const subscription = client
            .from('announcements')
            .on('*', payload => {
                console.log('Change received!', payload)
                loadAllAnnouncements();
            })
            .subscribe()
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return (
        <NativeBaseProvider>

            <FlatList
                data={announcementData}
                renderItem={({ item }) => <AnnouncementCard {...item} navigation={navigation} divider={true} />}
                keyExtractor={item => item.id}
                py={10}
                bg="white"
            />



        </NativeBaseProvider>);
}

export default Announcement;