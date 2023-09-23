import React, { useState } from 'react';
import {
    Alert, Modal, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import creditCardType from 'credit-card-type';
import Visa from '../../icons/cartIcons/Visa'; // Import Visa SVG icon
import MasterCard from '../../icons/cartIcons/MasterCard'; // Import MasterCard SVG icon
import { AppDispatch, StateType } from '../../../redux/store/Store';
import BackIcon from '../../icons/homeIcons/BackIcon'

const Checkout = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { language } = useSelector((state: StateType) => state.SettingsSlice);
    const { totalPrice } = useSelector((state: StateType) => state.CartSlice);
    const dispatch = useDispatch<AppDispatch>();

    const validationSchema = yup.object().shape({
        cardNumber: yup.string().required('Card Number is required').matches(/^\d{16}$/, 'Invalid Card Number'),
        cardHolder: yup.string().required('Card Holder is required').matches(/^[A-Za-z\s]+$/, 'Invalid Card Holder'),
        expiryDate: yup.string().required('Expiry Date is required').matches(/^\d{2}\/\d{2}$/, 'Invalid Expiry Date'),
        cvv: yup.string().required('CVV is required').matches(/^\d{3,4}$/, 'Invalid CVV'),
    });

    const handlePayment = (values: any) => {
        const cardType = recognizeCardType(values.cardNumber);

        if (!cardType) {
            Alert.alert('Invalid Card Number', 'Please enter a valid card number.');
            return;
        }

        console.log('Payment button pressed');
        console.log('Card Number:', values.cardNumber);
        console.log('Card Holder:', values.cardHolder);
        console.log('Expiry Date:', values.expiryDate);
        console.log('CVV:', values.cvv);
        console.log('Card Type:', cardType);
        // Implement your payment processing logic here
    };

    const recognizeCardType = (cardNumber: any) => {
        const cardInfo = creditCardType(cardNumber);

        if (cardInfo && cardInfo.length > 0) {
            return cardInfo[0].niceType; // Get the niceType (e.g., "Mastercard" or "Visa")
        }

        return null;
    };

    const getCardTypeLogo = (values: any) => {
        switch (recognizeCardType(values.cardNumber)) {
            case 'Mastercard':
                return <MasterCard width={80} height={40} />; // Use your MasterCard SVG component
            case 'Visa':
                return <Visa width={80} height={40} />; // Use your Visa SVG component
            // Add cases for other card types and their respective SVG components
            default:
                return null;
        }
    };

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
                <View style={styles.containerM}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <BackIcon size={26} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 30, color: '#FC7800' }}>Checkout</Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.container}>
                            <Formik
                                initialValues={{ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handlePayment}>
                                {({ handleChange, handleSubmit, values, errors }) => (
                                    <>
                                        <View style={styles.cardInputContainer}>
                                            <Text style={styles.inputLabel}>Card Number</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="XXXX XXXX XXXX XXXX"
                                                keyboardType="numeric"
                                                onChangeText={handleChange('cardNumber')}
                                                value={values.cardNumber}
                                            />
                                            <Text style={styles.errorText}>{errors.cardNumber}</Text>
                                        </View>

                                        <View style={styles.cardInputContainer}>
                                            <Text style={styles.inputLabel}>Card Holder</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="John Doe"
                                                onChangeText={handleChange('cardHolder')}
                                                value={values.cardHolder}
                                            />
                                            <Text style={styles.errorText}>{errors.cardHolder}</Text>
                                        </View>

                                        <View style={styles.expiryCvvContainer}>
                                            <View style={styles.expiryInputContainer}>
                                                <Text style={styles.inputLabel}>Expiry Date</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="MM/YY"
                                                    keyboardType="numeric"
                                                    onChangeText={handleChange('expiryDate')}
                                                    value={values.expiryDate}
                                                />
                                                <Text style={styles.errorText}>{errors.expiryDate}</Text>
                                            </View>

                                            <View style={styles.cvvInputContainer}>
                                                <Text style={styles.inputLabel}>CVV</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="XXX"
                                                    keyboardType="numeric"
                                                    onChangeText={handleChange('cvv')}
                                                    value={values.cvv}
                                                />
                                                <Text style={styles.errorText}>{errors.cvv}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.cardTypeLogoContainer}>
                                            {getCardTypeLogo(values)}
                                        </View>
                                    </>
                                )}
                            </Formik>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonInside} onPress={handlePayment}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Pay ${totalPrice}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.bottomText}>CHECKOUT</Text>
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
    containerM: {
        backgroundColor: 'white',
        flex: 1,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    body: {
        flex: 8,
        padding: 16,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    cardInputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    expiryCvvContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    expiryInputContainer: {
        flex: 1,
        marginRight: 8,
    },
    cvvInputContainer: {
        flex: 1,
        marginLeft: 8,
    },
    cardTypeLogoContainer: {
        alignItems: 'center',
        marginTop: 20,
        position: 'absolute',
        right: 10,
        top: 28
    },
    paymentButton: {
        backgroundColor: 'blue',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    paymentButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 16,
    },
    buttonInside: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FC7800',
        padding: '4%',
        paddingHorizontal: '30%',
        borderRadius: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FC7800',
        left:20,
        bottom:10,
        padding: '4%',
        paddingHorizontal: '30%',
        borderRadius: 20,

    },
    bottomText: {
        alignItems: 'center',
        color: 'white',
    },
    priceText: {
        color: '#FC7800',
        fontSize: 22,
        fontWeight: '600',
        alignSelf: 'center',
    },
    buttonCheckout: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FC7800',
        bottom: 10,
        left: 20,
        padding: '4%',
        paddingHorizontal: '30%',
        borderRadius: 20,
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 4,
    },
});

export default Checkout;