import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../welcome';
import LoginR from '../loginR';
import LoginSecurityGuard from '../loginSG';
import LoginVisitor from '../loginV';
import Register from '../register';
import HomeSG from '../homeSG';
import Home from '../home';
import VerifyVisitor from '../verifiedVisitor';
import AddVisitor from '../addVisitor';
import VerifiedVisitation from '../verifiedVisitation';
import VisitorQR from '../visitorQR';

const SGHomeStack = createNativeStackNavigator();

function SGHomeScreenStack() {
    const state = {
        isSignout: true,
    }
    return (

        <SGHomeStack.Navigator initialRouteName="HomeSG">
            <SGHomeStack.Screen name="HomeSG" component={HomeSG} />
            <SGHomeStack.Screen name="VisitorQR" component={VisitorQR} />
            <SGHomeStack.Screen name="AddVisitor" component={AddVisitor} options={{ title: 'Add New Visitor' }} />
            <SGHomeStack.Screen name="VerifiedVisitation" component={VerifiedVisitation} option={{ headerShown: false }} />
            <SGHomeStack.Screen name="VerifyVisitor" component={VerifyVisitor} options={{ title: 'Verify Visitor' }} />
        </SGHomeStack.Navigator>

    );
}



export default SGHomeScreenStack;