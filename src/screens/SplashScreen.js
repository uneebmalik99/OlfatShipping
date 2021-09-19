import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  PermissionsAndroid,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import Spinner from 'react-native-loading-spinner-overlay';



const SplashScreen = ({route, navigation }) => {

const[notification , setnotification] = useState('0')
const [notificationdata ,setnotificationdata ] = useState()
const[spinner, setspinner] =useState(false)

const continueAPPRunning = ()=>{
 
    try {
   
        const granted = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ).then((respons) => {
            if (respons == PermissionsAndroid.RESULTS.GRANTED) {
              continueAPp();
            } else {
                BackHandler.exitApp();
            }
        })

    } catch (err) {
        console.warn(err)
    }
}


const continueAPp = () => {
    setspinner(true)
    // this.setState({ writeStoragePermissin: true })
    setTimeout(() => {
        // NetInfo.isConnected.fetch().done((isConnected) => {
            // if (isConnected == true) {
            
                AsyncStorage.getItem('ISUSERLOGIN').
                    then((value) => {
                        if (value == '1') {
                            AsyncStorage.getItem(AppConstance.USER_INFO_OBJ).
                                then((value2) => {
                                    console.warn('json value', value2)
                                    if (value !== null) {
                                        let data = JSON.parse(value2);
                                        AppConstance.USER_INFO.USER_ID = data.id;
                                        AppConstance.USER_INFO.USER_NAME = data.username;
                                        AppConstance.USER_INFO.USER_TOKEN = data.auth_key;
                                        AppConstance.USER_INFO.USER_EMAIL = data.email;
                                        AppConstance.USER_INFO.USER_STATUS = data.status;
                                        AppConstance.USER_INFO.USER_DELETED = data.is_deleted;
                                        AppConstance.USER_INFO.USER_ADDRESS1 = data.address_line_1;
                                        AppConstance.USER_INFO.USER_ADDRESS2 = data.address_line_2;
                                        AppConstance.USER_INFO.USER_CITY = data.city;
                                        AppConstance.USER_INFO.USER_STATE = data.state;
                                        AppConstance.USER_INFO.USER_ZIP_CODE = data.zip_code;
                                        AppConstance.USER_INFO.USER_MOBILE = data.phone;
                                        AppConstance.USER_INFO.USER_FAX = data.fax;
                                        AppConstance.USER_INFO.USER_CUSTOMER_NAME = data.customer_name;
                                        AppConstance.USER_INFO.USER_IS_BLOCK = data.is_blocked;


                                        AppConstance.IS_USER_LOGIN = '1';
                                        // this.props.navigation.goBack();
                                        // if (this.state.isFindNotificationVehicleId > 0) {
                                        //     this.props.navigation.push('NotificationVehicleDetailscreen', { 'vehicleObj': this.state.isFindNotificationVehicleId })
                                        //     // this.props.navigation.push('LoginScreen', { 'vehicleObj': this.state.isFindNotificationVehicleId })
                                        // } else if (this.state.isInvoiceScreen > 0) {
                                        //     this.props.navigation.push('NotificationInvoiceDetailsScreen', { 'invoceObj': this.state.isInvoiceScreen })
                                        // }
                                        // else {



                                        
                                        if(AppConstance.NOTIFICATION == '1'){
                                            // if(AppConstance.NTYPE === '0'){
                                            //     navigation.navigate('alerts')
                                            //     setspinner(false)
                                            // }else{
                                                // navigation.navigate('Notifications')
                                            //     setspinner(false)
                                            // }

                                         



                                        }else{
                                            setspinner(false)

                                        
                                            
                                            navigation.navigate('Dashboardmain',{login:'1'})
                                        }
                                        // }
                                        // this.props.navigation.navigate('NoInternetConnectionFoundScreen')
                                    } else {
                                        setspinner(false)
                                        navigation.navigate('Signin',{login:'0'})
                                        // this.switchToLoginScreen();
                                    }
                                }).catch((error) => {
                                    console.log(error);  
                                        setspinner(false)}              
                                                  )
                        } else {
                            setspinner(false)
                            navigation.navigate('Signin',{login:'0'})
                        }

                    }).catch((error) => {console.log(error);   
                           setspinner(false)}               
                             )
            // }
            // else {
            //     AppConstance.showSnackbarMessage(AppMessages.INTERNEt_NOT_FOUND)
            // }
        // });
    }, 1500)
}

useEffect(() => {
  

   
  let mounted = true;
  if(Platform.OS === 'android'){
      setspinner(true)
  continueAPPRunning();
//   continueAPp();

  }else{

    // navigation.navigate('Signin',{login:'0'})
    continueAPp();

  }   
  return () => mounted = false;
}, [])



  return (
    <SafeAreaView style={{ flex: 1,justifyContent:'center', backgroundColor: 'white', height: deviceHeight, }}>


<Spinner
          visible={spinner}
          textContent={''}
          textStyle={{ color: '#FFF'}}
        />



    <View

style={{height:deviceHeight*0.3 , }}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logofinal1.png')}/>

</View>



    </SafeAreaView>

  );
};


export default SplashScreen;
