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
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';

import Spinner from 'react-native-loading-spinner-overlay';

const Dashboard = ({ navigation }) => {

  const [Dashboarddata , setDashboarddata] = useState(


    {
        "all": "75",
        "on_hand": "20",
        "manifest": "5",
        "picked_up": "0",
        "car_on_way": "24",
        "new_purchase": "0",
        "shipped": "0",
        "on_hand_with_towed": "0",
        "on_hand_with_title": "12",
        "on_hand_with_out_title": "8",
        "on_hand_with_out_towed": "8",
        "towed": "60",
        "not_towed": "15",
        "with_title": "51",
        "with_out_title": "24",
        "towed_with_title": "50",
        "towed_with_out_title": "10",
        "arrived": "16",
        "towed_by_galaxy": "66",
        "towed_by_customer": "0",
        "is_requested": "0",
        "all_container": "0",
        "car_on_way_iran": "0",
        "cars_arrived_iran": "0",
        "cars_onway_final_destinations": "0",
        "cars_arrived_final_destinations": "0",
        "car_dispatched": "9",
        "car_loaded": "1",
        "handed_over": "0"
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
    let componentMounted = true;
    const unsubscribe = navigation.addListener('focus', () => {
        callingdashboardApi()
      });
    // setspinner(true)
    callingdashboardApi()
    // setspinner(false)
  
    return () => {
        componentMounted = false;
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


    <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight,  }} >

    <SafeAreaView style={{ flex: 1,  height: deviceHeight, }}>
    {/* <Image source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} /> */}
    {/* <Toolbar toggle={this.props.toggle} headerName='DASHBOARD' isFilterIconShow={false} isInnerScreen={false} /> */}
    
         <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Home</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>
    <View style={{ flex: 1 }}>
        <View style={{ width: deviceWidth * 0.8, height: 90, justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
            <Image source={require('../images/logofinal1.png')} style={{ width: undefined, height: undefined, flex: 1 }} resizeMode='contain' />
            {/* <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 20, color: AppColors.textColor }}>OUR SERVICES</Text> */}
        </View>



<ScrollView contentContainerStyle={{width:deviceWidth,paddingHorizontal:20, marginTop:30,}}>

<TouchableOpacity style={{width:'100%',    shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,flexDirection:'row'}}
onPress={() =>{setDashboarddata(''); navigation.navigate('carslist',{type:'0'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4',  borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/all_vehicles.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>All Vehicles</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>{Dashboarddata.all}</Text>
</View>
</View>


</TouchableOpacity>





<TouchableOpacity style={{width:'100%',marginTop:10,    shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,flexDirection:'row'}}
onPress={() => {setDashboarddata('');navigation.navigate('carslist',{type:'6', })}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4',  borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/new_purchase.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>New Purchase</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>{Dashboarddata.new_purchase}</Text>
</View>
</View>


</TouchableOpacity>






<TouchableOpacity style={{width:'100%',marginTop:10,     shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,flexDirection:'row'}}
onPress={() => {setDashboarddata(''); navigation.navigate('carslist',{type:'12'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4',  borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/dispatched2.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>Dispatched</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>{Dashboarddata.car_dispatched}</Text>
</View>
</View>


</TouchableOpacity>








<TouchableOpacity style={{width:'100%',marginTop:10,    shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, flexDirection:'row'}}
onPress={() => {setDashboarddata('');navigation.navigate('carslist',{type:'1'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4',  borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/on_hand.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>On Hand</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>{Dashboarddata.on_hand}</Text>
</View>
</View>


</TouchableOpacity>



<TouchableOpacity style={{width:'100%',marginTop:10,     shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,flexDirection:'row'}}
onPress={() => {setDashboarddata('');navigation.navigate('carslist',{type:'2'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4',  borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/readytoload1.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>Ready To Load</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>-</Text>
</View>
</View>


</TouchableOpacity>


<TouchableOpacity style={{width:'100%',marginTop:10,     shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,flexDirection:'row'}}
onPress={() => {setDashboarddata('');navigation.navigate('carslist',{type:'15'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4',  borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/loaded.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>Loaded</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>{Dashboarddata.car_loaded}</Text>
</View>
</View>


</TouchableOpacity>



<TouchableOpacity style={{width:'100%',marginTop:10,    shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, flexDirection:'row'}}
onPress={() => {setDashboarddata('');navigation.navigate('carslist',{type:'3'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4',  borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/on_the_way.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>On The Way</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>{Dashboarddata.car_on_way}</Text>
</View>
</View>


</TouchableOpacity>





<TouchableOpacity style={{width:'100%',marginTop:10,    shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,flexDirection:'row'}}
onPress={() => {setDashboarddata('');navigation.navigate('carslist',{type:'10'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4', backgroundColor:'#F2F3F4', borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/on_hand.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>Arrived</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>{Dashboarddata.arrived}</Text>
</View>
</View>


</TouchableOpacity>




<TouchableOpacity style={{width:'100%',marginTop:10,    shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, flexDirection:'row'}}
onPress={() => {setDashboarddata('');navigation.navigate('carslist',{type:'11'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4',  borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/handed_over.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>Handed Over</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>{Dashboarddata.handed_over}</Text>
</View>
</View>


</TouchableOpacity>





<TouchableOpacity style={{width:'100%',marginTop:10,    shadowColor: '#497ebf',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5, flexDirection:'row'}}
onPress={() => {setDashboarddata('');navigation.navigate('ContainerCarlist',{type:'Containers'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4',  borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/container.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>Containers</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>{Dashboarddata.all_container}</Text>
</View>
</View>


</TouchableOpacity>



<TouchableOpacity style={{width:'100%',marginTop:10,
   shadowColor: '#497ebf',
   shadowOffset: { width: 3, height: 3 },
   shadowOpacity: 0.6,
   shadowRadius: 1,
   elevation: 5,   flexDirection:'row'}}
onPress={() =>{setDashboarddata(''); navigation.navigate('invoicelist',{type:'Invoices'})}}

>

<View style={{width:'100%',borderWidth:0.5,borderRadius:20,height:40,backgroundColor:'#F2F3F4', borderColor:'white',justifyContent:'center', flexDirection:'row',  paddingHorizontal:15, }}>


<Image  style={{height:30,alignSelf:'center', width:30, resizeMode:'contain'}}
    source={require('../images/invoice2.png')}
    />
<View style={{justifyContent:'space-between', flexDirection:'row',width:'90%'}}>
    <Text style={{ alignSelf:'center',marginLeft:5,color:'#497ebf', fontSize:16}}>Invoices</Text>

<Text style={{alignSelf:'center',color:'#497ebf', fontSize:16}}>-</Text>
</View>
</View>


</TouchableOpacity>
<View style={{width:deviceWidth, height:60}} >

</View>
</ScrollView>

    </View>
</SafeAreaView>


</ImageBackground>




    
    // </SafeAreaView>

  );
};


export default Dashboard;
