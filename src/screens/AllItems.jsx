import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

const AllItems = ({ data }) => {
    return (
        <View>
            <View style={styles.headingcontainer}>
                <Text style={styles.headingText}>Items</Text>
                <Text style={styles.headingText}>Quantity</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item})=>(
                    <View style={[styles.itemContainer,{backgroundColor:item.stock <= item.minstock ? "#FFCCCC" : "#D7F6BF"}]}> 
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemText}>{item.stock}</Text>
                    </View>
                )}

                contentContainerStyle={{gap:10}}
            />
        </View>
    )
}

export default AllItems

const styles = StyleSheet.create({
    headingcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    headingText: {
        fontWeight: '800',
        fontSize: 16,
    },

    itemContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius:7,
    },

    itemText: {
        fontWeight: '500',
        fontSize: 15,
    },
})