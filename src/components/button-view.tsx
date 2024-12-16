import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import LookupComponent from "./lookup-component";

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    paddingVertical: 15,
  },
  button: {
    marginVertical: 10,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#0A0A0A",
    fontSize: 24,
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    paddingBottom: 16,
    paddingTop: 16,
  },
  subHeader: {
    textAlign: "center",
    fontSize: 20,
    paddingBottom: 16,
  },
  input: {
    width: "50%",
    fontSize: 24,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  result: {
    fontSize: 20,
    marginHorizontal: 24,
    paddingBottom: 16,
  },
  confidence: {
    fontSize: 18,
    marginHorizontal: 24,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
  },
});

const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  instructions: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginBottom: 10,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

function About(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={aboutStyles.container}>
      <View style={aboutStyles.instructions}>
        <Text style={aboutStyles.title}>How to use the App</Text>
        <Text style={commonStyles.text}>
          Click on the test you need to perform to get started.
        </Text>
        <Text style={commonStyles.text}>
          Enter the number of positive wells in the sample.
        </Text>
        <Text style={commonStyles.text}>
          Now the Most Probable Number is displayed.
        </Text>
        <Text style={commonStyles.text}>
          If a confidence range exists, it will be shown.
        </Text>
        <Text style={commonStyles.text}>Have Fun!</Text>
        <Text
          style={[aboutStyles.link, commonStyles.text]}
          onPress={() =>
            Linking.openURL("https://www.npmjs.com/package/mpn-lookup")
          }
        >
          click here for more info
        </Text>
      </View>
    </ScrollView>
  );
}

/* eslint-disable max-lines-per-function */
const ButtonView = () => {
  const [qtButton, setQtButton] = useState<boolean>(false);
  const [qt2kButton, setQt2kButton] = useState<boolean>(false);
  const [legioButton, setLegioButton] = useState<boolean>(false);
  const [aboutButton, setAboutButton] = useState<boolean>(false);
  const resetState = () => {
    setQtButton(false);
    setQt2kButton(false);
    setLegioButton(false);
    setAboutButton(false);
  };
  return (
    <>
      <View style={styles.top}>
        <Text style={styles.topText}>MPN Lookup</Text>
        <Text style={styles.topTextSmall}>
          Built using Obytes Starter (create-obytes-app)
        </Text>
      </View>
      <View id="top">
        {!(qtButton || qt2kButton || legioButton || aboutButton) && (
          <View style={[commonStyles.container, styles.tc]}>
            <View>
              <TouchableOpacity
                testID="qt-button"
                onPress={() => setQtButton(true)}
                style={commonStyles.button}
              >
                <Text style={commonStyles.buttonText}>QuantiTray&reg;</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setQt2kButton(true)}
                style={commonStyles.button}
              >
                <Text style={commonStyles.buttonText}>QuantiTray&reg;2000</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLegioButton(true)}
                style={commonStyles.button}
              >
                <Text style={commonStyles.buttonText}>Legiolert</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAboutButton(true)}
                style={commonStyles.button}
              >
                <Text style={commonStyles.buttonText}>About</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {(qtButton || qt2kButton || legioButton || aboutButton) && (
          <View>
            <View style={[commonStyles.container, styles.tc]}>
              {qtButton && (
                <View style={[commonStyles.container, styles.cw]}>
                  <LookupComponent testtype={"quanti"} />
                </View>
              )}
              {qt2kButton && (
                <View>
                  <LookupComponent testtype={"quanti2k"} />
                </View>
              )}
              {legioButton && <LookupComponent testtype={"legio"} />}
              {aboutButton && (
                <View>
                  <About />
                </View>
              )}
            </View>
            <View style={[commonStyles.container, styles.bottom]}>
              <TouchableOpacity
                onPress={() => resetState()}
                style={commonStyles.button}
              >
                <Text style={commonStyles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};
/* eslint-enable max-lines-per-function */
const styles = StyleSheet.create({
  tc: {
    width: 412,
    height: 580,
  },
  cw: {
    width: "100%",
  },
  top: {
    paddingTop: 100,
    alignItems: "center",
    paddingBottom: 60,
  },
  topText: {
    fontSize: 48,
  },
  topTextSmall: {
    fontSize: 10,
  },
  bottom: {
    top: -150,
  },
});

export default ButtonView;
