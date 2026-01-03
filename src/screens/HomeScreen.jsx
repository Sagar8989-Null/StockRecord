import React, { useState, useEffect } from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AllItems from './AllItems'
import Create from './Create'
import ManageStock from './ManageStock'
// import StockAnalysis from './StockAnalysis'

const STORAGE_KEY = '@stock_data';

const HomeScreen = () => {

    const [view, setview] = useState(0)
    const [data, setdata] = useState([])

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        saveData(data);
    }, [data]);

    const loadData = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                setdata(JSON.parse(stored));
            }
        } catch (err) {
            console.log('Load error:', err);
        }
    };

    const saveData = async (items) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (err) {
            console.log('Save error:', err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>DashBoard</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, view === 0 ? { backgroundColor: '#72C37AFF' } : null]} onPress={() => setview(0)}>
                    <Text style={[styles.btntext, view === 0 ? { color: '#ffffffff' } : null]}>All items</Text>
                </Pressable>
                <Pressable style={[styles.button, view === 1 ? { backgroundColor: '#72C37AFF' } : null]} onPress={() => setview(1)}>
                    <Text style={[styles.btntext, view === 1 ? { color: '#ffffffff' } : null]}>Low Stock</Text>
                </Pressable>
                <Pressable style={[styles.button, view === 2 ? { backgroundColor: '#72C37AFF' } : null]} onPress={() => setview(2)}>
                    <Text style={[styles.btntext, view === 2 ? { color: '#ffffffff' } : null]}>Create</Text>
                </Pressable>
                <Pressable style={[styles.button, view === 3 ? { backgroundColor: '#72C37AFF' } : null]} onPress={() => setview(3)}>
                    <Text style={[styles.btntext, view === 3 ? { color: '#ffffffff' } : null]}>Manage</Text>
                </Pressable>
                {/* <Pressable onPress={() => setview(4)}><Text>Analysis</Text></Pressable> */}

            </View>
            {view === 0 && <AllItems data={data} />}
            {view === 1 && <AllItems data={data.filter((item) => item.stock <= item.minstock)} />}
            {view === 2 && <Create data={data} setdata={setdata} />}
            {view === 3 && <ManageStock data={data} setdata={setdata} />}
            {/* {view === 4 && <StockAnalysis data={data} />} */}
        </SafeAreaView>
    )
}


export default HomeScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#ffffffff'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
    },

    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },

    button: {
        marginBottom: 10,
        padding: '3%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#72C37AFF'
    },

    btntext: {
        color: '#72C37AFF',
        fontSize: 12,
    }
})
