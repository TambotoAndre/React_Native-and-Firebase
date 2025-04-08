import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BackButton, Logo} from '../../../assets/icon';

const Button = ({
  label,
  backgroundColor = '#16423C',
  textColor = '#020202',
  onSubmit,
  type,
  icon,
}) => {
  if (type === 'icon-only') {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onSubmit}>
        {icon === 'back-button' && <BackButton />}
        {icon === 'logo' && <Logo />}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.container(backgroundColor)}
      activeOpacity={0.7}
      onPress={onSubmit}>
      <Text style={styles.label(textColor)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    backgroundColor: backgroundColor,
    marginLeft: 33,
    marginRight: 33,
    paddingVertical: 11,
    borderRadius: 8,
  }),
  label: textColor => ({
    textAlign: 'center',
    color: textColor,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  }),
});
