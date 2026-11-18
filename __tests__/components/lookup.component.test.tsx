import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Keyboard } from "react-native";
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

describe("LookupComponent keyboard handling", () => {
  let dismissSpy: jest.SpyInstance;

  beforeEach(() => {
    dismissSpy = jest.spyOn(Keyboard, "dismiss").mockImplementation(() => {});
  });

  afterEach(() => {
    dismissSpy.mockRestore();
  });

  it("selects the current count on focus so typing replaces it", () => {
    render(<LookupComponent testtype="quanti2k" />);
    for (const id of ["qt2k-large", "qt2k-small"]) {
      expect(screen.getByTestId(id).props.selectTextOnFocus).toBe(true);
    }
  });

  it("shows a Done bar above the iOS number pad that closes the keyboard", () => {
    render(<LookupComponent testtype="quanti" />);
    expect(screen.getByTestId("qt-input").props.inputAccessoryViewID).toBe(
      "mpn-keyboard-done"
    );
    fireEvent.press(screen.getByTestId("keyboard-done"));
    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });

  it("closes the keyboard when tapping outside the inputs", () => {
    render(<LookupComponent testtype="legio" />);
    fireEvent.press(screen.getByTestId("lookup-area"));
    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });
});

describe("LookupComponent result labels", () => {
  it("shows QuantiTray MPN and confidence range with a space after each label", () => {
    render(<LookupComponent testtype="quanti" />);
    fireEvent.changeText(screen.getByTestId("qt-input"), "10");
    expect(screen.getByText("MPN: 11.1")).toBeOnTheScreen();
    expect(screen.getByText("Low: 6.1")).toBeOnTheScreen();
    expect(screen.getByText("High: 20.5")).toBeOnTheScreen();
  });

  it("shows QuantiTray 2000 MPN and confidence range with a space after each label", () => {
    render(<LookupComponent testtype="quanti2k" />);
    fireEvent.changeText(screen.getByTestId("qt2k-large"), "10");
    fireEvent.changeText(screen.getByTestId("qt2k-small"), "5");
    expect(screen.getByText("MPN: 16.6")).toBeOnTheScreen();
    expect(screen.getByText("Low: 9.6")).toBeOnTheScreen();
    expect(screen.getByText("High: 26.8")).toBeOnTheScreen();
  });
});
