import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import LoadingScreen from '../loading/LoadingScreen';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const OnBoardingScreen = ({ navigation, route }: any) => {

  const [fontsLoaded] = useFonts({
    'RobotoMono-Medium': require('../../assets/fonts/RobotoMono-Medium.ttf'),
    'RobotoCondensed-Regular':require('../../assets/fonts/RobotoCondensed-Regular.ttf'),
    'RobotoCondensed-Bold':require('../../assets/fonts/RobotoCondensed-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <LoadingScreen />
  }
  else {
    return (
      <View style={styles.container}>

        <View style={styles.imageContainer}>

          <View style={styles.imageContainerLeft}>
            
            <Image style={styles.imageLeft} source={require('../../assets/adsImages/adsImageLeft.png')} />


          </View>

          <View style={styles.imageContainerRight}>

            <View style={styles.imageContainerRightUpper}>

              <Image style={[styles.image]} source={require('../../assets/adsImages/adsImageRight1.png')} />

            </View>

            <View style={styles.imageContainerRightDown}>

              <Image style={styles.image} source={require('../../assets/adsImages/adsImageRight2.png')} />

            </View>


          </View>

        </View>

        <View style={styles.onBoardTextContainer}>



          <Text style={styles.adsText}>Let's Buy On Our</Text>

          <View style={styles.adsTextContainer}>

            <Text style={[styles.adsText, { color: '#FC7800' }]}>Shoes</Text>
            <Text style={styles.adsText}>For Convenience</Text>

          </View>

          <Text style={[styles.adsTextDescription, { marginBottom: '1%' }]}>We Provide Various Types Of Shoes That</Text>
          <Text style={styles.adsTextDescription}>Suitable And Comfortable For You</Text>

        </View>

        <View style={styles.buttonsContainer}>

          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>

            <Text style={styles.button}>Get Started</Text>

          </TouchableOpacity>

          <View style={styles.loginContainer}>

            <Text style={styles.loginText}>Already have account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>

              <Text style={[styles.loginText, { color: '#FC7800' }]}>Login</Text>

            </TouchableOpacity>

          </View>

        </View>

      </View>
    )

  }

}

export default OnBoardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '12%',
    paddingHorizontal: '2%',
    backgroundColor: 'white'
  },
  imageContainer: {
    flexDirection: 'row',
    flex: 12,
    marginBottom: '3%'
  },

  imageContainerLeft: {
    flex: 1,
    width: windowWidth / 2,
    justifyContent: 'center',

  },

  imageContainerRight: {
    flex: 1,
    width: windowWidth / 2,
    right: 0

  },

  imageContainerRightUpper: {
    flex: 4,
    top: '1%'
  },
  imageContainerRightDown: {
    flex: 6,
    justifyContent: 'center',
  },
  imageLeft: {
    width: '95%',
    height: '98%',
    alignSelf: 'center',
    borderRadius: 18

  },
  image: {
    width: '95%',
    height: '95%',
    alignSelf: 'center',
    borderRadius: 18
  },

  onBoardTextContainer: {
    flex: 3.5,
    marginHorizontal: windowWidth / 10,
  },
  adsTextContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: '4%'

  },
  adsText: {
    fontSize: 30,
    alignSelf: 'center',
    fontFamily:'RobotoCondensed-Bold'
  },
  adsTextDescription: {
    alignSelf: 'center',
    color: '#C1C1C1',
    fontWeight: '500',
    fontFamily:'RobotoCondensed-Regular',
    fontSize: 16
  },

  buttonsContainer: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'black',
    color: 'white',
    paddingHorizontal: windowWidth / 3,
    paddingVertical: windowHeight / 60,
    borderRadius: 16,
    fontSize: 20,
    fontFamily:'RobotoCondensed-Bold'

  },
  loginText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    fontFamily:'RobotoCondensed-Regular',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
})