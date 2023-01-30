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
import Test from '../test';

const AuthStack = createNativeStackNavigator();

function AuthScreenStack() {
    const state = {
        isSignout: true,
    }
    return (

        <AuthStack.Navigator initialRouteName="Welcome">
            <AuthStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false, title: "Welcome", }} />
            <AuthStack.Screen name="LoginR" component={LoginR} options={{ headerShown: true, title: "Login as Resident", }} />
            <AuthStack.Screen name="LoginSG" component={LoginSecurityGuard} options={{ headerShown: true, title: "Login as Security Guards", }} />
            <AuthStack.Screen name="LoginV" component={LoginVisitor} options={{ headerShown: true, title: "Login as Visitors", }} />
            <AuthStack.Screen name="Register" component={Register} options={{ headerShown: true, title: "Register", }} />
            <AuthStack.Screen name="HomeSG" component={HomeSG} />
            <AuthStack.Screen name="VisitorQR" component={VisitorQR} />
            <AuthStack.Screen name="AddVisitor" component={AddVisitor} options={{ title: 'Add New Visitor' }} />
            <AuthStack.Screen name="VerifiedVisitation" component={VerifiedVisitation} options={{ headerShown: false, headerBackVisible: false }} />
            <AuthStack.Screen name="VerifyVisitor" component={VerifyVisitor} options={{ title: 'Verify Visitor' }} />
            <AuthStack.Screen name="Test" component={Test} />
        </AuthStack.Navigator>

    );
}



export default AuthScreenStack;