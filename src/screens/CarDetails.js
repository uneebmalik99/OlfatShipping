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
  Share,
  StatusBar,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Entypo from  'react-native-vector-icons/dist/Entypo';
import { SliderBox } from "react-native-image-slider-box";
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';



var baseImagePath= 'https://system.olfatshipping.com/uploads/';
const CarDetails = ({route, navigation }) => {
  const [vehicleDetails , setvehicleDetails] = useState([])

  const [phone , setphone] = useState('')
  const [Exportdata , setExportdata] = useState({
 

        "id": "100",
        "export_date": "",
        "loading_date": "",
        "broker_name": "",
        "booking_number": "",
        "eta": "",
        "ar_number": "",
        "xtn_number": "",
        "seal_number": "",
        "container_number": "",
        "cutt_off": "",
        "vessel": "",
        "voyage": "",
        "terminal": "",
        "streamship_line": "",
        "destination": "",
        "itn": "",
        "contact_details": "",
        "special_instruction": "",
        "container_type": "",
        "port_of_loading": "",
        "port_of_discharge": "",
        "export_invoice": "",
        "bol_note": "",
        "export_is_deleted": "",
        "created_by": "",
        "updated_by": "",
        "created_at": "",
        "updated_at": "",
        "legacy_customer_id": "",
        "added_by_role": "",
        "customer_user_id": "",
        "notes_status": "",
        "oti_number": "",
        "arrival_date": "",
        "type": "",
        "export_status": "",
        "invoice": ""
    
  })
  const [TowingRequest , setTowingRequest] = useState(

   { "id": "8005",
                "condition": "",
                "damaged": "",
                "pictures": "",
                "towed": "",
                "title_recieved": "",
                "title_recieved_date": "",
                "title_number": "",
                "title_state": "",
                "towing_request_date": "",
                "pickup_date": "",
                "deliver_date": "",
                "tow_by": "",
                "tow_fee": "",
                "note": "",
                "title_type": "",
                "type": ""
  }
  )

  const {datapre , imgs } = route.params;
  const [imgpos, setimgpos] = useState(0)
  const [imageslider , setimageslider] = useState([])
  const [img , setimg] = useState([])
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)


  const showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#008B8B',
        title: 'Image Downloaded Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 200);
  };

  const checkPermission = async (image) => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage(image);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(image);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };


  const downloadImage = (img) => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = img;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        showSnackbarMessage()
        // alert('Image Downloaded Successfully.');
      });
  };


const getExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ?
           /[^.]+$/.exec(filename) : undefined;
};

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const [width, setwidth] =useState('100%')
  const [currentimg, setcurrentimg] = useState('')
const [Export, setExport] = useState(false)

const callingVehicleApi = async (isCallingFirsttime) => {
  setspinner(true)
  var url = AppUrlCollection.VEHICLE_DETAIL +'?id=' +datapre ;
  
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

                baseImagePath = responseJson.data.other.vehicle_image;
                let data = responseJson.data.vehicle;
                let towingRequest = responseJson.data.vehicle.towingRequest

                let export1 ;
                if(responseJson.data.vehicle.vehicleExports == null){

                 export1 = responseJson.data.vehicle.vehicleExports

                }else{
                   export1 = responseJson.data.vehicle.vehicleExports.export
                   setExportdata(export1)

                }
                
                let img = responseJson.data.vehicle.images;
                //this.setState({ isLoading: false, isFooterLoading: false })
                // if (data.length > 0) {

                setvehicleDetails(data)
                let imgesfromresponse = responseJson.data.vehicle.images;
                  setspinner(false)
                  console.log('==='+baseImagePath);
                  setphone(data.customerUser.phone)
                  setTowingRequest(towingRequest)
                //   for (let index = 0; index < img.length; index++) {
                //     const element = img[index];
                //     imageslider.push(baseImagePath + element.thumbnail)
                //     console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
                // }

                console.log('--'+JSON.stringify(imgs));


              //   if (responseJson.data.vehicle.images != undefined) {
              //     setimg(responseJson.data.vehicle.images)
              //     for (let index = 0; index < responseJson.data.vehicle.images.length; index++) {
              //         const element = responseJson.data.vehicle.images[index];
              //         imageslider.push(baseImagePath + element.thumbnail)
              //         console.log('Image vehicle at respo :;;', baseImagePath + element.thumbnail)
              //     }
              
              //   }else if (vehicleDetails.images != undefined){
  
              //     for (let index = 0; index < vehicleDetails.images.length; index++) {
              //       const element = vehicleDetails.images[index];
              //       iimageslidermages.push(baseImagePath + element.thumbnail)
              //       console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
              //   }
              // }else{
              //   for (let index = 0; index < imgs.length; index++) {
              //     const element = imgs[index];
              //     imageslider.push(baseImagePath + element.thumbnail)
              //     console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
              // }

              // }
                
                  // for (let index = 0; index < imgs.length; index++) {
                  //     const element = imgs[index];
                  //     imageslider.push(baseImagePath + element.thumbnail)
                  //     console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
                  // }

                //   if (responseJson.data.vehicle.images != undefined ) {
                //     // setimageslider(responseJson.data.vehicle.images)
                //     for (let index = 0; index < responseJson.data.vehicle.images.length; index++) {
                //         const element = responseJson.data.vehicle.images[index];
                //         imageslider.push(baseImagePath + element.thumbnail)
                //         console.log('Image vehicle :;;', baseImagePath + element.thumbnail)
                //     }
                //     console.log('response-images'+imageslider.length);
                //   }else{
    
                //     for (let index = 0; index < vehicleDetails.images.length; index++) {
                //       const element = vehicleDetails.images[index];
                //       imageslider.push(baseImagePath + element.thumbnail)
                //       console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
                //   }
                //   console.log('vehicledaetails-vehicledetis'+imageslider.length);

                // }

              //   if (responseJson.data.vehicle.images != undefined && responseJson.data.vehicle.images != undefined) {
              //     setimageslider(responseJson.data.vehicle.images)
              //     for (let index = 0; index < responseJson.data.vehicle.images.length; index++) {
              //         const element = responseJson.data.vehicle.images[index];
              //         imageslider.push(baseImagePath + element.thumbnail)
              //         console.log('Image vehicle :;;', baseImagePath + element.thumbnail)
              //     }
              
              //   }else{
  
              //     for (let index = 0; index < vehicleDetails.images.length; index++) {
              //       const element = vehicleDetails.images[index];
              //       imageslider.push(baseImagePath + element.thumbnail)
              //       console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
              //   }
              // }


          //     if (responseJson.data.vehicle.images != null ) {
          //       // setimages(responseJson.data.vehicle.images)
               
          //       for (let index = 0; index < img.length; index++) {
          //           const element = img[index];
          //           // setimages(old =>[...old, ... baseImagePath+element.thumbnail ])
          //           images.push(baseImagePath + element.thumbnail)
          //           console.log('Image vehicle :;;', baseImagePath + element.thumbnail)
          //           console.log('---'+images.length)
          //       }
            
              
          //   }else{
          //     for (let index = 0; index < vehicleDetails.images.length; index++) {
          //       const element = vehicleDetails.images[index];
          //       images.push(baseImagePath + element.thumbnail)
          //       console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
          //   }
          // }
                  // console.log(JSON.stringify(data));

                    // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                    //this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
                    // setFilteredDataSource(data)
                  
                // } else {
                //   setdata(data)
                //   setspinner(false)
  
  
                //    // this.setState({ noMoreDataFound: true, isFooterLoading: false, isStopCallingAPI: true })
                // }
               
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

//   for (let index = 0; index < imgs.length; index++) {
//     const element = imgs[index];
//     imageslider.push(baseImagePath + element.thumbnail)
//     console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
// }

let g = imgs;
console.log('++'+imgs.length);
if (imgs != undefined){
  
  for (let index = 0; index < imgs.length; index++) {
    const element = imgs[index];
    imageslider.push(baseImagePath + element.thumbnail)
    console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
}
console.log(imageslider.length);
}
  callingVehicleApi()
 
  
}, [])




return (
  <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight,  }} >

   
  <SafeAreaView style={{   height: deviceHeight, }}>
  {/* <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} /> */}
  {/* <Toolbar toggle={this.props.toggle} headerName='DASHBOARD' isFilterIconShow={false} isInnerScreen={false} /> */}
 
  {/* <LinearGradient
                          colors={['#0066b8','#4585c9', '#81a7d9' ,'#bdd0eb', 'white' ]}
                          
                          locations={[0.05, 0.13 ,0.25 ,0.38, 0.5 ]}
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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Vehicle Details</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>
 


<ScrollView style={{width:deviceWidth }}>



 <SliderBox 
          images={imageslider}
          sliderBoxHeight={210}
          
          autoplay={true}
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 15,
    marginHorizontal: -6,
    padding: 0,
    margin: 0
  }}
          resizeMethod={'resize'}  
          resizeMode={'cover'}
  circleLoop
  currentImageEmitter={index => { setimgpos(index); 
   }}

          onCurrentImagePressed={index =>
          //setcurrentimg()
            // console.warn(`image ${index} pressed`)
            setSliderModel(true)
          }
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 8}}

        />

<View style={{height:40,justifyContent:'center',marginTop:10, shadowColor: 'grey',borderRadius:10,
    shadowOffset: { width: 3, height:4 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,marginBottom:10, backgroundColor:'orange'}}>
<Text style={{alignSelf:'center', fontSize:18}}>Vehicle Information</Text>
</View>

<View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'#F2F3F4',   shadowColor: 'grey',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,alignSelf:'center',borderRadius:10,borderWidth:0.2, marginTop:1,paddingHorizontal:10, width:'95%',}} >





<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5,paddingVertical:5,borderColor:'grey', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>lot </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{vehicleDetails.lot_number}</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5, borderColor:'grey', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>VIN </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{vehicleDetails.vin}</Text>
</View>

<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>YEAR MAKE MODEL </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{vehicleDetails.year} {vehicleDetails.make} {vehicleDetails.model}</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5, borderColor:'grey', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>PURCHASE DATE </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{vehicleDetails.purchase_date}</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>DELIVERED DATE </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{TowingRequest.deliver_date}</Text>
</View>



<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5,paddingVertical:5, borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Key </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{vehicleDetails.keys}</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Title </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{TowingRequest.title_recieved == 1 ? "EXPORTABLE": TowingRequest.title_recieved == 2 ? "PENDING":TowingRequest.title_recieved == 3 ? "BOS":TowingRequest.title_recieved == 4 ? "LIEN": TowingRequest.title_recieved == 5 ? "MV907":" " }</Text>
</View>


<View style={{width:'100%',flexDirection:'row', borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Buyer Number </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{phone}</Text>
</View>

<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>State City </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>-</Text>
</View>

<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Loading Port </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{Exportdata.port_of_loading == 1 ? "CA":Exportdata.port_of_loading == 2 ? "GA":Exportdata.port_of_loading == 3 ? "NY":Exportdata.port_of_loading == 4 ? "TX":
Exportdata.port_of_loading == 5 ? "BALTIMORE":Exportdata.port_of_loading == 8 ? "TORONTO":Exportdata.port_of_loading == 9 ? "MONTREAL":Exportdata.port_of_loading == 10 ? "HALIFAX":Exportdata.port_of_loading == 11 ? "EDMONTON":
Exportdata.port_of_loading == 12 ? "CALGARY":Exportdata.port_of_loading == 13 ? "Afghanistan":Exportdata.port_of_loading == 15 ? "Turkamanistan":Exportdata.port_of_loading == 19 ? "VANCOUVER":Exportdata.port_of_loading == 21 ? "MANITOBA":""}</Text>
</View>

<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5,paddingVertical:5, borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Status </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{vehicleDetails.status == 1 ? "ON HAND" :vehicleDetails.status == 2 ? "MANIFEST" :vehicleDetails.status == 3 ? "DISPATCHED" :vehicleDetails.status == 4 ? "SHIPPED" :vehicleDetails.status == 5 ? "PICKED UP" :vehicleDetails.status == 6 ? "ARRIVED" : "" }</Text>
</View>


<View style={{width:'100%',flexDirection:'row', paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>NOTE </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{vehicleDetails.note}</Text>
</View>





















</View>
<View style={{height:50,justifyContent:'center',marginTop:10,  shadowColor: 'grey',borderRadius:10,
    shadowOffset: { width: 3, height:4 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,  marginBottom:10, backgroundColor:'orange'}}>
<Text style={{alignSelf:'center', fontSize:18}}>Container Information</Text>
</View>

<View style={{flexDirection:'column',justifyContent:'center',shadowColor: 'grey',backgroundColor:'#F2F3F4', 
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1, marginTop:1,paddingHorizontal:15,alignSelf:'center', borderRadius:10,borderWidth:0.2, marginTop:1, width:'95%',}} >





<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5,paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Container No. </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{vehicleDetails.container_number}</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Loaded Date </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{Exportdata.loading_date}</Text>
</View>

<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Export Date</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{Exportdata.export_date}</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>ETA</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{Exportdata.eta}</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Arrived Date</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>{Exportdata.arrival_date}</Text>
</View>



</View>

<View style={{height:40,justifyContent:'center',marginTop:10,shadowColor: 'grey',borderRadius:10,
    shadowOffset: { width: 3, height:4 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,marginBottom:10, backgroundColor:'orange'}}>
<Text style={{alignSelf:'center', fontSize:18}}>INVOICE</Text>
</View>

<View style={{flexDirection:'column',justifyContent:'center', marginTop:1,shadowColor: 'grey',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1, marginTop:1,paddingHorizontal:15,alignSelf:'center', borderRadius:10,borderWidth:0.2, marginTop:1, backgroundColor:'#F2F3F4', width:'95%',}} >





<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5,paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Invoice#</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>-</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,width:'30.4%',  fontSize:14,}}>Vehicle purchase</Text>
<Text>$</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>-</Text>
</View>

<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,width:'30%',  fontSize:14,}}>Shipping</Text>
<Text>$</Text>

<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>-</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, width:'30%', fontSize:14,}}>Paid Amount</Text>
<Text>$</Text>

<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>-</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,width:'30%', fontSize:14,}}>Balance Amount</Text>
<Text>$</Text>

<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>-</Text>
</View>
<View style={{width:deviceWidth, height:30}} >

</View>


</View>

<View style={{height:5,width:deviceWidth}}>

</View>
</ScrollView>


{/* </LinearGradient> */}

</SafeAreaView>
</ImageBackground>


//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
//     <Image source={require('../images/backgroundimage4.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} />
//      <Spinner
//           visible={spinner}
//           textContent={'Loading...'}
//           textStyle={{ color: '#FFF'}}
//         />



// <Modal
//           transparent={true}
//           visible={SliderModel}
//          >
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               backgroundColor: 'black',
//               paddingVertical: 20,
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}>
//             <View
//               style={{
//                 paddingHorizontal: 20,
//                 marginTop: 10,
//                 flexDirection: 'row',
//                 alignItems: 'flex-end',
//                 alignSelf: 'flex-end',
//                 alignContent: 'flex-end',
//               }}>
//               <TouchableOpacity
//                 onPress={() =>setSliderModel(false)}>

//                   <MaterialIcons name='cancel' size={25} color='red'/>
//                 {/* <Image
//                   style={{width: 30, height: 30}}
//                   source={require('../Assets/icons/cancel.png')}
//                 /> */}
//               </TouchableOpacity>
//             </View>
//             <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
//               <SliderBox
//                 images={images}
//                 sliderBoxHeight={500}
//                 dotColor="#FFEE58"
//                 inactiveDotColor="#90A4AE"
//                 resizeMethod={'resize'}  
//           resizeMode={'contain'}
                
//                 dotStyle={{
//                   width: 13,
//                   height: 13,
//                   borderRadius: 15,
//                   marginHorizontal: -6,
//                   padding: 0,
//                   margin: 0,
//                 }}
//                 // resizeMethod={'resize'}
//                 // resizeMode={'cover'}
//                 // autoplay
//                 circleLoop
//                 onCurrentImagePressed={(index) =>
//                   console.log(`image ${index} pressed`)
//                 }
//               />
//             </View>
//           </View>
//         </Modal>
      





// <View
// style={{width:deviceWidth,flexDirection:'row', backgroundColor:'red',justifyContent:'space-between', paddingHorizontal:13,paddingVertical:5, height:deviceHeight*0.056,}}>

// <View style={{flexDirection:'row'}}>
// <TouchableOpacity
// style={{justifyContent:'center'}}
// onPress={()=>navigation.goBack()}

// >
// <MaterialIcons  name='keyboard-backspace' size={23}/>
// </TouchableOpacity>

// <Text style={{marginLeft:6,alignSelf:'center'}}>View Vehicle</Text>
// </View>
// <View style={{alignItems:'flex-end',justifyContent:'center', marginRight:5}}>
// <TouchableOpacity
// style={{justifyContent:'center'}}
// onPress={()=>onShare()}
// >
// <Entypo style={{alignSelf:'center'}} name='share' size={20}/>
// </TouchableOpacity>
// </View>
// </View>



// <ScrollView style={{width:deviceWidth,backgroundColor:AppColors.blue, }}>


// <SliderBox 
//           images={images}
//           sliderBoxHeight={180}
          
//           dotColor="#FFEE58"
//   inactiveDotColor="#90A4AE"
//   dotStyle={{
//     width: 10,
//     height: 10,
//     borderRadius: 15,
//     marginHorizontal: -6,
//     padding: 0,
//     margin: 0
//   }}
//           resizeMethod={'resize'}  
//           resizeMode={'cover'}
//   circleLoop
//   currentImageEmitter={index => { setimgpos(index); 
//    }}

//           onCurrentImagePressed={index =>
//           //setcurrentimg()
//             // console.warn(`image ${index} pressed`)
//             setSliderModel(true)
//           }
//   paginationBoxStyle={{
//     alignItems: "center",
//     alignSelf: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//   }}
//   ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 8}}

//         />
// <TouchableOpacity style={{ marginRight:16, width:80,marginTop:-25,alignSelf:'flex-end', height:28,}}

// onPress={()=>
// // alert(images1[imgpos])
// checkPermission(images[imgpos])

// }>

//   <Text style={{fontWeight:'bold',fontSize:16, color:'grey',}}>Download</Text>
// </TouchableOpacity>


// <View style={{flexDirection:'column',justifyContent:'center', marginTop:1,paddingHorizontal:10, width:'100%',}} >



// <View
// style={{width:'100%', marginTop:3,paddingHorizontal:10, height:deviceHeight*0.13,borderWidth:0.5, paddingVertical:3, borderRadius:5, flexDirection:'row', backgroundColor:'white'}} >

// <View style={{flexDirection:'column',width:'60%',justifyContent:'center'}}>
// <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{vehicleDetails.year} {vehicleDetails.make} {vehicleDetails.model}</Text>
// <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>Lot: {vehicleDetails.lot_number}</Text>
// <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{vehicleDetails.vin}</Text>


// </View>
// <View style={{flexDirection:'column',width:'50%',justifyContent:'center'}}>
// <Text style={{color:'grey',paddingVertical:2, fontSize:16,}}>SHIPPED</Text>


// </View>
// </View>




















// </View>

// </ScrollView>








//     </SafeAreaView>

  );
};


export default CarDetails;
