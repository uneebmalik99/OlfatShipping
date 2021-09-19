import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
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
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import FontAwesome5 from  'react-native-vector-icons/dist/FontAwesome5'

const Tracking = ({ navigation }) => {


  return (
    <SafeAreaView style={{  backgroundColor: AppColors.transplant, height: deviceHeight, }}>

    <ImageBackground 

    
    style={{flex:1, width:deviceWidth,height:deviceHeight}}
    source={require('../images/AFGbg.jpg')}>

<View
style={{width:deviceWidth,paddingHorizontal:10,paddingVertical:8, height:deviceHeight*0.085,}}>
<TouchableOpacity
onPress={()=> navigation.navigate('DrawerWithoutlogin')}>

<Icon  name='menu' size={30}/>
</TouchableOpacity>
</View>
<View

style={{height:deviceHeight*0.13}}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logo.png')}/>

</View>

<View
style={{width:'100%',marginTop:10,  height:deviceHeight*0.15, flexDirection:'column'}}>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:16, fontWeight:'bold'}}>Welcome</Text>
<Text style={{alignSelf:'center',color:'white',fontSize:20, fontWeight:'bold'}}>Afg Global Shipping</Text>


</View>

<View style={{width:'100%',flexDirection:'column',marginTop:15, height:70, paddingHorizontal:40}}>

<View
style={{width:'100%',height:40,marginVertical:10,backgroundColor:'white', borderRadius:20,paddingHorizontal:10, flexDirection:'row'}} >

<AntDesign style={{alignSelf:'center',width:'5%',height:15,}} color='grey' name='lock'/>

<TextInput
      style={{ height: 36,marginLeft:1, paddingVertical:4, width:'90%', paddingHorizontal:35,  backgroundColor:'white' }}
      onChangeText={text => onChangeText(text)}
      placeholder="Enter VIN or LOT No."
      placeholderTextColor='grey'
        underlineColorAndroid="transparent"
    />

<TouchableOpacity 
onPress={()=> navigation.navigate('TrackingSearchDetails')}
>
    <Feather style={{alignSelf:'center',width:'5%',height:15}} color='grey'  name='search'/>
</TouchableOpacity>

    </View>

    </View>

<View style={{ 
 
justifyContent: 'flex-end',
flex:1,
marginBottom: Platform.OS === 'ios' ? 40 : 70,}}>



<View
style={{width:deviceWidth, paddingHorizontal:15, height:deviceHeight*0.21, flexDirection:'column'}}>



<View style={{flexDirection:'row',alignSelf:'center', width:'100%',height:'50%'}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Tracking')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>
<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<AntDesign style={{alignSelf:'center',paddingVertical:3 }} color={AppColors.purple} name='setting' size={23}/>
<Text style={{alignSelf:'center',color:AppColors.purple,fontSize:12}}>Tracking</Text>

</View>

</TouchableOpacity>
<View
style={{width:'7.2%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('Contactus')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>


<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Feather style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='home' size={23}/>
<Text style={{alignSelf:'center',color:AppColors.purple,fontSize:12}}>Contact Us</Text>

</View>
</TouchableOpacity>
<View
style={{width:'7.2%'}}>

</View>

<TouchableOpacity
onPress={()=>navigation.navigate('Signin')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialIcons style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='person-outline' size={25}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Login in</Text>

</View>

</TouchableOpacity>

</View>

<View style={{flexDirection:'row',marginTop:15, width:'100%',height:'50%'}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Towing')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialCommunityIcons style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='tow-truck' size={24}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Towing</Text>

</View>

</TouchableOpacity>
<View
style={{width:'7.2%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('Shipping')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Fontisto style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='ship' size={24}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Shipping</Text>

</View>

</TouchableOpacity>
<View
style={{width:'7.2%'}}>

</View>

<TouchableOpacity
onPress={()=>navigation.navigate('Warehousing')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<FontAwesome5 style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='warehouse' size={23}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Warehousing</Text>

</View>

</TouchableOpacity>

</View>



</View>





</View>





    </ImageBackground>



        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default Tracking;
