import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TextInput } from 'react-native';
import MenuSection from '../../Items/settingsItems/MenuSection';
import BackIcon from '../../icons/settingsIcon/BackIcon'
import PaymentIcon from '../../icons/settingsIcon/PaymentIcon'
import { useSelector } from 'react-redux';
import { StateType } from '../../../redux/store/Store';


const PaymentModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {theme} =useSelector((state:StateType)=>state.SettingsSlice)
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
                <View style={[styles.container,{backgroundColor:theme=='Dark'?'black':'white'}]}>

                    <View style={styles.headerContainer}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '15%' }}>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>

                                <BackIcon size={30} color={'white'} />

                            </TouchableOpacity>
                            <Text style={styles.headerText}>Payment Methods</Text>

                        </View>

                    </View>


                    <View style={[styles.bodyContainer,{backgroundColor:theme=='Dark'?'black':'white'}]}>

                        <PaymentIcon/>

                        <Text style={{ fontSize: 20, fontWeight: '700',color:theme == 'Dark'?'white':'black' }}>No payment cards added </Text>

                        <Text style={{ paddingHorizontal: '10%', color: 'gray', fontWeight: '500' }}>No cards have been added yet. Do it now to be able to make a payment</Text>

                        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:theme=='Dark'?'white':'black',paddingHorizontal:'30%',paddingVertical:'5%',borderRadius:30}}>

                            <Text style={{color:theme=='Dark'?'black':'white'}}>Add new card</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => setModalVisible(true)}>

                <MenuSection name={'Payment methods'} />

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
    headerContainer: {
        flex: 2,
        backgroundColor: '#FC7800',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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

export default PaymentModal;