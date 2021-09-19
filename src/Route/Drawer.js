
import React from 'react';
import { View, StyleSheet , Image} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Welcome from '../screens/Welcome'
import Signin from '../screens/Signin'
import Contactus from '../screens/Contactus'
import AppConstance from '../constance/AppConstance';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-community/async-storage';


export function DrawerContent(props) {

    // const paperTheme = useTheme();

    // const { signOut, toggleTheme } = React.useContext(AuthContext);

    const signOut =async () => {
       await AsyncStorage.setItem('ISUSERLOGIN' , '0')
        
      // props.navigation.navigate('Signin');
        AsyncStorage.getItem('ISUSERLOGIN').
        then((value) => {
            if (value == '0') {
                
                props.navigation.navigate('Signin');
                console.log('value'+value);
            } })
        AsyncStorage.removeItem(AppConstance.USER_INFO_OBJ);
    }
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                        <Image  style={{height:45,alignSelf:'center',borderRadius:50/2,borderWidth:0.5,borderColor:'grey', width:45,resizeMode:'stretch'}}
                                source={require('../images/logofinal1.png')}
                                />
                            {/* <Avatar.Image 
                                source={require('../images/logofinal1.png')}
                                size={50}
                            /> */}
                            <View style={{marginLeft:15,justifyContent:'center', flexDirection:'column'}}>
                                <Title style={styles.title}>OLFATSHIPPING</Title>
                                {/* <Caption style={styles.caption}>@j_doe</Caption> */}
                            </View>
                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image  style={{height:size,alignSelf:'center', width:size, resizeMode:'contain'}}
                                source={require('../images/home.png')}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Dashboard')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image  style={{height:size,alignSelf:'center', width:size, resizeMode:'contain'}}
                                source={require('../images/Notification.png')}
                                />
                            
                            )}
                            label="Notifications"
                            onPress={() => {props.navigation.navigate('Notifications')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                // <Icon 
                                // name="bookmark-outline" 
                                // color={color}
                                // size={size}
                                // />
                                <Image  style={{height:size,alignSelf:'center', width:size , resizeMode:'contain'}}
    source={require('../images/ourServices.jpg')}
    />
                            )}
                            label="Our Services"
                            onPress={() => {props.navigation.navigate('services')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image  style={{height:size,alignSelf:'center', width:size, resizeMode:'contain'}}
                                source={require('../images/ouryards.png')}
                                />
                            )}
                            label="Our Yard"
                            onPress={() => {props.navigation.navigate('yard')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                              
        <Image  style={{height:size,alignSelf:'center', width:size, resizeMode:'contain'}}
        source={require('../images/contact-us.jpg')}
        />
    
                            )}
                            label="Contactus"
                            onPress={() => {props.navigation.navigate('Contactus')}}
                        />
                    </Drawer.Section>
               
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      alignSelf:'center',
      color:'grey',
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });





