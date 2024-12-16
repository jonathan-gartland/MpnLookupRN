// import { StyleSheet, Text, View } from "react-native";
//
// export default function Page() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.main}>
//         <Text style={styles.title}>Hello</Text>
//         <Text style={styles.subtitle}>This is the first page of your app.</Text>
//       </View>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 960,
//     marginHorizontal: "auto",
//   },
//   title: {
//     fontSize: 64,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 36,
//     color: "#38434D",
//   },
// });

import React from 'react';
// import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
  // View,
  // Text,
  // Linking,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import ButtonView from '@/components/button-view';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({ children, title }: SectionProps): React.JSX.Element {
//   return <View style={styles.sectionContainer}>{children}</View>;
// }

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <ButtonView />
      </ScrollView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;


