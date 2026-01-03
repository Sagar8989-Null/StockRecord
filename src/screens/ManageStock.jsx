import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

const ManageStock = ({ data, setdata }) => {

  const sellItem = (id) => {
    setdata(prev =>
      prev.map(item =>
        item.id === id && item.stock > 0
          ? {
            ...item,
            stock: item.stock - 1,
            sold: (item.sold || 0) + 1
          }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Stock</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              item.stock <= item.minstock && styles.lowStock
            ]}
          >
            <Text style={styles.itemheading}>{item.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.text}>Sold: {item.sold}</Text>
              <Text style={styles.text}>Stock: {item.stock}</Text>
            </View>

            <Pressable
              style={[
                styles.sellBtn,
                item.stock === 0 && styles.disabled
              ]}
              onPress={() => sellItem(item.id)}
              disabled={item.stock === 0}
            >
              <Text style={styles.btnText}>SELL</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default ManageStock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10
  },
  item: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#EAF7EA',
    borderRadius: 8
  },
  itemheading: {
    fontSize: 18,
    fontWeight: 600,
    paddingBottom: 5,
  },
  lowStock: {
    backgroundColor: '#FFD6D6'
  },
  text: {
    fontWeight: '500',
    fontSize: 15,
  },
  sellBtn: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center'
  },
  disabled: {
    backgroundColor: '#999'
  },
  btnText: {
    color: '#fff',
    fontWeight: '500'
  }
});
