import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../../../redux/store/Store'
import { decreaseProduct, increaseProduct, removeCart, removeProduct } from '../../../redux/slicers/CartSlice';
import { removeFavorite } from '../../../redux/slicers/ShoesSlice';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CartCard = (props: any) => {

    const { totalPrice, cart } = useSelector((state: StateType) => state.CartSlice)
    const { theme, language } = useSelector((state: StateType) => state.SettingsSlice)
    const dispatch = useDispatch<AppDispatch>();
    const [itemCount, setItemCount] = useState(1);
    const url = props.item.image;
    const { userEmail } = useSelector((state: StateType) => state.UserSlice)

    const handleCount = (operation: any) => {
        if (operation == 'add') {
            setItemCount(itemCount + 1)
            dispatch(increaseProduct(props.item))
        }
        else if (operation == 'decrease') {

            if (itemCount == 1) {
                dispatch(removeProduct(props.item))
                dispatch(removeCart({ email: userEmail, item: props.item }))

            }
            else {
                dispatch(decreaseProduct(props.item))

                setItemCount(itemCount - 1)
            }
        }
    }


    return (
        <View style={styles.container}>

            <View>

                <Image style={styles.image} source={{ uri: url }} />

            </View>
            

            <View style={styles.details}>
                <View>

                    <Text style={[styles.detailsText, { color: theme == 'Dark' ? 'white' : 'black' }]}>{props.item.name}</Text>
                    <Text style={[styles.detailsText, { alignSelf:'flex-start',color: theme == 'Dark' ? 'white' : 'black' }]}>Size: {props.item.size}</Text>


                </View>
                <View style={styles.detailsBottomContainer}>

                    <View>

                        <Text style={styles.priceText}>${props.item.price}</Text>

                    </View>

                    <View style={styles.itemCounter}>

                        <TouchableOpacity onPress={() => handleCount('decrease')} style={styles.counterButton}>

                            <Text style={styles.counterText}>-</Text>

                        </TouchableOpacity>



                        <Text style={{ alignSelf: 'center', color: theme == 'Dark' ? 'white' : 'black' }}>{itemCount}</Text>
                        <TouchableOpacity onPress={() => handleCount('add')} style={styles.counterButton}>

                            <Text style={styles.counterText}>+</Text>

                        </TouchableOpacity>



                    </View>

                </View>


            </View>
        </View>
    )
}

export default CartCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 20,
    },
    image: {
        width: windowWidth / 3,
        height: windowHeight / 8,
        borderRadius: 12,
    },
    details: {
        justifyContent: 'space-around'
    },
    detailsText: {
        fontSize: 18,
        fontWeight: '500',
    },
    priceText: {
        fontSize: 22,
        fontWeight: '500',
        color: '#FC7800'

    },
    detailsBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    itemCounter: {
        flexDirection: 'row',
        gap: 12,
        left: '20%'
    },
    counterButton: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        backgroundColor: '#FC7800',
        borderRadius: 8
    },
    counterText: {
        fontSize: 20,
        fontWeight: '400',
        alignSelf: 'center'
    },

})