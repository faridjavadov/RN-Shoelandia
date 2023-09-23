import { StyleSheet, Text, View,SafeAreaView,Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const PurchaseScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PU</Text>
    </View>
  )
}

export default PurchaseScreen

const styles = StyleSheet.create({
    container:{
        marginTop:'12%'
    },
})