import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TextInput } from 'react-native';
import MenuSection from '../../Items/settingsItems/MenuSection';
import BackIcon from '../../icons/settingsIcon/BackIcon'
import EmailIcon from '../../icons/authIcons/EmailIcon'
import PasswordIcon from '../../icons/authIcons/PasswordIcon'
import VisiblePassword from '../../icons/authIcons/VisiblePassword'
import NotVisiblePassword from '../../icons/authIcons/NotVisiblePassword'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../../../redux/store/Store';
import axios from 'axios';
import { handleLogin } from '../../../redux/slicers/StatusSlice';
const AcInfoModal = () => {
    const { userEmail, userPassword } = useSelector((state: StateType) => state.UserSlice)

    const [modalVisible, setModalVisible] = useState(false);
    const [isVisible, setisVisible] = useState(false)
    const [email, setemail] = useState<any>(userEmail);
    const [password, setpassword] = useState<any>(userPassword);


    const dispatch = useDispatch<AppDispatch>();
    const deleteAccount = async () => {
        const response = await axios.post('http://172.16.0.76   :8080/api/auth/deleteuser', { email: userEmail })
        console.log(response.data);

        if (response.data == 'Succesfully Deleted Acount') {
            dispatch(handleLogin(false))

        }
    }
    const editAccount = async () => {
        const response = await axios.put('http://172.16.0.76:8080/api/auth/edituser', { email: email,password:password })
        console.log(response.data);
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.container}>

                    <View style={styles.headerContainer}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '15%' }}>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>

                                <BackIcon size={30} color={'white'} />

                            </TouchableOpacity>
                            <Text style={styles.headerText}>Account Information</Text>

                        </View>

                    </View>


                    <View style={styles.bodyContainer}>


                        <Text style={[styles.inputHeaderText, { marginTop: '15%' }]}>E-Mail Adress</Text>

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
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Delete Account</Text>
                        <Text style={{ lineHeight: 24 }}>Your account will be permamently removed from the application. All your data will be lost </Text>
                        <TouchableOpacity onPress={deleteAccount}>

                            <Text style={{ alignSelf: 'center', padding: '5%', backgroundColor: '#FFF3F4', color: '#E3111C', paddingHorizontal: '35%', borderRadius: 30, marginBottom: '30%' }}>Delete Account</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={editAccount}>

                            <Text style={{ alignSelf: 'center', backgroundColor: 'black', color: 'white', padding: '5%', paddingHorizontal: '43%', borderRadius: 30 }}>Save</Text>

                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>

            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => setModalVisible(true)}>

                <MenuSection name={'Account Information'} />

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        backgroundColor: '#FC7800',
        flex: 7,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
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
    headerContainer: {
        flex: 2,
        backgroundColor: '#FC7800',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '3%',
        gap: 20,
        flex: 10,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    headerText: {
        fontSize: 32,
        fontWeight: '700',
        color: 'white',
        paddingHorizontal: '3%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default AcInfoModal;