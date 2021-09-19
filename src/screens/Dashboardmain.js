import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AsyncStorage from '@react-native-community/async-storage'

import Spinner from 'react-native-loading-spinner-overlay';

const Dashboardmain = ({ navigation }) => {

  const [Dashboarddata , setDashboarddata] = useState(


 {"all": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "0",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "16",
      "not_towed": "0",
      "with_title": "16",
      "with_out_title": "0",
      "towed_with_title": "16",
      "towed_with_out_title": "0"
  },
  "LA": {
      "all": "4",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "4",
      "not_towed": "0",
      "with_title": "4",
      "with_out_title": "0",
      "towed_with_title": "4",
      "towed_with_out_title": "0"
  },
  "GA": {
      "all": "1",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "1",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "1",
      "not_towed": "0",
      "with_title": "1",
      "with_out_title": "0",
      "towed_with_title": "1",
      "towed_with_out_title": "0"
  },
  "NY": {
      "all": "10",
      "on_hand": "1",
      "manifest": "5",
      "picked_up": "0",
      "car_on_way": "1",
      "shipped": "3",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "1",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "10",
      "not_towed": "0",
      "with_title": "10",
      "with_out_title": "0",
      "towed_with_title": "10",
      "towed_with_out_title": "0"
  },
  "TX": {
      "all": "1",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "1",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "1",
      "not_towed": "0",
      "with_title": "1",
      "with_out_title": "0",
      "towed_with_title": "1",
      "towed_with_out_title": "0"
  },
  "TX2": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "0",
      "not_towed": "0",
      "with_title": "0",
      "with_out_title": "0",
      "towed_with_title": "0",
      "towed_with_out_title": "0"
  },
  "NJ2": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "0",
      "not_towed": "0",
      "with_title": "0",
      "with_out_title": "0",
      "towed_with_title": "0",
      "towed_with_out_title": "0"
  },
  "CA": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "0",
      "not_towed": "0",
      "with_title": "0",
      "with_out_title": "0",
      "towed_with_title": "0",
      "towed_with_out_title": "0"
  }
}
  )
  const[spinner , setspinner] = useState(false)

  const  callingdashboardApi = () => {
    var url = ''
   
     
        url = AppUrlCollection.BASE_URL + 'vehicle/get-vehicle-counter' 
    
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
              'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            //this.setState({ isLoading: false })
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
            setDashboarddata(responseJson.data);

            console.warn('data is '+Dashboarddata);

            } else {
              alert(responseJson.message)
               // AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
          alert(error)
            console.warn(error)
        });
  }
  
  useEffect(() => {

    // setspinner(true)
    // callingdashboardApi()
    // setspinner(false)
    AsyncStorage.getItem('ISUSERLOGIN').
    then((value) => {
        if (value == '1') {
            console.log(JSON.stringify(value));

        } })
    return () => {
      
    }
  }, [])

  const renderDashboard = ({ item, index }) => {
    return <TouchableOpacity
        onPress={() => this.callingDashbard(item)}
    >
        <Elavation
            elevation={5}
            style={{ width: wp('28%'), height: hp('19%'), borderRadius: 5, borderColor: AppColors.toolbarColor, borderWidth: 0, marginTop: hp('1.5%'), marginBottom: hp('1.5%'), marginLeft: '2.3%', marginRight: '2.3%', paddingTop: 16 }}
        >
            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                {this.dashboardiconUI(item, index)}
                <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.black, fontSize: 14, paddingTop: 15, }}>{item.name}</Text>
                {this.dahboardCounter(item, index)}

                {/* <Text style={{ fontFamily: AppFonts.SourceSansProLight, color: AppColors.black, fontSize: 28,paddingTop:15,paddingLeft:25 }}>{item.number}</Text> */}
                {/* {this.dashboardiconUI(item, index)} */}
            </View>
        </Elavation>
    </TouchableOpacity>
}
  return (

    // <SafeAreaView      style={{ flex: 1,  height: deviceHeight, }}>



    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
    <Image source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 1., position: 'absolute' }} />
    {/* <Toolbar toggle={this.props.toggle} headerName='DASHBOARD' isFilterIconShow={false} isInnerScreen={false} /> */}
       <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=> {navigation.openDrawer();}}

>
<Icon name='menu' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Dashboard</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>
    <View style={{ flex: 1 }}>
        <View style={{ width: deviceWidth * 0.8, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
            <Text style={{alignSelf:'center',fontWeight:'bold', color:'white', shadowColor: 'grey', 
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5, fontSize:18}} >WELCOME TO OLFAT SHIPPING</Text>
            {/* <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 20, color: AppColors.textColor }}>OUR SERVICES</Text> */}
        </View>



<ScrollView contentContainerStyle={{width:deviceWidth,paddingHorizontal:15, marginTop:30,}}>

<View style={{width:'100%', paddingVertical:10, flexDirection:'row'}} >

<TouchableOpacity style={{width:'46.5%',paddingVertical:10,flexDirection:'column',shadowColor: '#D7DBDD',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, borderRadius:15,backgroundColor:'#F2F3F4',borderColor:'#B2BABB', borderWidth:0.3,paddingVertical:10, height:110,justifyContent:'center', paddingHorizontal:10, }}
onPress={() =>  navigation.navigate('Dashboard')}
>

        <Image  style={{height:50,alignSelf:'center', width:50, resizeMode:'contain'}}
    source={require('../images/home.png')}
    />


    <Text style={{fontSize:16,color:'#2596be', alignSelf:'center'}}>Home</Text>


</TouchableOpacity>

<View style={{width:'7%'}}>

</View>
<TouchableOpacity style={{width:'46.5%',paddingVertical:10,flexDirection:'column',shadowColor: '#D7DBDD',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, borderRadius:15,backgroundColor:'#F2F3F4',borderColor:'#B2BABB', borderWidth:0.3,paddingVertical:10, height:110,justifyContent:'center', paddingHorizontal:10, }}

// onPress={() =>  navigation.navigate('Dashboard')}
>

        <Image  style={{height:50,alignSelf:'center', width:50, resizeMode:'contain'}}
    source={require('../images/Carsforsale.png')}
    />


    <Text style={{fontSize:16,color:'#2596be', alignSelf:'center'}}>Cars for Sell 250</Text>


</TouchableOpacity>
{/* <TouchableOpacity style={{borderWidth:0.5,justifyContent:'center',paddingVertical:10, paddingHorizontal:10, width:'50%'}}>
<Text style={{alignSelf:'center',fontSize:24, textAlign:'center'}}>Cars for Sell 250</Text>

</TouchableOpacity> */}

</View>



<View style={{width:'100%', paddingVertical:10,flexDirection:'row'}} >

<TouchableOpacity style={{width:'46.5%',paddingVertical:10,flexDirection:'column',  shadowColor: '#D7DBDD',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, borderRadius:15,backgroundColor:'#F2F3F4',borderColor:'#B2BABB', borderWidth:0.3,paddingVertical:10, height:110,justifyContent:'center', paddingHorizontal:5, }}

    onPress={() =>  navigation.navigate('Trackandtrace')}
>

        <Image  style={{height:50,alignSelf:'center', width:50, resizeMode:'contain'}}
    source={require('../images/Trackandtrace.png')}
    />


    <Text style={{fontSize:16,color:'#2596be',alignSelf:'center'}}>Track and trace</Text>


</TouchableOpacity>

<View style={{width:'7%'}}>
    
</View>


<TouchableOpacity style={{width:'46.5%',paddingVertical:10,flexDirection:'column', shadowColor: '#D7DBDD',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,borderRadius:15,backgroundColor:'#F2F3F4',borderColor:'#B2BABB', borderWidth:0.3,paddingVertical:10, height:110,justifyContent:'center', paddingHorizontal:10, }}

    // onPress={() =>  navigation.navigate('ContainerCarlist')}
    >

        <Image  style={{height:50,alignSelf:'center', width:50, resizeMode:'contain'}}
    source={require('../images/Carsforsale.png')}
    />


    <Text style={{fontSize:16,color:'#2596be', alignSelf:'center'}}>Sell your car</Text>


</TouchableOpacity>






</View>


<View style={{width:'100%',paddingVertical:10, flexDirection:'row'}} >

<TouchableOpacity style={{width:'46.5%',paddingVertical:10,flexDirection:'column', shadowColor: '#D7DBDD',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,borderRadius:15,backgroundColor:'#F2F3F4',borderColor:'#B2BABB', borderWidth:0.3,paddingVertical:10, height:110,justifyContent:'center', paddingHorizontal:10, }}

onPress={() =>  navigation.navigate('services')}
>

        <Image  style={{height:50,alignSelf:'center', width:50, resizeMode:'contain'}}
    source={require('../images/ourServices.jpg')}
    />


    <Text style={{fontSize:16,color:'#2596be', alignSelf:'center'}}>Our Services</Text>


</TouchableOpacity>

<View style={{width:'7%'}}>
    
</View>
<TouchableOpacity style={{width:'46.5%',paddingVertical:10,flexDirection:'column',shadowColor: '#D7DBDD',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, borderRadius:15,backgroundColor:'#F2F3F4',borderColor:'#B2BABB', borderWidth:0.3,paddingVertical:10, height:110,justifyContent:'center', paddingHorizontal:10, }}

onPress={() =>  navigation.navigate('yard')}
>

        <Image  style={{height:50,alignSelf:'center', width:50, resizeMode:'contain'}}
    source={require('../images/ouryards.png')}
    />


    <Text style={{fontSize:16,color:'#2596be', alignSelf:'center'}}>Our Yards</Text>


</TouchableOpacity>

</View>




<View style={{width:'100%',paddingVertical:10, flexDirection:'row'}} >

<TouchableOpacity style={{width:'46.5%',paddingVertical:10,flexDirection:'column',shadowColor: '#D7DBDD',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, borderRadius:15,backgroundColor:'#F2F3F4',borderColor:'#B2BABB', borderWidth:0.3,paddingVertical:10, height:110,justifyContent:'center', paddingHorizontal:10, }}

// onPress={() =>  navigation.navigate('services')}
>

        <Image  style={{height:50,alignSelf:'center', width:50, resizeMode:'contain'}}
    source={require('../images/Notification.png')}
    />


    <Text style={{fontSize:16,color:'#2596be', alignSelf:'center'}}>Notifications</Text>


</TouchableOpacity>

<View style={{width:'7%'}}>
    
</View>
<TouchableOpacity style={{width:'46.5%',paddingVertical:10,flexDirection:'column',shadowColor: '#D7DBDD',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, borderRadius:15,backgroundColor:'#F2F3F4',borderColor:'#B2BABB', borderWidth:0.3,paddingVertical:10, height:110,justifyContent:'center', paddingHorizontal:10, }}

onPress={() =>  navigation.navigate('Contactus')}
>

        <Image  style={{height:50,alignSelf:'center', width:50, resizeMode:'contain'}}
    source={require('../images/contact-us.jpg')}
    />


    <Text style={{fontSize:16,color:'#2596be', alignSelf:'center'}}>Contact Us</Text>


</TouchableOpacity>

















</View>
<View style={{width:deviceWidth, height:60}} >

</View>


</ScrollView>

    </View>
</SafeAreaView>







    
    // </SafeAreaView>

  );
};


export default Dashboardmain;
