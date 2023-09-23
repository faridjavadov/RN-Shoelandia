import { StyleSheet, Text, View, SafeAreaView, Dimensions, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import MakeFavoriteIcon from '../../components/icons/homeIcons/MakeFavoriteIcon'
import SearchIcon from '../../components/icons/homeIcons/SearchIcon'
import ShoppingBasketIcon from '../../components/icons/homeIcons/ShoppingBasketIcon'
import { brands } from '../../data/Brands'
import BrandCard from '../../components/Items/homeItems/BrandCard'
import { ads } from '../../data/Ads'
import AdsCard from '../../components/Items/homeItems/AdsCard'
import { sneakers } from '../../data/Sneakers'
import { renderItemAds } from '../../components/renderItems/renderItems'
import ShoeCard from '../../components/Items/homeItems/ShoeCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../../redux/store/Store'
import { getFavoriteData } from '../../redux/slicers/ShoesSlice'
import LoadingScreen from '../loading/LoadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleEmail } from '../../redux/slicers/UserSlice'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const HomeScreen = ({ navigation }: any) => {

  const [isLoading, setisLoading] = useState(true)

  const { userEmail } = useSelector((state: StateType) => state.UserSlice)
  const { cart } = useSelector((state: StateType) => state.CartSlice)
  const { favorites } = useSelector((state: StateType) => state.ShoesSlice)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (userEmail === '') {
          const email = await AsyncStorage.getItem('email');
          await dispatch(getFavoriteData(email));
          dispatch(handleEmail(email))
        } else {
          await dispatch(getFavoriteData(userEmail));
        }

        setisLoading(false);
      } catch (error) {
        console.error('Error fetching favorite data:', error);
        setisLoading(false);
      }
    }

    fetchData();
  }, [dispatch, userEmail]);


  const { theme, language } = useSelector((state: StateType) => state.SettingsSlice)

  const renderItemShoes = ({ item }: any) => {
    return (
      <ShoeCard navigation={navigation} item={item} />
    )
  }
  const renderItemBrands = ({ item }: any) => {
    return (
      <BrandCard navigation={navigation} item={item} />
    )

  }


  //Carousel
  const flatListRef = useRef<FlatList>(null);;
  const scrollToIndex = (index: any) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };
  useEffect(() => {

    let currentIndex = 0;


    const interval = setInterval(() => {
      scrollToIndex(currentIndex);
      currentIndex++;

      if (currentIndex === ads.length) {
        currentIndex = 0;
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [ads]);

  return (
    isLoading ? <LoadingScreen /> :
      <View style={{ flex: 1, backgroundColor: theme == 'Dark' ? 'black' : 'light' }}>
        <View style={[styles.container, { backgroundColor: theme == 'Dark' ? 'black' : 'white' }]}>

          <View style={styles.headerContainer}>

            <View style={styles.imageContainer}>
              <Image style={styles.logoImage1} source={require('../../assets/logoImage/HomeLogo1.png')} />
              <Image style={styles.logoImage2} source={require('../../assets/logoImage/HomeLogo2.png')} />

            </View>

            <TouchableOpacity  onPress={() => navigation.navigate('CartScreen')}>

              <View style={styles.wrapper}>

                <ShoppingBasketIcon size={28} />
         

              </View>
              <Text style={{position:'absolute',top:18,left:10,fontSize:16,backgroundColor:cart.length>0?'red':'white',color:'white',paddingHorizontal:'20%',borderRadius:50}}>{cart.length>0?cart.length:''}</Text>

            </TouchableOpacity>



          </View>


          <View style={styles.searchBarContainer}>

            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
              <View style={styles.searchBar}>

                <SearchIcon />
                <Text style={{ width: '90%', alignSelf: 'center', color: 'gray' }}>Search shoes...</Text>

              </View>
            </TouchableOpacity>

          </View>


          <View style={styles.adsListContainer}>

            <FlatList
              ref={flatListRef}
              data={ads}
              renderItem={renderItemAds}
              horizontal
              ItemSeparatorComponent={() => { return (<View style={{ width: 20 }} />) }}
              showsHorizontalScrollIndicator={false}
            />
          </View>



          <View style={styles.brandsContainer}>
            <FlatList
              horizontal
              data={brands}
              renderItem={renderItemBrands}
              ItemSeparatorComponent={() => { return (<View style={{ width: 20 }} />) }}
              showsHorizontalScrollIndicator={false}
            />



          </View>

          <View style={styles.productListContainer}>

            <View style={styles.productListHeaderContainer}>

              <Text style={[styles.productListHeaderText, { color: theme == 'Dark' ? 'white' : 'black' }]}>Product Popular</Text>

              <TouchableOpacity onPress={() => navigation.navigate('ViewMoreScreen')}>
                <Text style={styles.productListViewMore}>View more</Text>
              </TouchableOpacity>



            </View>


            <FlatList
              data={sneakers.filter((c: any) => c.rating >= 9.5)}
              horizontal
              renderItem={renderItemShoes}
              ItemSeparatorComponent={() => { return (<View style={{ width: 10 }} />) }}
              showsHorizontalScrollIndicator={false}


            />
          </View>
        </View>
      </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    marginTop: '12%',
    paddingHorizontal: '3%',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  headerContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageContainer: {
    flexDirection: 'row',

  },
  logoImage1: {
    width: 85,
    height: 85
  },
  logoImage2: {
    width: 230,
    height: 95

  },
  searchBarContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  searchBar: {
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
    width: windowWidth / 1.1,
    paddingVertical: '3%',
    borderRadius: 32,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    gap: 10,
    elevation: 5,

  },

  adsListContainer: {
    flex: 2,
  },
  adsImage: {
    width: '100%',
    height: '90%',
    borderRadius: 20,
    resizeMode: 'contain'
  },
  brandsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  productListContainer: {
    flex: 4,
    gap: 10
  },
  productListHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productListViewMore: {
    color: '#FC7800',
    fontSize: 16,
  },
  productListHeaderText: {
    fontSize: 22,
    fontWeight: '400'
  },


  wrapper: {
    flexDirection:'row',
    marginTop: '100%',
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '40%',
    borderRadius: 50,
    elevation: 5
  },
})