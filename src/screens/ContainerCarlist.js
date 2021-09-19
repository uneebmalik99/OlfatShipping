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
import LinearGradient from 'react-native-linear-gradient';


var baseImagePath = '';

const ContainerCarlist = ({route, navigation }) => {
  const [spinner , setspinner] =useState(false)
  // const [loc , setloc] = useState('')
  const [search, setSearch] = useState('');
  const [filteredDataSource, setfilteredDataSource] = useState([])

  const [data, setdata] = useState([])

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      console.log(text);
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(
        function (item) {
          
          // const itemdata2 = item.VIN
          
          const itemData =  item.container_number
            ?  item.container_number.toUpperCase()
            :''.toUpperCase();

            const itemData2 =  item.port_of_loading
            ?  item.port_of_loading.toUpperCase()
            : ''.toUpperCase();

          const textData = text.toUpperCase();
          if(itemData.indexOf(textData) > -1){
            return  itemData.indexOf(textData) > -1;
          }else{
            return  itemData2.indexOf(textData) > -1;
          }
      });
      setfilteredDataSource(newData);
      setSearch(text);
      console.log('text is '+text);
    } else {
      // Inserted text is blank
      console.log('blank');
      // Update FilteredDataSource with masterDataSource
      setfilteredDataSource(data);
      setSearch(text);
    }
  };
const callingContainerApi = async (isCallingFirsttime) => {
setspinner(true)
var url = AppUrlCollection.EXPORT_LIST;

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
              if (data.length > 0) {
                setspinner(false)
                  // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                  //this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
                  setfilteredDataSource(data)
                  setdata(data)
              } else {
                setdata(data)
                setfilteredDataSource(data)

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

const renderSeparator =()=>{
  return(
<View style={{height:4, width:deviceWidth, }}></View>
  );
}
useEffect(() => {
  // Update the document title using the browser API
 // const subscription = props.source.subscribe();
 const unsubscribe = navigation.addListener('focus', () => {
  callingContainerApi()
});
// setspinner(true)
//   callingVehicleApi(true)
  // return () => {
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  callingContainerApi(true)
   
}, []);   

const renderlist = ({item}) =>{
  
  return(
<View style={{width:deviceWidth, paddingHorizontal:15}}>
<TouchableOpacity style={{flexDirection:'row',  alignSelf:'center',backgroundColor:'#E5E7E9',borderRadius:10,paddingHorizontal:8, borderColor:'grey', width:'100%',height:80,justifyContent:'center', borderBottomWidth:0.2}} 
onPress={() =>  {setfilteredDataSource(''); navigation.navigate('containerinfo2',{'id': item.id})}}
>


<View style={{width:'50%',flexDirection:'column',justifyContent:'center', }}>
<Text >ContainerNumber</Text>
<Text>Port Of Loading</Text>
<Text>ETA</Text>
<Text>Status</Text>

</View>
    


<View style={{width:'50%', justifyContent:'center', }}>
<Text>{item.container_number}</Text>
{/* <Text>{item.location == 1 ? 'CA' : item.location == 2 ? 'GA' : item.location == 3 ? 'NY' : item.location == 4 ? 'TX' : item.location == 5 ? 'BALTIMORE' : item.location == 8 ? 'TORONTO' 

: item.location == 9 ? 'MONTREAL' :item.location == 10 ? 'HALIFAX' :item.location == 11 ? 'EDMONTON' :item.location == 12 ? 'CALGARY' :item.location == 13 ? 'Afghanistan' :item.location == 15 ? 'Turkamanistan' :
item.location == 19 ? 'VANCOUVER' :item.location == 21 ? 'CALGARY' : ''
}</Text> */}
<Text>{item.port_of_loading == 1 ? "CA":item.port_of_loading == 2 ? "GA":item.port_of_loading == 3 ? "NY":item.port_of_loading == 4 ? "TX":
item.port_of_loading == 5 ? "BALTIMORE":item.port_of_loading == 8 ? "TORONTO":item.port_of_loading == 9 ? "MONTREAL":item.port_of_loading == 10 ? "HALIFAX":item.port_of_loading == 11 ? "EDMONTON":
item.port_of_loading == 12 ? "CALGARY":item.port_of_loading == 13 ? "Afghanistan":item.port_of_loading == 15 ? "Turkamanistan":item.port_of_loading == 19 ? "VANCOUVER":item.port_of_loading == 21 ? "MANITOBA":""}
</Text>

<Text>{item.eta}</Text>
<Text>
{item.status == 1 ? "ON HAND" :item.status == 2 ? "MANIFEST" :item.status == 3 ? "DISPATCHED" :item.status == 4 ? "SHIPPED" :item.status == 5 ? "PICKED UP" :item.status == 6 ? "ARRIVED" : "" }


</Text>
</View>    


</TouchableOpacity>

  
  </View>
  )
  
   }

  return (

    <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight,  }} >

    <SafeAreaView style={{ flex: 1,width:deviceWidth, height: deviceHeight, }}>
 {/* <LinearGradient
                          colors={['#0066b8','#4585c9', '#81a7d9' ,'#bdd0eb', 'white' ]}
                          
                          locations={[0.05, 0.1 ,0.18 ,0.26, 0.35 ]}
                          style={{alignItems: 'center',
                          justifyContent: 'flex-start',
                          opacity:0.95,
                          
                          width: '100%',}}
                        > */}






<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />



<View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Container</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>

<View style={{width:deviceWidth , height:deviceHeight}}>
<View

style={{height:50,paddingHorizontal:15, justifyContent:'center'}}>
 <TextInput
          style={{height:35,
    borderWidth: 0.4,
    paddingLeft: 20,
    borderRadius:30,
    fontSize:14,
    paddingVertical:5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',}}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Container Number"
        />
</View>
{filteredDataSource.length > 0 ?

<FlatList
                         contentContainerStyle={{marginTop:15,paddingBottom:120 }}
                         contentInsetAdjustmentBehavior="automatic"
                      data={filteredDataSource}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                     ItemSeparatorComponent={renderSeparator}

                  />
                  :

<View style={{justifyContent:'center', height:deviceHeight}}> 
  <Text style={{alignSelf:'center', }}>No Data Found</Text>
</View>
}  
                  <View style={{height:50}}>

                  </View>

</View>

{/* <View

style={{height:deviceHeight*0.04, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:10}}>Sorting: locationwise</Text>
</View> */}


{/* </LinearGradient> */}

    </SafeAreaView>
     </ImageBackground>


  );
};


export default ContainerCarlist;
