import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import axios from 'axios'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../../redux/store/Store';
import { handleLogin } from '../../redux/slicers/StatusSlice';

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20, justifyContent: 'center',backgroundColor:"#FFFFFF" },
    title: { textAlign: 'center', fontSize: 16 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        borderRadius: 12,
        width: 70,
        height: 70,
        lineHeight: 68,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
});

const CELL_COUNT = 4;



const ConfirmCodeScreen = () => {


    const { userEmail, userPassword } = useSelector((state: StateType) => state.UserSlice)
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const dispatch = useDispatch<AppDispatch>();

    const ConfirmCode = async () => {
        const response = await axios.post('http://172.16.0.76:8080/api/auth/confirmcode', {
            email: userEmail,
            password: userPassword,
            code: value
        })

        if (response.data) {
            dispatch(handleLogin(true))
        }
    }

    const sendAgain = async () => {
        const item = {
            email: userEmail,
            password: userPassword
        }
        const response = await axios.post('http://172.16.0.76:8080/api/auth/register', item)
    }   

    return (
        <SafeAreaView style={styles.root}>
            <View style={{ paddingHorizontal: '15%' }}>

                <Image style={{ width: 131, height: 152, marginBottom: '10%', alignSelf: 'center' }} source={require('../../assets/logoImage/HomeLogo1.png')} />

                <Text style={styles.title}>We sent the code veritification to your mobile number</Text>

                <TouchableOpacity onPress={sendAgain}>

                    <Text style={{ alignSelf: 'center', color: '#FC7800', marginTop: '6%' }}>Send again</Text>

                </TouchableOpacity>

            </View>
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <TouchableOpacity style={{ marginTop: '30%' }} onPress={ConfirmCode}>
                <Text style={{ alignSelf: 'center', padding: '5%', backgroundColor: '#FC7800', borderRadius: 20, marginTop: '10%' }}>Confirm Code</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ConfirmCodeScreen;