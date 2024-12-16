import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react-native';

import ButtonView from '@/components/button-view';
import { TouchableOpacity } from 'react-native';

describe('Home', () => {

  beforeEach(() => {
    // const { getByText } = render(<ButtonView />);
    render(<ButtonView />);
  });

  // afterEach(() => {});

  it('renders MPN Lookup Home view, all 4 buttons and title visible', () => {
    const title = screen.getByTestId('mpnl-title');
    const qtButton = screen.getByTestId('qt-button');
    const qt2kButton = screen.getByTestId('qt2k-button');
    const qtLButton = screen.getByTestId('qtl-button');
    const aboutButton = screen.getByTestId('about-button');
    const onButtonPressMock = jest.fn();
    expect(title).toBeDefined();
    expect(title.props.children).toBe('MPN Lookup');

    expect(qtButton).toBeDefined();
    expect(qt2kButton).toBeDefined();
    expect(qtLButton).toBeDefined();
    expect(aboutButton).toBeDefined();

    expect(1).toBe(1);
  });

  it('onPressItem is called when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText, getByTestId } = render(<TouchableOpacity onPress={onPressMock}/>);

    // find the TouchableOpacity and Text elements
    //const buttonAbout = getByTestId('about-button');
    //const text1 = getByText('About');


    // fireEvent.press(text1);

    // the PressMock handle is called with the 'id' of the item passed as an argument
    // expect(onPressMock).toHaveBeenCalledWith('about-button');
  });
  //
  // it("clicks the About button and verifies Have Fun! text", async () => {
  //   fireEvent.click(screen.getByText("About"));
  //   expect(await screen.findByText(/have fun!/i)).toBeInTheDocument();
  // });
  //
  // it("clicks the Quantitray&reg; button and verifies text", async () => {
  //   fireEvent.click(screen.getByTestId("qt-button"));
  //   expect(await screen.findByText(/Quantitray/i)).toBeInTheDocument();
  // });
  //
  // it("clicks the Quantitray2000$reg; button and verifies text", async () => {
  //   fireEvent.click(screen.getByTestId("qt2k-button"));
  //   expect(await screen.findByText(/Quantitray2000/i)).toBeInTheDocument();
  // });
  //
  // it("clicks the Legiolert button and verifies Have Fun! text", async () => {
  //   fireEvent.click(screen.getByText("Legiolert"));
  //   expect(await screen.findByText(/Legiolert MPN/i)).toBeInTheDocument();
  // });
});
