import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

const MAX_BAR_HEIGHT = 180;
const StockAnalysis = ({ data }) => {

    const maxSold = Math.max(...data.map(item => item.sold ?? 0));
    const mostSoldItem = data.find(item => item.sold === maxSold);
    const soldValues = data.map(item => item.sold ?? 0).filter(v => v > 0);
    const leastSold = soldValues.length ? Math.min(...soldValues) : 0;
    const leastSoldItem = data.find(item => item.sold === leastSold);

    if (!data || data.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No stock data available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stock Analysis</Text>
            {/* BAR GRAPH */}
            <Text style={[styles.subtitle,{marginVertical: 10,}]}>Most / Least Sold</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <View style={styles.barChart}>
                    {data.map(item => {
                        const barHeight = (item.sold / maxSold) * MAX_BAR_HEIGHT;
                        return (
                            <View key={item.id} style={styles.barItem}>
                                <View style={[styles.bar, { height: barHeight }]} />
                                <Text style={styles.barValue}>{item.sold}</Text>
                                <Text style={styles.barLabel}>{item.name}</Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <View style={{ marginVertical: 20 }}>
                <Text style={[styles.subtitle,{color:'#4CAF50'}]}>
                    Most sold : {mostSoldItem?.name} ({maxSold})
                </Text>
                <Text style={[styles.subtitle,{color:'red'}]}>
                    Least sold : {leastSoldItem?.name} ({leastSold})
                </Text>
            </View>
        </View>
    );
};

export default StockAnalysis;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingVertical: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '800'
    },
    subtitle: {
        // marginVertical: 10,
        fontWeight: '600'
    },
    barChart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: MAX_BAR_HEIGHT + 40
    },
    barItem: {
        alignItems: 'center',
        marginHorizontal: 6
    },
    bar: {
        width: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 4
    },
    barValue: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    barLabel: {
        fontSize: 10,
        marginTop: 4
    },
});
