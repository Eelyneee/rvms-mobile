import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddVisitor from '../addVisitor';
import HomeTab from '../homeTab';
import Visitors from '../visitors';
import ViewVisitor from '../viewVisitor';
import Feedbacks from '../feedback';
import NewFeedback from '../newFeedback';
import ViewFeedback from '../viewFeedback';
import Announcement from '../announcement';
import ViewAnnouncement from '../viewAnnouncement';
import Profile from '../Profile';
import VisitorQR from '../visitorQR';
import VerifiedVisitation from '../verifiedVisitation';
import HomeSG from '../homeSG';
import VerifyVisitor from '../verifiedVisitor';
import { getAccountByID, supabaseClient } from '../../lib/supabase-client';

const HomeStack = createNativeStackNavigator();


function RHomeScreenStack() {
    const [accountType, setAccountType] = useState("");
    const loadAccount = async () => {
        console.log(accountType);
        if (supabaseClient.auth.user()) {
            const { account, error } = await getAccountByID(supabaseClient.auth.user().id);
            setAccountType(account?.account_type);
        } else {
            setAccountType("");
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        loadAccount();
        return () => controller.abort();
    }, [])

    return (
        <HomeStack.Navigator initialRouteName={"HomeTab"} >
            {/* <HomeStack.Navigator initialRouteName={accountType == "resident" ? "HomeTab" : "HomeSG"} > */}
            <HomeStack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
            <HomeStack.Screen name="Visitor" component={Visitors} options={{ headerBackVisible: false }} />
            <HomeStack.Screen name="AddVisitor" component={AddVisitor} options={{ title: 'Add New Visitor', headerBackVisible: true }} />
            <HomeStack.Screen name="ViewVisitor" component={ViewVisitor} options={{ title: 'View Visitor' }} />
            <HomeStack.Screen name="Feedbacks" component={Feedbacks} options={{ title: 'Feedback', headerBackVisible: false }} />
            <HomeStack.Screen name="ViewFeedback" component={ViewFeedback} options={{ title: 'View Feedback' }} />
            <HomeStack.Screen name="NewFeedback" component={NewFeedback} options={{ title: 'Add New Feedback' }} />
            <HomeStack.Screen name="Announcement" component={Announcement} />
            <HomeStack.Screen name="ViewAnnouncement" component={ViewAnnouncement} options={{ title: 'View Announcement' }} />
            <HomeStack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
            <HomeStack.Screen name="VisitorQR" component={VisitorQR} options={{ title: 'Verify Visitation', headerBackVisible: false }} />
            <HomeStack.Screen name="VerifiedVisitation" component={VerifiedVisitation} options={{ headerShown: false }} />
            <HomeStack.Screen name="HomeSG" component={HomeSG} options={{ title: 'Home', headerBackVisible: false }} />
            <HomeStack.Screen name="VerifyVisitor" component={VerifyVisitor} options={{ title: 'Verify Visitor', headerBackVisible: false }} />
        </HomeStack.Navigator>

    );
}



export default RHomeScreenStack;