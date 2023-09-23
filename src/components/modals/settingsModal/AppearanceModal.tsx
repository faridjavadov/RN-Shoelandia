import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TextInput } from 'react-native';
import MenuSection from '../../Items/settingsItems/MenuSection';
import BackIcon from '../../icons/settingsIcon/BackIcon'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../../../redux/store/Store';
import { handleTheme } from '../../../redux/slicers/SettingsSlice';
const AppearanceModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const { theme } = useSelector((state: StateType) => state.SettingsSlice)

    const dispatch = useDispatch<AppDispatch>();
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
                            <Text style={styles.headerText}>Appearance</Text>

                        </View>

                    </View>


                    <View style={styles.bodyContainer}>

                        <TouchableOpacity onPress={()=>dispatch(handleTheme('Light'))} style={{ borderWidth: 1,borderRadius:12, padding: '2%', marginTop: '10%', backgroundColor: theme == 'Light' ? '#FC7800' : 'white' }}>

                            <Text style={{color:theme == 'Light'?'white':'black'}}>Light Mode</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>dispatch(handleTheme('Dark'))} style={{ borderWidth: 1,borderRadius:12, padding: '2%',backgroundColor: theme == 'Dark' ? '#FC7800' : 'white'  }}>

                            <Text style={{color:theme == 'Dark'?'white':'black'}}>Dark Mode</Text>

                        </TouchableOpacity>


                    </View>

                </View>

            </Modal>

            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => setModalVisible(true)}>

                <MenuSection name={'Appearance'} />

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

export default AppearanceModal;