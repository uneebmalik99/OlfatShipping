import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ImageBackground,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';

import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';




const Signin = ({ navigation }) => {

  // const [email ,setemail] = useState('10014')
  const [email ,setemail] = useState('')

  // const [pass ,setpass] =useState('10014')
  const [pass ,setpass] =useState('')

  const [spinner , setspinner] =useState(false)
 
 const  callingLoginApi = () => {
    // var uniqueId = DeviceInfo.getUniqueId();
    // // deviceId = uniqueId;
    // console.log('Device id Is '+uniqueId);
setspinner(true)
    if (email.trim().length == 0) {

    alert('username can not be blank'); 
    setspinner(false)

    } else if (pass.trim().length == 0) {
        alert("password can not be blank"); 
        setspinner(false)

    } else {
        // NetInfo.fetch().then(state => {
        //     if (state.isConnected == true) {
            console.warn("working1")
                // this.setState({ isLoading: true });
                var url = AppUrlCollection.BASE_URL+ 'login';

                var value = new FormData();
                // value.append('username', 'info@impulsiontechnologies.com');
                // value.append('password', '20190021');
                value.append('username',email);
                value.append('password', pass);
                // value.append('token', this.state.fireBaseToken);
                // value.append('device_id', deviceId);
                console.log('Login_key_vale ',value)
                fetch(url, {
                    method: 'POST',
                    headers: {
                       
                       'Content-Type': 'multipart/form-data',
                    },
                    body: value,
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      
                      setspinner(false)
                     
                        console.log(responseJson);
                        loginServiceCall(responseJson)
                      
                        // this.setState({ isLoading: false })
                       
                    })
                    .catch((error) => {
                      setspinner(false)
                      alert(error)
                        // this.setState({ isLoading: false })
                        console.warn(error)
                    });
            // }
            // else {
            //          alert("Internet not found")
            // }

        // });


    }
    //  this.props.navigation.navigate('NavigationSideScreen')
}


const loginServiceCall = (responseJson) => {
  console.warn(responseJson)

  if (responseJson.status == AppConstance.API_SUCESSCODE) {

   AppConstance.IS_USER_LOGIN='1';
      // this.props.navigation.push('Dashboard');
      
      //AppConstance.showSnackbarMessage(responseJson.message)
    callingUserService(responseJson.data.auth_key)
  } else {
      
      alert(responseJson.message);
  }
}

const GotoNextScreen  =async  (responseJson) => {
  await AsyncStorage.setItem(AppConstance.USER_INFO_OBJ, JSON.stringify(responseJson.data))
 await  AsyncStorage.setItem('ISUSERLOGIN', '1')
  AppConstance.IS_USER_LOGIN = '1'
//  this._storeData();

  
  let data = responseJson.data
  console.warn('json value', data)
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

  navigation.navigate('Dashboardmain')

  setspinner(false)

}

const callingUserService = (authKey) => {
  var url = AppUrlCollection.USER;
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          
          'authkey': authKey
      },
      // body: value,
  })
      .then((response) => response.json())
      .then((responseJson) => {
        
          console.warn('USER::: ', responseJson)


          GotoNextScreen(responseJson);

          // //this.props.navigation.goBack();
          // this.props.navigation.navigate('NavigationSideScreen')
      })
      .catch((error) => {
          this.setState({ isLoading: false })
          console.warn(error)
      });
}





  return (
    <SafeAreaView style={{  backgroundColor: 'white', height: deviceHeight, }}>
 <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

<ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >










 </ImageBackground>
 <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

{/* <TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
// onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity> */}

<View style={{width:'100%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Login</Text>
</View>


</View>

<ScrollView>

<View

style={{height:100,marginTop:50}}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logofinal1.png')}/>

</View>



<View style={{width:'100%',flexDirection:'column',marginTop:30, paddingHorizontal:40}}>

<View
style={{width:'100%',}} >

<TextInput
      style={{ height: 40,width:'100%', paddingHorizontal:25, borderRadius:10, backgroundColor:'white' }}
      // onChangeText={text => onChangeText(text)}
      onChangeText={(text) => {setemail(text) }}
      
      placeholder="Username"
        underlineColorAndroid="transparent"
    />
    </View>

<TextInput
      style={{ height: 40, borderRadius:10,paddingHorizontal:25, marginTop:10, backgroundColor:'white' }}
      onChangeText={(text) =>  setpass(text)}
      placeholder="Password"

      inlineImageLeft='search_icon'
    />



</View>


<View style={{justifyContent:'center'}}> 
<TouchableOpacity style={{ marginTop:10}}>

<Text style={{alignSelf:'center', color:'white', fontWeight:'bold',fontSize:18}}>Forgot Password</Text>
</TouchableOpacity>

</View>




<View style={{width:'100%',marginTop:15, justifyContent:'center'}}>

<TouchableOpacity
                        onPress={() =>   callingLoginApi()        
                          // navigation.navigate('Dashboardmain')
                          // navigation.openDrawer()

                      }

// onPress={()=> {AppConstance.IS_USER_LOGIN='1';navigation.navigate('Dashboard')}}
 style={{width: '45%',alignSelf:'center',
    height: 43,}}>
      <LinearGradient colors={['#43D4FF', '#38ABFD', '#2974FA']} style={{ flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 25}}>
        <Text style={{  color: 'white',
    fontSize: 16}}>SIGN IN</Text>
      </LinearGradient>
      </TouchableOpacity>



</View>


{/* <TouchableOpacity onPress={()=> {navigation.navigate('temp')}}>
  <Text>go</Text>
</TouchableOpacity> */}

<View style={{width:deviceWidth,height:320,marginTop:10, paddingHorizontal:20, justifyContent:'center'}} >

<Image  source={require('../images/Map-01.png')} resizeMode='contain' style={{ width: '100%',alignSelf:'center', height:'100%', }} />

</View>



</ScrollView>

        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default Signin;
