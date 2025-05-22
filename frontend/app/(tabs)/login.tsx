import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Platform, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useState } from 'react';
import { SearchBar } from 'react-native-screens';
import { Button } from '@react-navigation/elements';
import { FaAlignCenter } from 'react-icons/fa';


export default function LoginScreen() {
    const [isLogging, setIsLogging] = useState(true);
    const [result, setResult] = useState(null);

    const { width, height } = Dimensions.get('window');

    const login = async () => {
        try {
            setIsLogging(true);
            const res = await fetch("http://10.0.0.107:8082/login");
        } catch (error) {
            console.error(error);
        }
        setIsLogging(false);
    }

    const register = async () => {
        try {
            setIsLogging(true);
            const res = await fetch("http://10.0.0.107:8082/register");
        } catch (error) {
            console.error(error);
        }
        setIsLogging(false);
    }
    


    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={<View style={{height: 0}} />}>
            <View style={styles.screen}>
                <ThemedView style={[styles.container, {width: width * 0.4, height: height * 0.22}, {borderRadius: 10}]}>
                    <View style={styles.form}>
                        <form>
                            <ThemedText style={{color: "black"}}>Username: </ThemedText>
                            <input name="username"/>
                            <ThemedText style={{color: "black"}}>Password: </ThemedText>
                            <input name="password" type="password" />
                        </form>
                    </View>

                    <View style={styles.buttonRow}>
                        <Button
                            onPress={login}
                            style={[{backgroundColor: "#f0f0f0"}, {marginRight: 20, marginTop: 45}, {borderRadius: 0}]}>Login</Button>
                        <Button
                            onPress={register}
                            style={[{backgroundColor: "#f0f0f0"}, {marginRight: 20, marginTop: 45}, {borderRadius: 0}]}>Register</Button>
                    </View>
                </ThemedView>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
    }
})