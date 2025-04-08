import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageBoddy = ({label, label2, Type}) => {
  if (Type === 'homelt') {
    return (
      <View style={styles.container6}>
        <Text style={styles.label5}>Add Transaction</Text>
      </View>
    );
  }
  if (Type === 'homeunderl') {
    return (
      <View style={styles.container4}>
        <Text style={styles.label4}>Cash on Hand</Text>
        <Text style={styles.label4}>Rp. 4.000.000</Text>
      </View>
    );
  }
  if (Type === 'homeunderl2') {
    return (
      <View style={styles.container5}>
        <Text style={styles.label4}>Cash on Bank</Text>
        <Text style={styles.label4}>Rp. 6.000.000</Text>
      </View>
    );
  }
  if (Type === 'homebody') {
    return (
      <View style={styles.container2}>
        <Text style={styles.label2}>Rp. 10.000.000</Text>
      </View>
    );
  };
  if (Type === 'homegaris') {
    return (
      <View style={styles.container3}>
        <Text style={styles.label3} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default PageBoddy;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 13,
    paddingBottom: 4,
    paddingLeft: 24,
    paddingRight: 229,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000000',
  },
  container2: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 93,
  },
  label2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: '#000000',
  },
  container3: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  label3: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    alignSelf: 'stretch',
  },
  container4: {
    backgroundColor: '#FFFFFF',
    paddingTop: 13,
    paddingBottom: 4,
    paddingLeft: 24,
    paddingRight: 229,
    flexDirection: 'row',
  },
  label4: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000000',
    marginLeft: 10,
  },
  container5: {
    backgroundColor: '#FFFFFF',
    paddingTop: 13,
    paddingBottom: 40,
    paddingLeft: 24,
    paddingRight: 229,
    flexDirection: 'row',
  },
  label5: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000000',
  },
  container6: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10.6,
    paddingLeft: 24,
    paddingRight: 174,
    flexDirection: 'row',
  }
});
