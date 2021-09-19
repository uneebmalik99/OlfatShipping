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
import Animated from 'react-native-reanimated';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';


var baseImagePath = '';

const temp = ({route, navigation }) => {

  const [scrollPosition,setScrollPosition]=React.useState(0)

  const [spinner , setspinner] =useState(false)
  // const [loc , setloc] = useState('')
  const [search, setSearch] = useState(70);
  const[show , setshow] = useState(false)
  const [filteredDataSource, setFilteredDataSource] = useState([
    {
      id:1
    },
    {
      id:2
    },
    {
      id:1
    },
    {
      id:2
    },
    {
      id:1
    },
    {
      id:2
    }, {
      id:1
    },
    {
      id:2
    }
    , {
      id:1
    },
    {
      id:2
    }
  ])

  const [data, setdata] = useState([])
  const handleScroll=(event)=>{
    let yOffset=event.nativeEvent.contentOffset.y / 1;
    setSearch(search-2)
    setScrollPosition(yOffset)
    console.log(yOffset);
  }

useEffect(() => {
 
   
}, []);   






      return (
        <ImageHeaderScrollView
          maxHeight={200}
          minHeight={30}
          headerImage={require("../images/logofinal1.png")}
          renderForeground={() => (
            <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
              <TouchableOpacity onPress={() => console.log("tap!!")}>
                <Text style={{ backgroundColor: "transparent" }}>Tap Me!</Text>
              </TouchableOpacity>
            </View>
          )}
        >
          <View style={{ height: 1000 }}>
            <TriggeringView onHide={() => console.log("text hidden")}>
              <Text>Scroll Me!</Text>
            </TriggeringView>
          </View>
        </ImageHeaderScrollView>
      );
    }
  


export default temp;
