import React from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo'; 
import Ionicons from  'react-native-vector-icons/dist/Ionicons'
import { useState } from 'react';

const serviceDetails = ({route, navigation }) => {

    const {itemObj } = route.params;
    const [saveYadData , setsaveYadData] = useState('')
    const [ ourServiceList , setourServiceList] = useState([
        
        {
            image: '../images/autoshipping.jpg',
            title: 'Ground Transportation',
            detail: 'We offer fully integrated custom logistic service for freight transportation on LTL and FTL to/from anywhere in the USA. We can integrate all of your transportation needs into a simple and cost effective solution to ensure a safe and rapid delivery for all your valuable goods.'
        }, {
            image: 'http://vertical.gwwshipping.com/wp-content/uploads/2019/03/Towing-694-458.jpg',
            title: 'Auto Shipping',
            detail: 'We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it'
        }, {
            image: 'http://vertical.gwwshipping.com/wp-content/uploads/2019/03/custom-clearence-694-458-1.jpg',
            title: 'Customs Clearance',
            detail: 'We provide a comprehensive U.S customs clearance service, ensuring speedy delivery of your cargo to its final destination. We help you to prepare all required documents..'
        }, {
            image: 'http://gwwshipping.com/wp-content/uploads/2019/03/Warehousing-694-458.jpg',
            title: 'Warehousing',
            detail: 'As part of our comprehensive logistics solutions, we also offer our clients a range of warehousing services. Two warehouses in New York and Florida are in your service.'
        }, {
            image: 'http://gwwshipping.com/wp-content/uploads/2019/03/Loading-694-458.jpg',
            title: 'Tracking and Tracing',
            detail: 'We provide internet tracking and tracing to all out customers. Our custom made tracking solution provides complete cargo and shipping information.'
        }, {
            image: '../images/autoshipping.jpg',
            title: 'Car Sales',
            detail: 'Here at GALAXY SHIPPING we can help you with  purchasing your brand new or used vehicle, boat,bike,ATV and so on.   Custom made cars and trucks are made to order thru our licensed used car  dealer GALAXY USED CARS LLC.'
        },
    ]
    )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>

           
  <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight*1.1, position: 'absolute' }} />



  <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Services Details</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>
<View style={{height:deviceHeight, width:deviceWidth}}>
                {/* {this.props.isOuterCalling ?
                    <View style={{ backgroundColor: AppColors.toolbarColor }}>
                        <Toolbar headerName={'Our Services'} />
                    </View> :
                    <InnerToolbar headerName={'Our Services'} />} */}
                <ScrollView style={{ flex:1, }}>
                    <View style={{justifyContent:'center',paddingHorizontal:5, }}>
                    <Image source={ itemObj.image } style={{  height: deviceHeight*0.3,width:'100%', borderTopRightRadius: 10, borderTopLeftRadius: 10,alignSelf:'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} />
                    <View style={{ padding:10,borderWidth:0.3, borderRadius:10,marginTop:5,borderColor:'grey'}}>
                        <Text>{itemObj.detail}</Text>

                    </View>
                    </View>
              
                </ScrollView>

            </View>
   {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
    addressTxtHeader: {
        fontFamily: AppFonts.JosefinSansBold, color: AppColors.textColor,
        fontSize: 15, height: 80, textAlign: 'center', textAlignVertical: 'center'
    },
    appHeaderElavationStyle: {
        width: deviceWidth * 0.9,
        paddingLeft: 15, paddingRight: 15,
        borderRadius: 10, marginBottom: 10
    },
    appHeaderEmailmainViewStyle: {
        flexDirection: 'row',
        paddingTop: 15, paddingBottom: 15,
        alignContent: 'center',
        alignItems: 'center'
    },
    addressTextStyle: {
        fontFamily: AppFonts.SourceSansProRegular,
        fontSize: 15, color: AppColors.textColor,
        marginLeft: 8
    },
    addressDividerStyle: {
        width: deviceWidth * 0.80,
        height: 0.5, backgroundColor: AppColors.toolbarColor,
        alignContent: 'center', alignItems: 'center',
        justifyContent: 'center', alignSelf: 'center'
    }
})

export default serviceDetails;

//    <TouchableOpacity
//             onPress={() => AppConstance.APP_PROPS.navigation.push('OurServiceDetailScreen', { 'itemObj': item })}>
//             <View
//                 elevation={1}
//                 style={{ flexDirection: 'row', width: deviceWidth * 0.95, height: 120, borderRadius: 10, marginBottom: 10 }}>
//                 {/* <Image source={{ uri: item.image }} style={{ flex: 0.5, height: 120, borderTopLeftRadius: 10, borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> */}
//                 <View style={{ flex: 1, padding: 5, marginLeft: 5, marginRight: 5 }}>
//                     <Text style={{  color: AppColors.textColor, fontSize: 15 }}>title</Text>
//                     <Text style={{  color: AppColors.textColor, fontSize: 14, marginTop: 5 }} numberOfLines={4} ellipsizeMode='tail'>d etail</Text>
//                     <Text style={{  fontSize: 10, color: AppColors.toolbarColor, textAlign: 'right' }}>Read More..</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//                     <FlatList
//                         data={ourServiceList}
//                         style={{ paddingTop: 10, paddingBottom: 15 }}
//                         renderItem={renderOurServiceContent}
//                         keyExtractor={(item, index) => index}
//                         // extraData={this.state}
//                         ListFooterComponent={() => <View style={{ width: 1, height: 10 }} />}/> 