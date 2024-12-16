import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react-native';

import ButtonView from '@/components/button-view';
import { Text, TouchableOpacity } from 'react-native';

describe('Home', () => {

  beforeEach(() => {
    render(<ButtonView />);
  });

  // afterEach(() => {});

  it('renders MPN Lookup Home view, all 4 buttons and title visible', () => {
    const title = screen.getByTestId('mpnl-title');
    const qtButton = screen.getByTestId('qt-button');
    const qt2kButton = screen.getByTestId('qt2k-button');
    const qtLButton = screen.getByTestId('qtl-button');
    const aboutButton = screen.getByTestId('about-button');
    const onPressMock = jest.fn();

    expect(title).toBeOnTheScreen();
    expect(title.props.children).toBe('MPN Lookup');
    expect(qtButton).toBeOnTheScreen();
    expect(qt2kButton).toBeOnTheScreen();
    expect(qtLButton).toBeOnTheScreen();
    expect(aboutButton).toBeOnTheScreen();
  });

  it('onTouchableOpacityPress is called when pressed', () => {
    // practice with mocks, if I had composed the components as standalone react
    // components, I could test them using similar methods
    const onTouchableOpacityPressMock = jest.fn();
    const { getByTestId } = render(
      <TouchableOpacity
        testID="about-button"
        onPress={() => onTouchableOpacityPressMock('about-button')}
      >
        <Text>About</Text>
      </TouchableOpacity>);
    fireEvent.press(getByTestId('about-button'));
    expect(onTouchableOpacityPressMock).toHaveBeenCalledWith('about-button');
  });


  it("clicks the About button and verifies Have Fun! text", async () => {
    fireEvent.press(screen.getByText("About"));
    expect(await screen.findByText(/have fun!/i)).toBeOnTheScreen();
  });

  it("clicks the Quantitray&reg; button and verifies text", async () => {
    fireEvent.press(screen.getByTestId("qt-button"));
    expect(await screen.findByText(/Quantitray/i)).toBeOnTheScreen();
  });

  it("clicks the Quantitray2000$reg; button and verifies text", async () => {
    fireEvent.press(screen.getByTestId("qt2k-button"));
    expect(await screen.findByText(/Quantitray2000/i)).toBeOnTheScreen();
  });

  it("clicks the Legiolert button and verifies Have Fun! text", async () => {
    fireEvent.press(screen.getByText("Legiolert"));
    expect(await screen.findByText(/Legiolert MPN/i)).toBeOnTheScreen();
  });
});
