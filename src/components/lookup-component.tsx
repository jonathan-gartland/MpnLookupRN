import React, { useState } from "react";
import { StyleSheet,Text, TextInput, View } from "react-native";

import { getMpn } from '@/util/mpn.lookup';

interface MyComponentProps {
  testtype: string;
}

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.subHeader}>Positive Wells</Text>
    </View>
  );
};

const QtDiv: React.FC<MyComponentProps> = ({ testtype }) => {
  const [inputQt, setInputQt] = useState(0);
  const handleChangeQt = (text: string) => {
    setInputQt(Number(text));
  };
  const mpnVal = getMpn("qt", { large: inputQt, small: 0 }) || [];
  return (
    <View>
      <Heading title="QuantiTray® MPN" />
      <TextInput
        style={[styles.input, styles.inputQt]}
        keyboardType="numeric"
        value={String(inputQt)}
        onChangeText={handleChangeQt}
      />
      {testtype === 'quanti' && mpnVal.length > 0 && (
        <View>
          <Text testID="qt-mpn-number" style={styles.result}>MPN: {mpnVal[0]}</Text>
          <Text style={styles.confidence}>95% Confidence</Text>
          <View style={styles.row}>
            <Text>Low: {mpnVal[1]}</Text>
            <Text>High: {mpnVal[2]}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const Qt2kDiv: React.FC<MyComponentProps> = ({ testtype }) => {
  const [inputQt2kL, setInputQt2kL] = useState(0);
  const [inputQt2kS, setInputQt2kS] = useState(0);

  const handleChangeQt2kL = (text: string) => {
    setInputQt2kL(Number(text));
  };

  const handleChangeQt2kS = (text: string) => {
    setInputQt2kS(Number(text));
  };

  const mpnVal =
    getMpn("qt2k", { large: inputQt2kL, small: inputQt2kS }) || [];

  return (
    <View>
      <Heading title="QuantiTray2000® MPN" />
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text>Large</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(inputQt2kL)}
            onChangeText={handleChangeQt2kL}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text>Small</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(inputQt2kS)}
            onChangeText={handleChangeQt2kS}
          />
        </View>
      </View>
      {testtype === 'quanti2k' && mpnVal.length > 0 && (
        <View>
          <Text style={[styles.result, styles.qt2kmpn]}>
            MPN: {mpnVal[0]}
          </Text>
          <Text style={[styles.confidence, styles.qt2kmpn]}>
            95% Confidence
          </Text>
          <View style={styles.row}>
            <Text>Low: {mpnVal[1]}</Text>
            <Text>High: {mpnVal[2]}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const QtLDiv: React.FC<MyComponentProps> = ({ testtype }) => {
  const [inputLL, setInputLL] = useState(0);
  const [inputLS, setInputLS] = useState(0);

  const handleChangeLL = (text: string) => {
    setInputLL(Number(text));
  };

  const handleChangeLS = (text: string) => {
    setInputLS(Number(text));
  };

  const mpnVal = getMpn("legio", { large: inputLL, small: inputLS }) || [];

  return (
    <View>
      <Heading title="Legiolert MPN" />
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.largeL}>Large</Text>
          <TextInput
            style={[styles.input, styles.inputQtl]}
            keyboardType="numeric"
            value={String(inputLL)}
            onChangeText={handleChangeLL}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.smallL}>Small</Text>
          <TextInput
            style={[styles.input, styles.inputQts]}
            keyboardType="numeric"
            value={String(inputLS)}
            onChangeText={handleChangeLS}
          />
        </View>
      </View>
      {testtype === "legio" && (
        <View>
          <Text style={styles.result}>MPN: {mpnVal}</Text>
        </View>
      )}
    </View>
  );
};
const LookupComponent: React.FC<MyComponentProps> = ({ testtype }) => {






  return (
    <View>
      {testtype === "quanti" && <QtDiv testtype="quanti" />}
      {testtype === "quanti2k" && <Qt2kDiv testtype="quanti2k" />}
      {testtype === "legio" && <QtLDiv testtype="legio" />}
    </View>
  );
};

const styles = StyleSheet.create({
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
    marginHorizontal: 20,
  },
  inputWrapper: {
    flex: 1,
    alignItems: "center",
  },
  inputQt: {
    width: "40%",
    left: 30,
  },
  qt2kmpn: {
    left: 40,
  },
  largeL: {
    right: 15,
  },
  smallL: {
    left: 5,
  },
  inputQtl: {
    width: 50,
    right: 10,
  },
  inputQts: {
    width: 50,
    left: 10,
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
    textAlign: "center",
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

export default LookupComponent;
