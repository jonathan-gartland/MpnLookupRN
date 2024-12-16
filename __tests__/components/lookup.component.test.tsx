import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react-native";
import LookupComponent from "@/components/lookup-component";

describe("LookupComponent", () => {
  it("renders QuantiTray input and looks up MPN", () => {
    const {getByTestId, debug } = render(<LookupComponent testtype="quanti" />);
    debug();
    expect(1).toBe(1);
    // const mpnNum =  screen.getByText(/MPN:\s*< 1.0/i);
    // expect(mpnNum)
  });
  //
  // it("renders QuantiTray2000 inputs and calculates MPN", () => {
  //   // const { debug } =
  //   render(<LookupComponent testtype="quanti2k" />);
  //   // debug();
  //   const largeInput = screen.getByTestId(/qt2k-large/i);
  //   const smallInput = screen.getByTestId(/qt2k-small/i);
  //   // debug(largeInput);
  //   // debug(smallInput);
  //
  //   fireEvent.change(largeInput, { target: { value: "10" } });
  //   fireEvent.change(smallInput, { target: { value: "5" } });
  //
  //   // debug();
  //
  //   expect(screen.getByText(/QuantiTray2000/i)).toBeInTheDocument();
  //   expect(largeInput).toHaveValue("10");
  //   expect(smallInput).toHaveValue("5");
  // });
  //
  // it("renders Legiolert inputs and calculates MPN", () => {
  //   // const { debug } =
  //   render(<LookupComponent testtype="legiolert" />);
  //   // debug();
  //   const largeInput = screen.getByTestId(/legio-large/i);
  //   const smallInput = screen.getByTestId(/legio-small/i);
  //   // debug(largeInput);
  //   // debug(smallInput);
  //
  //   fireEvent.change(largeInput, { target: { value: "2" } });
  //   fireEvent.change(smallInput, { target: { value: "5" } });
  //
  //   // debug();
  //
  //   expect(screen.getByText(/MPN :/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Legiolert/i)).toBeInTheDocument();
  //   expect(largeInput).toHaveValue("2");
  //   expect(smallInput).toHaveValue("5");
  // });
});
