import type { RenderOptions } from '@testing-library/react-native';

import type { ReactElement } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { render, userEvent } from '@testing-library/react-native';
import * as React from 'react';
import '@shopify/flash-list/jestSetup';

// Expo Router 58 no longer exports NavigationContainer, and none of the UI kit components use
// navigation, so the wrapper only provides the bottom sheet context.
function createAppWrapper() {
  return ({ children }: { children: React.ReactNode }) => (
    <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
  );
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  const Wrapper = createAppWrapper(); // make sure we have a new wrapper for each render
  return render(ui, { wrapper: Wrapper, ...options });
}

// use this if you want to test user events
export function setup(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  const Wrapper = createAppWrapper();
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

export * from '@testing-library/react-native';
export { customRender as render };
