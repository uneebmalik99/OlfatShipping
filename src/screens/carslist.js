import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
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

const carslist = ({route, navigation }) => {
  const { type} = route.params;
  const [spinner , setspinner] =useState(false)
  const [noMoreDataFound ,setnoMoreDataFound] =useState(false)
  const [isFooterLoading , setisFooterLoading] = useState(false)
  const [images , setimages] = useState([])
  const [isStopCallingAPI ,setisStopCallingAPI]=useState(false)
  const [ page , setpage] = useState(2)
  // const [loc , setloc] = useState('')

  const [data, setdata] = useState([])
  const [search, setSearch] = useState('');
const [filteredDataSource, setFilteredDataSource] = useState([])

const searchFilterFunction = (text) => {
  if (text) {

    const newData = data.filter(
      function (item) {
        
        const itemData =  item.vin
          ?  item.vin.toUpperCase()
          :''.toUpperCase();

          const itemData2 =  item.lot_number
          ?  item.lot_number.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();

        if(itemData.indexOf(textData) > -1){
          return  itemData.indexOf(textData) > -1;
        }else{
          return  itemData2.indexOf(textData) > -1;
        }
    });
    setFilteredDataSource(newData);
    setSearch(text);
    console.log('text is '+text);
  } else {
    // Inserted text is blank
    console.log('blank');
    setFilteredDataSource(data);
    setSearch(text);
  }
};

const renderFooter = () => {
  if (isFooterLoading === true) {
      return <View style={{paddingVertical:15}}><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
  } else {
      return null;
  }
}

const loadMoreData = () => {
  // setisFooterLoading(true)
  setTimeout(() => {
      if (isStopCallingAPI === true) {

      } else {
          if (noMoreDataFound === true) {

          } else {
            setpage(prevState => prevState + 1);

            // setpage(page+1)
            callingVehicleApi(false)
          }
      }
  }, 100);
}

const  callingVehicleApi = (isFirstTimeCaling  ) => {
  var url = ''
  if (isFirstTimeCaling) {
    setdata('')
    setspinner(false)
      // this.setState({ isLoading: true, isFooterLoading: false })
      if(type != '0'){
        url = AppUrlCollection.VEHILE_LIST + 'status='+type;

      }else{
        url = AppUrlCollection.VEHILE_LIST 

      }
  } else {
    setspinner(false)
    setisFooterLoading(true)
      if(type != '0'){
        url = AppUrlCollection.VEHILE_LIST + 'page=' + page + 'status='+type;

      }else{
        url = AppUrlCollection.VEHILE_LIST + 'page=' + page

      }
  }
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'multipart/form-data',
           'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
  })
      .then((response) => response.json())
      .then((responseJson) => {
          // this.setState({ isLoading: false })
        setspinner(false)
          console.log('Response data viw :: ', responseJson.data)
          if (responseJson.status == AppConstance.API_SUCESSCODE) {
            baseImagePath = responseJson.data.other.vehicle_image;
            let data1 = responseJson.data.vehicleList;
            if (responseJson.data.vehicleList.length > 0 ) {
                console.log('response'+responseJson.data.vehicleList);
                  if (isFirstTimeCaling) {
                    setdata(data1)
                    setFilteredDataSource(data1)
                  console.log('----------------7------------'+responseJson.data.vehicleList.images);
                    // setvehicleList(responseJson.data)
                    setnoMoreDataFound(false)
                    // setisStopCallingAPI(false)
                    // alert(page)
                    setisFooterLoading(false)
                  
                      // this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
                  } else {
                    // alert(page)

                    setdata(old =>[...old, ...responseJson.data.vehicleList])
                    setFilteredDataSource(old =>[...old, ...responseJson.data.vehicleList])

                    // setdata(old => [...old, ...data]);
                    // setisStopCallingAPI(false)

                    setnoMoreDataFound(false)
                    setisFooterLoading(true)
                    setisStopCallingAPI(false)
                      // this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.vehicleList), noMoreDataFound: false, isFooterLoading: false })
                  }
              } else {
                  if (isFirstTimeCaling) {
                    setdata([])
                    setFilteredDataSource([])
                    setnoMoreDataFound(true);
                    setisFooterLoading(false)
                    setisStopCallingAPI(true)
                      // this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                  } else {
                    alert('fininsh')
                    setnoMoreDataFound(true);
                    setisFooterLoading(false)
                    setisStopCallingAPI(true)

                      // this.setState({ isFooterLoading: false, noMoreDataFound: true })
                  }

              }
          } else {
            setnoMoreDataFound(true);
            setisFooterLoading(false)
            setisStopCallingAPI(true)
              AppConstance.showSnackbarMessage(responseJson.message)
          }
      })
      .catch((error) => {
          console.warn(error)
      });
} 

useEffect(() => {
  let componentMounted = true;

  const unsubscribe = navigation.addListener('focus', () => {
    callingVehicleApi(true)
  });
  callingVehicleApi(true)
  // return () => {
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  
  return () => {
    componentMounted = false;
   }
}, []);   

const renderSeparator =()=>{
  return(
<View style={{height:4, width:deviceWidth, }}></View>
  );
}

const renderlist = ({item}) =>{
  
  return(
    
<TouchableOpacity style={{flexDirection:'row',alignSelf:'center',backgroundColor:'#E5E7E9', borderColor:'grey',borderRadius:50, width:'100%',height:80,justifyContent:'center', borderWidth:0.1, }} 
onPress={() => {setFilteredDataSource(''); navigation.navigate('CarDetails',{'datapre':item.id, 'imgs':item.images})}}
>
{item.images.length > 0 ?
                    // <Image style={{width:'35%',height:'100%', resizeMode:'cover'}} source={{ uri: baseImagePath + item.images[0].thumbnail }} /> 
                  <Image source={{ uri: baseImagePath + item.images[0].thumbnail }} style={{ width: 80, height: 80,alignSelf:'center',marginRight:5, borderRadius:400/2 , }} resizeMode='cover' /> 

                    :
       <Image source={require('../images/logofinal1.png')} style={{ width: 80, height: 80,alignSelf:'center',marginRight:5, borderRadius:400/2 , }} resizeMode='cover' /> 

}

    
{/* <Image source={require('../images/iii.jpg')} style={{ width: 80, height: 80,alignSelf:'center',marginRight:5, borderRadius:400/2 , }} resizeMode='cover' /> */}

<View style={{width:'8%'}}>

</View>
<View style={{flexDirection:'column',justifyContent:'center', width:'69.0%',}} >
<View style={{ width:'100%'}}>
<Text style={{paddingVertical:1,color:'#497ebf', fontSize:12.2}}>{item.year} {item.make} {item.model}</Text>
</View>


<View style={{paddingVertical:1,width:'100%'}}>
<Text style={{paddingVertical:1,color:'#497ebf', fontSize:12.2 }}>lot: {item.lot_number}</Text>
</View>



<View style={{paddingVertical:1,  width:'100%'}}>
<Text style={{paddingVertical:1,color:'#497ebf',fontSize:12.2 }}>Purchase Date: {item.purchase_date}</Text>
</View>


<View style={{ width:'100%',paddingVertical:1,}}>
<Text style={{paddingVertical:1,color:'#497ebf',fontSize:12.2 }}>Status: {item.status == '1' ? 'ON HAND': item.status =='2' ? 'Ready to load': item.status =='3' ?
 'ON THE WAY' : item.status =='6' ? 'NEW PURCHASED' : item.status =='10' ? 'ARRIVED' :  item.status =='11' ? 'IS_REQUESTED':  item.status =='12' ? 'DISPATCHED':
   item.status =='15' ? 'LOADED': ''}</Text>
</View>






</View>
</TouchableOpacity>

  
  
  )
  
}

  return (

    <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight,  }} >

    <SafeAreaView style={{ flex: 1,width:deviceWidth,marginBottom:100, height: deviceHeight, }}>


<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

{/* <LinearGradient
                          colors={['#0066b8','#4585c9', '#81a7d9' ,'#bdd0eb', 'white' ]}
                          
                          locations={[0.05, 0.1 ,0.18 ,0.26, 0.35 ]}
                          style={{alignItems: 'center',
                          justifyContent: 'flex-start',
                          opacity:0.95,
                          
                          width: '100%',}}
                        > */}


<View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>{type == '0' ? 'All Vehicles' : type == '6' ? 'New Purchase' :  type == '12' ? 'Dispatched':  type == '1' ? 'On Hand' :  type == '2' ? 'Ready to Load' : type == '15' ? 'Loaded' : type == '3' ? 'On the Way' :type == '10' ? 'Arrived' : type == '11' ? 'Handed Over' : ''}</Text>
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
          underlineColorAndroid="transparent"
          // placeholder="Search Container Number,status,port of loading"
           placeholder="Search by Vin Or lot number"

        />
</View>

{filteredDataSource.length > 0 ?
<FlatList
                         contentContainerStyle={{paddingHorizontal:15,paddingBottom:120 }}
                         contentInsetAdjustmentBehavior="automatic"
                      data={filteredDataSource}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                     ItemSeparatorComponent={renderSeparator}
                     onEndReached={loadMoreData}
                     ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.01}
                    
 
                     
 
                  />
:

<View style={{justifyContent:'center', height:deviceHeight}}> 
  <Text style={{alignSelf:'center', }}>No Data Found</Text>
</View>
}                 

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


export default carslist;
