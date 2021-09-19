import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';


var baseImagePath = '';

const containerinfo = ({route, navigation }) => {



  const [spinner , setspinner] =useState(false)
  // const [loc , setloc] = useState('')
  const [search, setSearch] = useState('');
  const [vehicledata ,setvehicledata] = useState([])

  const [vehicledatatemp ,setvehicledatatemp] = useState([
    {
      img:  require('../images/logofinal1.png')

    }
  ])
  const { id } = route.params;
// alert(id)
  const [data, setdata] = useState([ {id:1}])


const callingContainerApi =  () => {


setspinner(true)
var url = AppUrlCollection.EXPORT_DETAIL + 'exportId=' + id;

    fetch(url , {

    method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
  })
      .then((response) => response.json())
      .then((responseJson) => {

          if (responseJson.status == AppConstance.API_SUCESSCODE) {
              baseImagePath = responseJson.data.other.export_image;
              let data = responseJson.data.export;
              //this.setState({ isLoading: false, isFooterLoading: false })
              if (data) {
                setspinner(false)
                  // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                  //this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
                  setdata(data)
                  console.log('----'+responseJson.data.export.vehicle);
                  setvehicledata(responseJson.data.export.vehicle)
                  console.log(vehicledata);
              } else {
                setdata(data)
                setvehicledata(responseJson.data.export.vehicle)

                setspinner(false)


                 // this.setState({ noMoreDataFound: true, isFooterLoading: false, isStopCallingAPI: true })
              }
             
              //this.setState({ noMoreDataFound: false })
          } else {
            setspinner(false)

             // this.setState({ isLoading: false, isFooterLoading: false })
             // this.setState({ isStopCallingAPI: true, noMoreDataFound: true, })
              // AppConstance.showSnackbarMessage(responseJson.message)
          }
      })
      .catch((error) => {
        setspinner(false)

        alert(error)
          console.warn(error)
      });
}


useEffect(() => {
 
  callingContainerApi()
   
}, []);   

const renderlist = ({item}) =>{
let hn =baseImagePath+ item.images[0].thumbnail;
console.log('----0--'+hn);
  return(
<TouchableOpacity style={{flexDirection:'row',alignSelf:'center',marginTop:7, borderColor:'white', width:'100%',height:80,justifyContent:'center', borderTopWidth:0.2}} 
onPress={() =>  navigation.navigate('CarDetails',{'datapre':item.id, 'imgs':item.images})}
>

{item.images ?
 <Image source={{uri: baseImagePath + item.images[0].thumbnail}} style={{ width: 80, height: 80,alignSelf:'center',marginRight:5, borderRadius:400/2 , }} resizeMode='cover' /> 

                    :
<Image source={require('../images/logofinal1.png')} style={{ width: 80, height: 80,alignSelf:'center',marginRight:5, borderRadius:400/2 , }} resizeMode='cover' /> 

}

{/* <Image source={require('../images/logofinal1.png')} style={{ width: 80, height: 80,alignSelf:'center',marginRight:5, borderRadius:400/2 , }} resizeMode='cover' />  */}

<View style={{width:'10%'}}>

</View>
<View style={{flexDirection:'column',justifyContent:'center', width:'70.4%',}} >
<View style={{borderBottomWidth:0.5, borderColor:'white', width:'100%'}}>
<Text style={{paddingVertical:1, fontSize:12.2}}>{item.year} {item.make} {item.model}</Text>
</View>


<View style={{borderBottomWidth:0.5,paddingVertical:1,borderColor:'white', width:'100%'}}>
<Text style={{paddingVertical:1,fontSize:12.2 }}>lot: {item.lot_number}</Text>
</View>



<View style={{borderBottomWidth:0.5,paddingVertical:1, borderColor:'white', width:'100%'}}>
<Text style={{paddingVertical:1,fontSize:12.2 }}>Port of landing: {item.location == 1 ? 'CA' : item.location == 2 ? 'GA' : item.location == 3 ? 'NY' : item.location == 4 ? 'TX' : item.location == 5 ? 'BALTIMORE' : item.location == 8 ? 'TORONTO' 

: item.location == 9 ? 'MONTREAL' :item.location == 10 ? 'HALIFAX' :item.location == 11 ? 'EDMONTON' :item.location == 12 ? 'CALGARY' :item.location == 13 ? 'Afghanistan' :item.location == 15 ? 'Turkamanistan' :
item.location == 19 ? 'VANCOUVER' :item.location == 21 ? 'CALGARY' : ''
}</Text>
</View>


<View style={{ width:'100%',paddingVertical:1,}}>
<Text style={{paddingVertical:1,fontSize:12.2 }}>Status: {item.status == '1' ? 'ON HAND': item.status =='2' ? 'Ready to load': item.status =='3' ?
 'ON THE WAY' : item.status =='6' ? 'NEW PURCHASED' : item.status =='10' ? 'ARRIVED' :  item.status =='11' ? 'IS_REQUESTED':  item.status =='12' ? 'DISPATCHED':
 item.status =='15' ? 'LOADED': ''}</Text>
</View>






</View>
</TouchableOpacity>
  
  )
  
   }

  return (

    // <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight,  }} >

    <SafeAreaView style={{ width:deviceWidth, height: deviceHeight, }}>


<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

{/* <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} > */}










{/* </ImageBackground> */}
<LinearGradient
                          colors={['#0066b8','#4585c9', '#81a7d9' ,'#bdd0eb', 'white' ]}
                          
                          locations={[0.05, 0.13 ,0.25 ,0.38, 0.5 ]}
                          style={{alignItems: 'center',
                          justifyContent: 'flex-start',
                          opacity:0.95,
                          
                          width: '100%',}}
                        >




<View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Container Info</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>

<View style={{flexDirection:'row',marginTop:5,paddingVertical:5, width:deviceWidth,paddingHorizontal:20, }}>


<View style={{width:'50%',flexDirection:'column',justifyContent:'center', }}>


<Text >ContainerNumber</Text>
<Text>Booking Number</Text>
<Text>Port Of Loading</Text>
<Text>Export Date</Text>
<Text>ETA</Text>
<Text>Arrived Date</Text>
<Text>Status</Text>

</View>
    


<View style={{width:'50%', justifyContent:'center', }}>
<Text >{data.container_number}</Text>
<Text>{data.booking_number}</Text>
<Text>{data.port_of_loading == 1 ? "CA":data.port_of_loading == 2 ? "GA":data.port_of_loading == 3 ? "NY":data.port_of_loading == 4 ? "TX":
data.port_of_loading == 5 ? "BALTIMORE":data.port_of_loading == 8 ? "TORONTO":data.port_of_loading == 9 ? "MONTREAL":data.port_of_loading == 10 ? "HALIFAX":data.port_of_loading == 11 ? "EDMONTON":
data.port_of_loading == 12 ? "CALGARY":data.port_of_loading == 13 ? "Afghanistan":data.port_of_loading == 15 ? "Turkamanistan":data.port_of_loading == 19 ? "VANCOUVER":data.port_of_loading == 21 ? "MANITOBA":""}</Text>
<Text>{data.export_date}</Text>
<Text>{data.eta}</Text>

<Text>{data.arrival_date}</Text>
<Text>{data.status == '1' ? 'ON HAND': data.status =='2' ? 'Ready to load': data.status =='3' ?
 'ON THE WAY' : data.status =='6' ? 'NEW PURCHASED' : data.status =='10' ? 'ARRIVED' :  data.status =='11' ? 'IS_REQUESTED':  data.status =='12' ? 'DISPATCHED':
 data.status =='15' ? 'LOADED': ''}</Text>
   </View>   

</View>

<View style={{backgroundColor:'orange',width:deviceWidth, justifyContent:'center',}}>
    <Text style={{alignSelf:'center',paddingVertical:7}}>Vehicles in Container</Text>
</View>

<FlatList
                         contentContainerStyle={{paddingHorizontal:15,marginTop:0, paddingBottom: 50}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={vehicledata}
                     renderItem={renderlist}
                     extraData={vehicledata}
                     keyExtractor={(item,index) => index.toString()}
                  />



</LinearGradient>

    </SafeAreaView>
    //  </ImageBackground>

  );
};


export default containerinfo;
