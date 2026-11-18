import * as React from 'react';
import { SafeAreaView, ScrollView, useColorScheme } from 'react-native';

import ButtonView from '@/components/button-view';

// Former react-native/Libraries/NewAppScreen colors (removed in React Native 0.81)
const BACKGROUND = { dark: '#222', light: '#F3F3F3' };

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? BACKGROUND.dark : BACKGROUND.light,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <ButtonView />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
