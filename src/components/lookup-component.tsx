import type { TextInputProps } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import {
  InputAccessoryView,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,

  View,
} from 'react-native';

import { getMpn } from '@/util/mpn.lookup';

// The iOS number pad has no return key, so a "Done" bar above it closes the keyboard
const KEYBOARD_DONE_ID = 'mpn-keyboard-done';

type MyComponentProps = {
  testtype: string;
};

type HeadingProps = {
  title: string;
};

// selectTextOnFocus: typing replaces the current count instead of inserting
// next to it (tapping "0" and typing 10 would otherwise give 100 or 010)
const NumberInput: React.FC<TextInputProps> = props => (
  <TextInput
    keyboardType="numeric"
    selectTextOnFocus
    inputAccessoryViewID={Platform.OS === 'ios' ? KEYBOARD_DONE_ID : undefined}
    {...props}
  />
);

const KeyboardDoneBar: React.FC = () =>
  Platform.OS === 'ios'
    ? (
        <InputAccessoryView nativeID={KEYBOARD_DONE_ID}>
          <View style={styles.doneBar}>
            <Pressable
              testID="keyboard-done"
              accessibilityRole="button"
              onPress={Keyboard.dismiss}
              hitSlop={8}
            >
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          </View>
        </InputAccessoryView>
      )
    : null;

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
  const mpnVal = getMpn('qt', { large: inputQt, small: 0 }) || [];
  return (
    <View>
      <Heading title="QuantiTray® MPN" />
      <NumberInput
        testID="qt-input"
        style={[styles.input, styles.inputQt]}
        value={String(inputQt)}
        onChangeText={handleChangeQt}
      />
      {testtype === 'quanti' && mpnVal.length > 0 && (
        <View>
          <Text testID="qt-mpn-number" style={styles.result}>
            MPN:
            {' '}
            {mpnVal[0]}
          </Text>
          <Text style={styles.confidence}>95% Confidence</Text>
          <View style={styles.row}>
            <Text>
              Low:
              {' '}
              {mpnVal[1]}
            </Text>
            <Text>
              High:
              {' '}
              {mpnVal[2]}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const Qt2kDiv: React.FC<MyComponentProps> = ({ testtype }) => {
  const [inputQt2kL, setInputQt2kL] = useState(0);
  const [inputQt2kS, setInputQt2kS] = useState(0);

  const mpnVal = getMpn('qt2k', { large: inputQt2kL, small: inputQt2kS }) || [];

  return (
    <View>
      <Heading title="QuantiTray2000® MPN" />
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text>Large</Text>
          <NumberInput
            testID="qt2k-large"
            style={styles.input}
            value={String(inputQt2kL)}
            onChangeText={text => setInputQt2kL(Number(text))}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text>Small</Text>
          <NumberInput
            testID="qt2k-small"
            style={styles.input}
            value={String(inputQt2kS)}
            onChangeText={text => setInputQt2kS(Number(text))}
          />
        </View>
      </View>
      {testtype === 'quanti2k' && mpnVal.length > 0 && (
        <View>
          <Text
            testID="qt2k-mpn-number"
            style={[styles.result, styles.qt2kmpn]}
          >
            MPN:
            {' '}
            {mpnVal[0]}
          </Text>
          <Text style={[styles.confidence, styles.qt2kmpn]}>
            95% Confidence
          </Text>
          <View style={styles.row}>
            <Text>
              Low:
              {' '}
              {mpnVal[1]}
            </Text>
            <Text>
              High:
              {' '}
              {mpnVal[2]}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const QtLDiv: React.FC<MyComponentProps> = ({ testtype }) => {
  const [inputLL, setInputLL] = useState(0);
  const [inputLS, setInputLS] = useState(0);
  const mpnVal = getMpn('legio', { large: inputLL, small: inputLS }) || [];
  return (
    <View>
      <Heading title="Legiolert MPN" />
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.largeL}>Large</Text>
          <NumberInput
            testID="legio-large"
            style={[styles.input, styles.inputQtl]}
            value={String(inputLL)}
            onChangeText={text => setInputLL(Number(text))}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.smallL}>Small</Text>
          <NumberInput
            testID="legio-small"
            style={[styles.input, styles.inputQts]}
            value={String(inputLS)}
            onChangeText={text => setInputLS(Number(text))}
          />
        </View>
      </View>
      {testtype === 'legio' && (
        <View>
          <Text testID="legio-mpn-number" style={styles.result}>
            MPN:
            {' '}
            {mpnVal}
          </Text>
        </View>
      )}
    </View>
  );
};
const LookupComponent: React.FC<MyComponentProps> = ({ testtype }) => {
  // Tapping anywhere outside the inputs closes the keyboard. accessible={false}
  // keeps screen readers (and Maestro on iOS) seeing the individual elements.
  return (
    <Pressable
      testID="lookup-area"
      accessible={false}
      onPress={Keyboard.dismiss}
    >
      {testtype === 'quanti' && <QtDiv testtype="quanti" />}
      {testtype === 'quanti2k' && <Qt2kDiv testtype="quanti2k" />}
      {testtype === 'legio' && <QtLDiv testtype="legio" />}
      <KeyboardDoneBar />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 24,
    paddingBottom: 16,
    paddingTop: 16,
  },
  subHeader: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    marginHorizontal: 20,
  },
  inputWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  inputQt: {
    width: '40%',
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
    width: '50%',
    fontSize: 24,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 20,
    marginBottom: 16,
    textAlign: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  doneBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
    borderTopColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  doneText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007aff',
  },
});

export default LookupComponent;
