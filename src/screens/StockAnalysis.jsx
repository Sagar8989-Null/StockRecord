// import React from 'react';
// import { View, Text, Dimensions, ScrollView } from 'react-native';
// import { BarChart, LineChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;

// const StockAnalysis = ({ data }) => {

//   const labels = data.map(item => item.name);
//   const soldData = data.map(item => item.sold);

//   return (
//     <ScrollView style={{ flex: 1, padding: 16 }}>
//       <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
//         Stock Analysis
//       </Text>

//       {/* BAR CHART */}
//       <Text style={{ marginBottom: 5 }}>Most / Least Sold (Bar Chart)</Text>
//       <BarChart
//         data={{
//           labels,
//           datasets: [{ data: soldData }]
//         }}
//         width={screenWidth - 30}
//         height={250}
//         yAxisLabel=""
//         chartConfig={{
//           backgroundColor: '#ffffff',
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           decimalPlaces: 0,
//           color: () => '#4CAF50',
//           labelColor: () => '#000'
//         }}
//         style={{ borderRadius: 10 }}
//       />

//       {/* LINE CHART */}
//       <Text style={{ marginVertical: 10 }}>
//         Sales Trend (Line Graph)
//       </Text>
//       <LineChart
//         data={{
//           labels,
//           datasets: [{ data: soldData }]
//         }}
//         width={screenWidth - 30}
//         height={250}
//         chartConfig={{
//           backgroundColor: '#ffffff',
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           decimalPlaces: 0,
//           color: () => '#2196F3',
//           labelColor: () => '#000'
//         }}
//         bezier
//         style={{ borderRadius: 10 }}
//       />
//     </ScrollView>
//   );
// };

// export default StockAnalysis;
