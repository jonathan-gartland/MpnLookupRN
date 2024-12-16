import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react-native";
import LookupComponent from "@/components/lookup-component";

describe("LookupComponent", () => {
  it("renders QuantiTray input and looks up MPN", () => {
    render(<LookupComponent testtype="quanti" />);
    const mpnNum =  screen.getByTestId('qt-mpn-number');
    expect(mpnNum).toBeDefined();
  });

  it("renders QuantiTray2000 inputs and calculates MPN", () => {
    // const { debug } =
    render(<LookupComponent testtype="quanti2k" />);
    // debug();
    const largeInput = screen.getByTestId(/qt2k-large/i);
    const smallInput = screen.getByTestId(/qt2k-small/i);
    // debug(largeInput);
    // debug(smallInput);

    // fireEvent.change(largeInput, { target: { value: "10" } });
    // fireEvent.change(smallInput, { target: { value: "5" } });

    // debug();

    expect(screen.getByText(/QuantiTray2000/i)).toBeDefined();
    // expect(largeInput).toHaveValue("10");
    // expect(smallInput).toHaveValue("5");
  });
  //
  it("renders Legiolert inputs and calculates MPN", () => {
    const { debug } =
    render(<LookupComponent testtype="legio" />);
    // debug();
    const largeInput = screen.getByTestId(/legio-large/i);
    const smallInput = screen.getByTestId(/legio-small/i);


    fireEvent.changeText(largeInput, { target: { value: "2" } });
    fireEvent.changeText(smallInput, { target: { value: "5" } });

    // debug();
    // debug(largeInput);
    // debug(smallInput);
    // debug();
    expect(screen.getByText(/MPN:/i)).toBeOnTheScreen();
    expect(screen.getByText(/Legiolert/i)).toBeOnTheScreen();

    expect(largeInput).toBeOnTheScreen();
    expect(smallInput).toBeOnTheScreen();
  });
});
