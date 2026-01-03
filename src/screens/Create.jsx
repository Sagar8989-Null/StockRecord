import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, FlatList } from 'react-native'

const Create = ({ data, setdata }) => {

    const [itemName, setitemName] = useState('')
    const [stockamount, setstockamount] = useState('')
    const [isEdit, setisEdit] = useState(false)
    const [edititemId, setedititemId] = useState(null)

    const resetForm = () => {
        setitemName('');
        setstockamount('');
        setedititemId(null);
        setisEdit(false);
    };

    const AddItemhandler = () => {
        if (!itemName.trim() || !stockamount.trim()) {
            alert('All fields are required');
            return;
        }

        if (isNaN(stockamount) || Number(stockamount) <= 0) {
            alert('Stock must be a positive number');
            return;
        }

        if (Number(stockamount) > 10000) {
            alert('Stock value too large');
            return;
        }

        const duplicate = data.find(
            item => item.name.toLowerCase() === itemName.toLowerCase()
        );

        if (duplicate) {
            alert('Item already exists');
            return;
        }
        const newItem = {
            id: Date.now(),
            name: itemName,
            stock: stockamount
        }
        setdata([...data, newItem]);
        resetForm();
    }

    const deleteitemhandler = (id) => {
        setdata(data.filter((item) => item.id !== id))
    }

    const edititemhandler = (item) => {
        setisEdit(true);
        setedititemId(item.id);
        setitemName(item.name);
        setstockamount(item.stock.toString());
    }

    const updateitemhandler = () => {
        if (!itemName.trim() || !stockamount.trim()) {
            alert('All fields are required');
            return;
        }

        if (isNaN(stockamount) || Number(stockamount) <= 0) {
            alert('Invalid stock value');
            return;
        }
        setdata(data.map((item) =>
            item.id === edititemId ? { ...item, name: itemName, stock: stockamount } : item
        ));

        resetForm();
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Enter Your item Name'
                placeholderTextColor='#999'
                style={styles.input}
                value={itemName}
                onChangeText={(item) => setitemName(item)}
            />

            <TextInput
                placeholder='Enter Stock Amount...'
                placeholderTextColor='#999'
                style={styles.input}
                value={stockamount}
                onChangeText={(item) => setstockamount(item)}
                keyboardType='numeric'
            />

            <Pressable style={styles.button} onPress={() => isEdit ? updateitemhandler() : AddItemhandler()}>
                <Text style={styles.btntext}>{isEdit ? 'EDIT ITEM' : 'ADD ITEM IN STOCK'}</Text>
            </Pressable>

            <View style={{ marginTop: 10 }}>
                <View>
                    <Text style={styles.headingText}>All Items in the Stock</Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.itemContainer, { backgroundColor: item.stock < 20 ? "#FFCCCC" : "#D7F6BF" }]}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.itemText}>{item.stock}</Text>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Pressable onPress={() => edititemhandler(item)}>
                                    <Text style={styles.itemText}>Edit</Text>
                                </Pressable>
                                <Pressable onPress={() => deleteitemhandler(item.id)}>
                                    <Text style={styles.itemText}>Delete</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={{ gap: 10 }}
                />
            </View>

        </View>
    )
}

export default Create

const styles = StyleSheet.create({

    container: {
        paddingVertical: '4%',
        gap: 10,
    },
    input: {
        borderColor: '#D7F6BFFF',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: '#CABFEEFF',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btntext: {
        color: 'white',
    },
    headingcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    headingText: {
        fontWeight: '800',
        fontSize: 16,
        marginVertical: 10,
    },

    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7,
    },

    itemText: {
        fontWeight: '500',
        fontSize: 15,
    },
})

