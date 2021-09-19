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
import Snackbar from 'react-native-snackbar';


var baseImagePath = '';

const Trackandtrace = ({route, navigation }) => {
  const [spinner , setspinner] =useState(false)
  // const [loc , setloc] = useState('')
  const [search, setSearch] = useState('');
  const[show , setshow] = useState(false)
  const [filteredDataSource, setFilteredDataSource] = useState([])

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
      setFilteredDataSource(newData);
      setSearch(text);
      console.log('text is '+text);
    } else {
      // Inserted text is blank
      console.log('blank');
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };
  const searchingApi =()=>{

    setspinner(true)
   if(search != ''){
 
   var url = '';
       url = AppUrlCollection.VEHICLE_CONTAINER + 'search_str=' + search;
   
   
   
       fetch(url , {
       method: 'GET',
         headers: {
             'Content-Type': 'application/json',
             'authkey': AppConstance.USER_INFO.USER_TOKEN
         },
     })
         .then((response) => response.json())
         .then((responseJson) => {
   
           console.warn( 'response');
             if (responseJson.status == AppConstance.API_SUCESSCODE) {
               console.warn('response of trackinh seach is :::::::::::'+responseJson.data.vehicleList);
               let data = responseJson.data.vehicleList;
 
 
               if(data != null){
                setFilteredDataSource(responseJson.data.vehicleList)
                setspinner(false)

                //  if(data.status !== '1' && data.status !== '3'){
                //    let vexp =responseJson.data.vehicleList[0].vehicleExport;
                //    let img =responseJson.data.vehicleList[0].images;
                //    let towing = responseJson.data.vehicleList[0].towingRequest;
                //   //  navigation.navigate('TrackingSearchDetails',{datapre : data, img:img , exp:exp,tow:towing, vexp,vexp})
                //    setspinner(false)
 
 
                //  }else{
                //   //  let img =responseJson.data.vehicleList[0].images;
                //   //  let towing = responseJson.data.vehicleList[0].towingRequest;
                //   showSnackbarMessage()
 
                //   //  navigation.navigate('TrackingSearchDetails',{datapre : data, img:img ,tow:towing, exp:'0', vexp:'0'})
                //    setspinner(false)
 
 
                //  }
 
           
                 // alert(exports)
 
               }else{
                showSnackbarMessage()          
                       setspinner(false)
 

               }
                
               // navigation.navigate('TrackingSearchDetails',{})
                 //this.setState({ noMoreDataFound: false })
             } else {
              showSnackbarMessage()          

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
       else{
         alert('Please enter lot number ')
         setspinner(false)
       }
 
 
 
 
 }

 const showSnackbarMessage = () => {
  setTimeout(() => {
    Snackbar.show({
      backgroundColor: '#008B8B',
      title: 'No data found',
      duration: Snackbar.LENGTH_SHORT,
    });
  }, 200);
};


const callingApi = async (isCallingFirsttime) => {
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
                  setFilteredDataSource(data)
                  setdata(data)
              } else {
                setdata(data)
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
 
   
}, []);   


const renderlist = ({item}) =>{
  
  return(
<TouchableOpacity style={{flexDirection:'row',alignSelf:'center',backgroundColor:'#E5E7E9', borderColor:'grey',borderRadius:50, width:'100%',height:80,justifyContent:'center', borderWidth:0.1, }} 
onPress={() =>  navigation.navigate('CarDetails',{'datapre':item.id, 'img':item.images})}
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
// const renderlist = ({item}) =>{
  
//   return(
// <View style={{width:deviceWidth, paddingHorizontal:15}}>
// <TouchableOpacity style={{flexDirection:'row',  alignSelf:'center',backgroundColor:'#E5E7E9',borderRadius:10,paddingHorizontal:8, borderColor:'grey', width:'100%',height:80,justifyContent:'center', borderBottomWidth:0.2}} 
// onPress={() =>  navigation.navigate('containerinfo',{'id': item.id})}
// >


// <View style={{width:'50%',flexDirection:'column',justifyContent:'center', }}>
// <Text >ContainerNumber</Text>
// <Text>Port Of Loading</Text>
// <Text>ETA</Text>
// <Text>Status</Text>

// </View>
    


// <View style={{width:'50%', justifyContent:'center', }}>
// <Text>{item.container_number}</Text>
// {/* <Text>{item.location == 1 ? 'CA' : item.location == 2 ? 'GA' : item.location == 3 ? 'NY' : item.location == 4 ? 'TX' : item.location == 5 ? 'BALTIMORE' : item.location == 8 ? 'TORONTO' 

// : item.location == 9 ? 'MONTREAL' :item.location == 10 ? 'HALIFAX' :item.location == 11 ? 'EDMONTON' :item.location == 12 ? 'CALGARY' :item.location == 13 ? 'Afghanistan' :item.location == 15 ? 'Turkamanistan' :
// item.location == 19 ? 'VANCOUVER' :item.location == 21 ? 'CALGARY' : ''
// }</Text> */}
// <Text>{item.port_of_loading}</Text>

// <Text>{item.eta}</Text>
// <Text>{item.status == '1' ? 'ON HAND': item.status =='2' ? 'Ready to load': item.status =='3' ?
//  'ON THE WAY' : item.status =='6' ? 'NEW PURCHASED' : item.status =='10' ? 'ARRIVED' :  item.status =='11' ? 'IS_REQUESTED':  item.status =='12' ? 'DISPATCHED':
//    item.status =='15' ? 'LOADED': ''}</Text>
// </View>    


// </TouchableOpacity>

  
//   </View>

// )
  
//    }

  return (

    <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight,  }} >

    <SafeAreaView style={{ flex: 1,width:deviceWidth, height: deviceHeight, }}>


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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>   Track and trace
</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>

<View style={{width:deviceWidth , height:deviceHeight}}>
<View

style={{height:50,paddingHorizontal:15,marginTop:1,flexDirection:'row', justifyContent:'center'}}>
 <TextInput
          style={{height:35,
    borderWidth: 0.4,
    paddingLeft: 20,
    borderRadius:30,
    fontSize:14,
    width:'90%',
    paddingVertical:5,
    alignSelf:'center',
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',}}
          onChangeText={   (text) =>  {setSearch(text); if(text.length >= 1){
            setshow(true)
          } }}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Enter VIN or LOT No."
        />
<TouchableOpacity 
  onPress={()=> {searchingApi()}}
  style={{marginTop:0, height:35,   borderRadius:30,    justifyContent:'center', backgroundColor:'white', paddingHorizontal:10, alignSelf:'center'}}>
<Ionicons name='md-search-outline' size={20}/>
</TouchableOpacity>
</View>



{/* {filteredDataSource.length > 0 ? */}

{/* <ScrollView style={{width:deviceWidth, backgroundColor:"white",}}>




<View style={{paddingHorizontal:25,marginTop:10, width:deviceWidth,flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'55%',paddingVertical:2,justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Status</Text>
<Text style={{fontSize:12}}>On-Hand</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Year</Text>
<Text style={{fontSize:12}}>2020</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Make</Text>
<Text style={{fontSize:12}}>Honda</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Model</Text>
<Text style={{fontSize:12}}>Civic</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:2, width:'55%',justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>VIN</Text>
<Text style={{fontSize:12}}>236889</Text>
</View>




<View style={{flexDirection:'row',width:'55%',paddingVertical:2,justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Status</Text>
<Text style={{fontSize:12}}>On-Hand</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Year</Text>
<Text style={{fontSize:12}}>2020</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Make</Text>
<Text style={{fontSize:12}}>Honda</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Model</Text>
<Text style={{fontSize:12}}>Civic</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:2, width:'55%',justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>VIN</Text>
<Text style={{fontSize:12}}>236889</Text>
</View>
</View>


</ScrollView> */}


{filteredDataSource.length > 0 ?
<FlatList
                         contentContainerStyle={{paddingHorizontal:0,paddingBottom:120 }}
                         contentInsetAdjustmentBehavior="automatic"
                      data={filteredDataSource}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                     ItemSeparatorComponent={renderSeparator}
                    onEndReachedThreshold={0.01}
                    
 
                     
 
                  />
:

<View style={{justifyContent:'center', height:deviceHeight}}> 
  <Text style={{alignSelf:'center', }}>No Data Found</Text>
</View>
}                 

                  {/* : */}

{/* <View style={{justifyContent:'center', height:deviceHeight}}> 
  <Text style={{alignSelf:'center', }}>No Data Found</Text>
</View> */}
{/* }   */}
                  <View style={{height:50}}>

                  </View>

</View>

{/* <View

style={{height:deviceHeight*0.04, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:10}}>Sorting: locationwise</Text>
</View> */}



    </SafeAreaView>
    </ImageBackground>


  );
};


export default Trackandtrace;
