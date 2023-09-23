import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Checkbox from 'expo-checkbox';
import GoogleLogo from '../../components/icons/loginIcons/GoogleIcon'
import AppleLogo from '../../components/icons/loginIcons/AppleLogo'
import FacebookLogo from '../../components/icons/loginIcons/FacebookLogo'
import VisiblePassword from '../../components/icons/authIcons/VisiblePassword'
import NotVisiblePassword from '../../components/icons/authIcons/NotVisiblePassword'
import PasswordIcon from '../../components/icons/authIcons/PasswordIcon'
import EmailIcon from '../../components/icons/authIcons/EmailIcon'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/Store';
import { handleLogin } from '../../redux/slicers/StatusSlice';
import { handleEmail, handlePassword } from '../../redux/slicers/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ navigation }: any) => {

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  

  const dispatch = useDispatch<AppDispatch>();
  const [isChecked, setChecked] = useState(false);
  const [isVisible, setisVisible] = useState(false)
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [errorMessage, seterrorMessage] = useState('');


  useEffect(() => {
    // Check if the user has previously checked "Remember Me"
    AsyncStorage.getItem('loggedIn')
      .then((value) => {
        if (value === 'true') {
          setChecked(true);
        } else {
          setChecked(false);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLog = async () => {
    try {

      const item = {
        email: email,
        password: password
      }
      const response = await axios.post('http://172.16.0.76:8080/api/auth/login', item)
      dispatch(handleEmail(email))
      dispatch(handlePassword(password))

      if (response.data == '==>Confirm Code Phase') {
        navigation.navigate('ConfirmCodeScreen')
        setemail('');
        setpassword('');
        seterrorMessage('')

      }
      else if (response.data == 'Succesfull login') {
        dispatch(handleLogin(true));
        setemail('');
        setpassword('');
        seterrorMessage('')
        if (isChecked) {
          await AsyncStorage.setItem('loggedIn', 'true');
          await AsyncStorage.setItem('email',email)
        } else {
          await AsyncStorage.removeItem('loggedIn')
          await AsyncStorage.removeItem('email')
        }
      }
      else {
        seterrorMessage('*password or email is incorrect')
      }


    } catch (error) {
      seterrorMessage('*password or email is incorrect')
    }



  };



  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>

        <Image style={styles.headerLogo} source={require('../../assets/logoImage/Logo.png')} />
        <Text style={styles.headerText}>Welcome Back</Text>

        <Text style={styles.headerDetailsText}>Please enter your details to sign in</Text>

      </View>

      <View style={styles.additionalLoginsContainer}>

        <TouchableOpacity>

          <View style={styles.loginContainer}>

            <GoogleLogo />

          </View>

        </TouchableOpacity>

        <TouchableOpacity>

          <View style={styles.loginContainer}>

            <FacebookLogo />

          </View>

        </TouchableOpacity>

        <TouchableOpacity>

          <View style={styles.loginContainer}>

            <AppleLogo />

          </View>

        </TouchableOpacity>

      </View>

      <View style={styles.seperatorContainer}>
        <View style={styles.seperatorLine}>

        </View>

        <Text style={styles.seperatorText}>OR</Text>

        <View style={styles.seperatorLine}>

        </View>


      </View>

      <View style={styles.inputsContainer}>

        <Text style={styles.inputHeaderText}>E-Mail Adress</Text>

        <View style={[styles.inputMainContainer, { justifyContent: 'flex-start', gap: 10 }]}>
          <EmailIcon />

          <TextInput onChangeText={setemail} value={email} cursorColor={'black'} placeholder='Enter your email...' style={styles.inputContainer} />

        </View>

        <Text style={styles.inputHeaderText}>Password</Text>


        <View style={styles.inputMainContainer}>

          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>

            <PasswordIcon />
            <TextInput onChangeText={setpassword} value={password} secureTextEntry={isVisible ? false : true} cursorColor={'black'} placeholder='************' style={styles.inputContainer} />

          </View>


          {
            isVisible ?
              <TouchableOpacity onPress={() => setisVisible(false)}>

                <VisiblePassword />

              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => setisVisible(true)}>

                <NotVisiblePassword />

              </TouchableOpacity>

          }

        </View>


      </View>




      <View style={styles.helpersContainer}>


        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Checkbox color={'#FC7800'} style={styles.checkbox} value={isChecked} onValueChange={setChecked} />

          <Text style={[styles.footerText, { fontWeight: '500' }]} >Remember me</Text>
        </View>

        <TouchableOpacity>

          <Text style={styles.helperText}>Forgot Password?</Text>

        </TouchableOpacity>


      </View>
      <Text style={{ color: 'red' }}>{errorMessage}</Text>


      <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={handleLog}>

          <View style={styles.button}>

            <Text style={styles.buttonText} >Sign in</Text>

          </View>

        </TouchableOpacity>


        <View style={styles.registerNav}>
          <Text style={styles.footerText}>Don't have an account yet?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>

            <Text style={[styles.footerText, { fontWeight: '600', color: '#FC7800' }]}>Sign Up</Text>

          </TouchableOpacity>
        </View>



      </View>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '12%',
    paddingHorizontal: '10%',
    backgroundColor: 'white',
    gap: 20,
    justifyContent: 'center'
  },
  headerContainer: {
    alignItems: 'center',
    gap: 8
  },
  headerLogo: {
    resizeMode: 'contain',
    height: windowHeight / 6
  },
  headerText: {
    fontSize: 26,
    fontWeight: '500',
    color: 'black'
  },
  headerDetailsText: {
    fontSize: 16,
    color: 'black'
  },

  additionalLoginsContainer: {
    gap: 12,
    flexDirection: 'row'
  },
  loginContainer: {
    borderWidth: 0.2,
    borderRadius: 4,
    width: windowWidth / 4,
    height: windowHeight / 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFB876'
  },

  seperatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10

  },
  seperatorLine: {
    borderWidth: 0.2,
    height: 0,
    width: '45%',
    borderColor: 'black'

  },
  seperatorText: {
    fontWeight: '600',
    fontSize: 12
  },
  inputsContainer: {

    gap: 8
  },
  inputMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingVertical: '1%'

  },
  inputHeaderText: {

  },
  inputContainer: {
    borderRadius: 4,
    width: '85%'

  },
  helpersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  helperText: {
    alignSelf: 'center',
    color: 'black',
    textDecorationLine: 'underline',
    fontWeight: '400',
    fontSize: 14
  },
  buttonContainer: {
    alignItems: 'center',

  },
  button: {
    backgroundColor: '#FC7800',
    width: windowWidth / 1.22,
    height: windowHeight / 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%'

  },
  buttonText: {
    color: 'black',
    fontWeight: '700'
  },
  checkbox: {
    margin: 4,
  },
  registerNav: {
    flexDirection: 'row',
    gap: 6
  },
  footerText: {
    fontSize: 14,
    color: 'black'
  },

})