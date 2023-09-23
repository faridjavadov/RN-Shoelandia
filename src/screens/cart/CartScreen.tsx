import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../../redux/store/Store'
import { cartRenderItem } from '../../components/renderItems/renderItems'
import LoadingScreen from '../loading/LoadingScreen'
import { getCartData } from '../../redux/slicers/CartSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkout from '../../components/modals/cartModal/Checkout'

const CartScreen = () => {


  const [isLoading, setisLoading] = useState(true)

  const { userEmail } = useSelector((state: StateType) => state.UserSlice)
  const { cart, totalPrice } = useSelector((state: StateType) => state.CartSlice)

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    async function fetchData() {
      try {
        if (userEmail === '') {
          const email = await AsyncStorage.getItem('email');
          await dispatch(getCartData(email));
        } else {
          await dispatch(getCartData(userEmail));
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

  return (
    isLoading ? <LoadingScreen /> :
      <View style={{ flex: 1, backgroundColor: theme == 'Dark' ? 'black' : 'white' }}>


        <View style={[styles.container, { backgroundColor: theme == 'Dark' ? 'black' : 'white' }]}>


          <View style={styles.header}>

            <Text style={[styles.headerText, { color: '#FC7800' }]}>My Cart  {'(' + cart.length + ' Product' + ')'}</Text>



          </View>



          <View style={styles.productList}>

            <FlatList
              data={cart}
              renderItem={cartRenderItem}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => { return (<View style={{ height: 20 }} />) }}
            />

          </View>



          <View style={styles.bottom}>

            <Text style={styles.priceText}> Total: ${totalPrice} </Text>


            <Checkout />


          </View>


        </View>
      </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    marginTop: '12%',
    paddingHorizontal: '3%',
    backgroundColor: '#FFFFFF',
    flex: 0.89,
  },
  header: {
    alignItems: 'center',
    flex: 0.7,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  productList: {
    flex: 8,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',

  },
  bottomText: {
    alignItems: 'center',
    color: 'white'
  },
  priceText: {
    color: '#FC7800',
    fontSize: 22,
    fontWeight: '600',
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#FC7800',
    padding: '3%',
    paddingHorizontal: '18%',
    borderRadius: 20
  },
})