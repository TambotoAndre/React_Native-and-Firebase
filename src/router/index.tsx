import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SplashScreen,
  SignIn,
  SignUp,
  Home,
  Search,
  Notif,
  Profil,
  ProfilEdit,
  Status,
  UploadSi,
  UploadId,
  Organic,
  Anorganic,
  Exchange,
  Confirm,
} from '../pages';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notif"
        component={Notif}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profil"
        component={Profil}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfilEdit"
        component={ProfilEdit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Status"
        component={Status}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadSi"
        component={UploadSi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadId"
        component={UploadId}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Organic"
        component={Organic}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anorganic"
        component={Anorganic}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Exchange"
        component={Exchange}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
