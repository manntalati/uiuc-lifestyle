import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Platform, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useState } from 'react';


export default function LoginScreen() {
    const [isLogging, setIsLogging] = useState(true);
    const [result, setResult] = useState(null);

    const { width, height } = Dimensions.get('window');

    const login = async () => {
        try {
            setIsLogging(true);
            const res = await fetch("https://ipaddress:8082/login");
        } catch (error) {
            console.error(error);
        }
        setIsLogging(false);
    }

    const register = async () => {
        try {
            setIsLogging(true);
            const res = await fetch("https://ipaddress:8082/register");
        } catch (error) {
            console.error(error);
        }
        setIsLogging(false);
    }
    


    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={<View style={{height: 0}} />}>
            {/*<FormData>*/}

            {/*</FormData>*/}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
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
})