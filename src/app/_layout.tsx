import * as Sentry from '@sentry/react-native';
import { Slot } from 'expo-router';
import React from 'react';

Sentry.init({
  dsn: 'https://cf2b7330a424516f2800096c44e85b57@o4512403073990657.ingest.us.sentry.io/4512403089195008',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

function RootLayout() {
  return <Slot />;
}

export default Sentry.wrap(RootLayout);
