import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';
import GoogleLogo from '../../components/icons/loginIcons/GoogleIcon'
import AppleLogo from '../../components/icons/loginIcons/AppleLogo'
import FacebookLogo from '../../components/icons/loginIcons/FacebookLogo'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/Store';
import { handleLogin } from '../../redux/slicers/StatusSlice';
import VisiblePassword from '../../components/icons/authIcons/VisiblePassword'
import NotVisiblePassword from '../../components/icons/authIcons/NotVisiblePassword'
import PasswordIcon from '../../components/icons/authIcons/PasswordIcon'
import EmailIcon from '../../components/icons/authIcons/EmailIcon'
import axios from 'axios';
import { handleEmail, handlePassword } from '../../redux/slicers/UserSlice';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterScreen = ({ navigation }: any) => {


  const dispatch = useDispatch<AppDispatch>();
  const [isChecked, setChecked] = useState(false);
  const [isVisible, setisVisible] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, seterrorMessage] = useState('')

  const handleRegister = async () => {
    try {
      if (password == confirmPassword) {
        const item = {
          email: email,
          password: password
        }
        const response = await axios.post('http://172.16.0.76:8080/api/auth/register', item)

        dispatch(handleEmail(email))
        dispatch(handlePassword(password))
        console.log(response.data);

        if (response.data != false) {
          navigation.navigate('ConfirmCodeScreen')
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          seterrorMessage('')

        }
        else {
          seterrorMessage('*Your email is already registered')
        }


      }
      else {
        seterrorMessage('*password mismatch!')
      }


    } catch (error) {
      seterrorMessage('*User couldnt created')
    }



  };


  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>

        <Image style={styles.headerLogo} source={require('../../assets/logoImage/Logo.png')} />

        <Text style={styles.headerText}>Welcome to our platform</Text>

        <Text style={styles.headerDetailsText}>Please enter your details to sign up</Text>

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

          <TextInput onChangeText={setEmail} cursorColor={'black'} placeholder='Enter your email...' style={styles.inputContainer} />

        </View>

        <Text style={styles.inputHeaderText}>Password</Text>


        <View style={styles.inputMainContainer}>

          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>

            <PasswordIcon />
            <TextInput onChangeText={setPassword} secureTextEntry={isVisible ? false : true} cursorColor={'black'} placeholder='************' style={styles.inputContainer} />

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
        <Text style={styles.inputHeaderText}>Confirm Password</Text>


        <View style={styles.inputMainContainer}>

          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>

            <PasswordIcon />
            <TextInput onChangeText={setConfirmPassword} secureTextEntry={isVisible ? false : true} cursorColor={'black'} placeholder='************' style={styles.inputContainer} />

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

        <Text style={{ color: 'red' }}>{errorMessage}</Text>

      </View>



      <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={handleRegister}>

          <View style={styles.button}>

            <Text style={styles.buttonText} >Sign up</Text>

          </View>

        </TouchableOpacity>


        <View style={styles.registerNav}>
          <Text style={styles.footerText}>Already Have an Account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>

            <Text style={[styles.footerText, { fontWeight: '600', color: '#FC7800' }]}>Sign In</Text>

          </TouchableOpacity>
        </View>



      </View>

    </View>
  )
}

export default RegisterScreen

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