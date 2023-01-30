import * as React from 'react';
import { Text, View, Button, Icon } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, AntDesig, FontAwesome } from '@expo/vector-icons';
import Visitors from './visitors';
import Announcement from './announcement';
import Feedbacks from './feedback';
import Home from './home';

const Tab = createBottomTabNavigator();

export default function HomeTab({ navigation }) {
    return (
        <>
            <Tab.Navigator
                activeColor="#f0edf6"
                inactiveColor="#3e2465"
                barStyle={{ backgroundColor: '#694fad' }}>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ), tabBarColor: "blue", unmountOnBlur: true
                }} />
                <Tab.Screen name="Visitors" component={Visitors} options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="people-alt" size={24} color={color} />
                    ), unmountOnBlur: true
                }} />
                <Tab.Screen name="Announcement" component={Announcement} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="volume-up" size={24} color={color} />
                    ), unmountOnBlur: true
                }} />
                <Tab.Screen name="Feedback" component={Feedbacks} options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="feedback" size={24} color={color} />
                    ), unmountOnBlur: true
                }} />
            </Tab.Navigator>
        </>

    );
}