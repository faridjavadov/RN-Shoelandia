import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View, Dimensions, Platform, Linking,Share } from 'react-native'
import React from 'react'
import MenuSection from '../../components/Items/settingsItems/MenuSection'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../../redux/store/Store';
import { handleLogin } from '../../redux/slicers/StatusSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AcInfoModal from '../../components/modals/settingsModal/AcInfoModal';
import AppearanceModal from '../../components/modals/settingsModal/AppearanceModal';
import LanguageModal from '../../components/modals/settingsModal/LanguageModal';
import PaymentModal from '../../components/modals/settingsModal/PaymentModal';
import NotificationsModal from '../../components/modals/settingsModal/NotificationsModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const SettingsScreen = ({ navigation }: any) => {

  const openLink = async (url: string) => {
    try {
      if (Platform.OS === 'android') {
        const playStoreUrl = `market://details?id=${encodeURIComponent(url)}`;
        const webUrl = `https://play.google.com/store/apps/details?id=${encodeURIComponent(url)}`;

        const supported = await Linking.canOpenURL(playStoreUrl);
        const finalUrl = supported ? playStoreUrl : webUrl;

        await Linking.openURL(finalUrl);
      } else {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: 'Share Application!',
        url: 'https://example.com',
        title: 'Amazing Content',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Content shared via activity type
          console.log(`Shared via ${result.activityType}`);
        } else {
          // Content shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Sharing dismissed
        console.log('Sharing dismissed');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleLogOut = async () => {
    dispatch(handleLogin(false))
    await AsyncStorage.removeItem('loggedIn')
    await AsyncStorage.removeItem('email')
  }

  const dispatch = useDispatch<AppDispatch>();
  const { theme, language } = useSelector((state: StateType) => state.SettingsSlice)

  return (
    <View style={{ flex: 1, backgroundColor: '#FC7800' }}>
      <View style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          <Text style={styles.headerText}>Settings</Text>

          <View style={[styles.settingsMenu, { backgroundColor: theme == 'Dark' ? 'black' : 'white' }]}>

            <View style={styles.generalMenu}>

              <Text style={[styles.generalHeaderText,{color:theme=='Dark'?'white':'black'}]}>General</Text>

              <View style={{ marginTop: 0 }}>
                <AcInfoModal />
              </View>

              <View style={{ marginTop: -22 }} >
                <AppearanceModal />
              </View>


              <View style={{ marginTop: -22 }} >
                <LanguageModal />
              </View>

              <View style={{ marginTop: -22 }} >
                <PaymentModal />
              </View>
              <View style={{ marginTop: -22 }} >
                <NotificationsModal />
              </View>

            </View>

            <View style={styles.generalMenu}>

              <Text style={[styles.generalHeaderText,{color:theme=='Dark'?'white':'black'}]}>Support</Text>

              <TouchableOpacity>

                <MenuSection name={'Report on issue'} />

              </TouchableOpacity>

              <TouchableOpacity>

                <MenuSection name={'FAQ'} />

              </TouchableOpacity>


            </View>

            <View style={styles.generalMenu}>

              <Text style={[styles.generalHeaderText,{color:theme=='Dark'?'white':'black'}]}>Other</Text>
              <TouchableOpacity onPress={()=>openLink('https://play.google.com/store/apps/details?id=com.ngastudio.riseup_motivation_quotes')}>

                <MenuSection name={'Rate us'} />

              </TouchableOpacity>

              <TouchableOpacity onPress={shareContent}>

                <MenuSection name={'Share application'} />

              </TouchableOpacity>



            </View>

            <TouchableOpacity onPress={handleLogOut}>

              <View style={[styles.buttonContainer, { borderColor: theme == 'Dark' ? 'white' : 'black' }]}>

                <Text style={[styles.generalHeaderText, { color: theme == 'Dark' ? 'white' : 'black' }]}>Log Out</Text>

              </View>

            </TouchableOpacity>
            <View style={{ height: windowHeight / 8, backgroundColor: theme == 'Dark' ? 'black' : '#FFFFFF' }} />

          </View>
        </ScrollView>

      </View>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    marginTop: '12%',
    flex: 1,
  },
  scrollContainer: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: '#FC7800'
  },
  headerText: {
    marginTop: '10%',
    marginBottom: '5%',
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    paddingHorizontal: '3%'
  },
  settingsMenu: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: '3%',


  },
  generalMenu: {
    marginTop: '5%',
    gap: 10,

  },
  menuSection: {
    gap: 5
  },
  seperator: {

  },
  generalHeaderText: {
    fontSize: 18,
    padding: '2%',
    fontWeight: '600',

  },
  generalText: {
    fontSize: 18,
    fontWeight: '500'
  },
  buttonContainer: {
    borderWidth: 2,
    width: windowWidth / 1.22,
    height: windowHeight / 16,
    marginTop: '5%',
    borderRadius: 28,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%'
  },

})