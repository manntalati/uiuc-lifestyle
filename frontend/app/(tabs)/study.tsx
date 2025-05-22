import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Text, View, StyleSheet, FlatList, Dimensions, Linking, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useEffect, useState } from 'react';


export default function StudyScreen() {
    const [isLogging, setIsLogging] = useState(true);
    const [result, setResult] = useState<any>(null);
    const [ratings, setRatings] = useState<Record<string, number>>({});

    const { width, height } = Dimensions.get('window');

    const handleRating = (space: string, rating: number) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [space]: rating,
        }));
    }

    useEffect(() => {
        const spaces = async () => {
            setIsLogging(true);
            try {
                const res = await fetch("http://10.0.0.107:8082/studyspaces");
                const data = await res.json();
                setResult(data);
            } catch (error) {
                console.error(error);
            }
            setIsLogging(false);
        };
        spaces();
    }, []);



    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={<View style={{height: 0}} />}>

            
            <ThemedText style={styles.title}>Official Study Spaces</ThemedText>
            <ThemedView>
                <FlatList
                    data={result}
                    keyExtractor={(_, i) => i.toString()}
                    numColumns={2}
                    style={styles.list}
                    renderItem={({ item }) => {
                        const link = item['Reservable Rooms'] > 0
                        ? 'https://uiuc.libcal.com/allspaces'
                        : '';
                        const rating = 0; // this rating will be replaced with backend system from flask

                    return (
                        <View style={[styles.card, {width: width * 0.4, height: height * 0.22, backgroundColor: '#f0f0f0'},]}>
                            <View style={styles.headerRow}>
                                <Text style={styles.symbol}>{item.Building}</Text>
                                <View style={styles.reviews}>
                                    {[1,2,3,4,5].map(i => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => handleRating(item.symbol, i)}
                                        activeOpacity={0.7}
                                    >
                                    <Ionicons
                                        name={ rating >= i ? 'star' : 'star-outline' }
                                        size={24}
                                        color={ rating >= i ? '#f5c518' : '#aaa' }
                                        style={{ marginHorizontal: 2 }}
                                    />
                                    </TouchableOpacity>
                                ))}
                                </View>
                            </View>
                            <Text style={styles.body}>{item.Space}</Text>
                            <Text style={styles.body}>Maximum Occupancy: {item['Maximum Occupancy']}</Text>
                            <Text style={styles.body}>Reservable Rooms: {item['Reservable Rooms']}</Text>
                            <Text style={[styles.body, styles.link]} onPress={() => Linking.openURL('https://uiuc.libcal.com/allspaces')}>{link}</Text>
                        </View>
                        
                    );
                }}
                />
                <ThemedView style={styles.button}>
                    <Button title={"Add New Space"}></Button>
                </ThemedView>
            </ThemedView>
                
            <ThemedText style={styles.title2}>Unofficial Study Spaces</ThemedText>
            {/* This part will be entirely based on users and what they input (so maybe use some sort of database) */}     
                <ThemedView style={styles.button}>
                    <Button title={"Add New Space"}></Button>
                </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    button: {
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        marginRight: 1060,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviews: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    link: {
        textDecorationLine: 'underline',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        marginLeft: 10,
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
        marginTop: 20,
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
    card: {
        marginLeft: 10,
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    symbol: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    body: {
        fontSize: 16,
    },
})