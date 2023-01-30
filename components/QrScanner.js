import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScanner({ navigation, loadVisitationFromDB }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');


    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    //Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);


    //What happen when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        // setScanned(true);
        // setText(data);
        loadVisitationFromDB(data);
        setScanned(true);
    }


    //Check permission and return the screens
    if (hasPermission == null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for Camera Permission</Text>
            </View>
        );
    }

    if (hasPermission == false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={askForCameraPermission} />
            </View>
        );

    }

    //return the view
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                {!scanned &&
                    <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ height: 400, width: 400 }} />
                }
            </View>
            {/* <Text style={styles.maintext}>{text}</Text> */}
            {scanned && <Button title={"Scan again"} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodebox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
        marginBottom: 20

    },
    maintext: {
        fontSize: 16,
        margin: 20,
    }
});
