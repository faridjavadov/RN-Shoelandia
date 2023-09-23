import { StyleSheet, Text, Touchable, TouchableOpacity, View, Dimensions, Image, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import BackIcon from '../../components/icons/homeIcons/BackIcon'
import MakeFavoriteIcon from '../../components/icons/homeIcons/MakeFavoriteIcon'
import NotFavoriteIcon from '../../components/icons/homeIcons/NotFavoriteIcon'
import VerifiedIcon from '../../components/icons/homeIcons/VerifiedIcon'
import ShoppingBasketIcon from '../../components/icons/homeIcons/ShoppingBasketIcon'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../../redux/store/Store'
import { addFavorite, handleFavorite, removeFavorite } from '../../redux/slicers/ShoesSlice'
import { sizes } from '../../data/Sizes'
import { renderItemSizes } from '../../components/renderItems/renderItems'
import { addCart, addProduct } from '../../redux/slicers/CartSlice'
import CustomPopup from '../../components/Items/homeItems/CustomPopup'
import CustomPopupAlready from '../../components/Items/homeItems/CustomPopupAlready'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetailsScreen = ({ navigation, route }: any) => {

    const dispatch = useDispatch<AppDispatch>();
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupAlready, setShowPopupAlready] = useState(false);
    const { cart, size } = useSelector((state: StateType) => state.CartSlice)
    const { favorites } = useSelector((state: StateType) => state.ShoesSlice)
    const { theme, language } = useSelector((state: StateType) => state.SettingsSlice)
    const item = route.params
    const url = item.image

    const { userEmail } = useSelector((state: StateType) => state.UserSlice)



    const addUserCart = () => {
        dispatch(addProduct(item))
        if (cart.find((c: any) => item.id != c.id)) {
            dispatch(addCart({ email: userEmail, item: item, size: size }))

        }
        else{
            setShowPopupAlready(true)
        }
        console.log(size);


        if (cart.find((c: any) => c.id == item.id)) {
            setShowPopupAlready(true)
        }
        else {
            setShowPopup(true)

        }
    }
    const MakeUserFavorite = () => {

        if (favorites.find((c: any) => c.id == item.id) != undefined) {

            dispatch(removeFavorite({ email: userEmail, item: item }))
            dispatch(handleFavorite(item))

        }
        else {
            dispatch(addFavorite({ email: userEmail, item: item }))
            dispatch(handleFavorite(item))

        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>


                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
                    <BackIcon size={26} />
                </TouchableOpacity>

                <Text style={styles.headerText}>Detail Product</Text>

                <TouchableOpacity style={styles.backContainer} onPress={MakeUserFavorite}>
                    {
                        favorites.find((c: any) => c.id == item.id) ? <MakeFavoriteIcon size={26} /> : <NotFavoriteIcon size={26} />
                    }

                </TouchableOpacity>

            </View>

            <View style={styles.imageList}>


                <Image style={styles.image} source={{ uri: url }} />


            </View>


            <View style={styles.mainDetails}>

                <View>

                    <Text style={styles.nameText}>{item.name}</Text>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <Text style={styles.brandText}><Text style={{ color: 'gray', fontWeight: '600' }}>By</Text> {item.brand}</Text>
                        <VerifiedIcon size={20} />

                    </View>

                    <Text style={styles.priceText}>${item.price}</Text>

                </View>


            </View>

            <View style={styles.Details}>

                <Text style={styles.descriptionText}>Descripton</Text>
                <Text style={styles.detailsText}>{item.description}</Text>
            </View>


            <View style={styles.sizeList}>

                <Text style={styles.descriptionText}>Size of Product</Text>

                <FlatList
                    data={sizes}
                    ItemSeparatorComponent={() => { return (<View style={{ width: 12 }} />) }}
                    renderItem={renderItemSizes}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

            </View>


            <View style={styles.buttonContainer}>

                <TouchableOpacity onPress={addUserCart} style={styles.basketIcon}>

                    <ShoppingBasketIcon size={32} />

                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate("CartScreen")} style={styles.button}>


                    <Text style={styles.checkoutText}>Checkout Now</Text>


                </TouchableOpacity>

            </View>
            <CustomPopup visible={showPopup} onClose={() => setShowPopup(false)} />
            <CustomPopupAlready visible={showPopupAlready} onClose={() => setShowPopupAlready(false)} />

        </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        marginTop: '12%',
        paddingHorizontal: '3%',
        marginBottom: '3%',
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: '2%',
        gap: windowWidth / 6,
    },
    headerText: {

        fontSize: 22,
        fontWeight: '600'
    },
    backContainer: {
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        padding: '2%',
        borderRadius: 40
    },
    imageList: {
        flex: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    mainDetails: {
        flex: 1,
        gap: 2,
    },
    nameText: {
        fontSize: 22,
        fontWeight: '600'
    },
    brandText: {
        fontSize: 18
    },
    priceText: {
        fontSize: 22,
        color: '#FC7800',
        fontWeight: '700'
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: '500'
    },
    detailsText: {
        fontSize: 15,
        color: 'gray'
    },
    Details: {
        flex: 1.7,
        gap: 8,
    },
    sizeList: {
        flex: 1.3,
        gap: 6
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    basketIcon: {
        backgroundColor: '#F6F6F6',
        padding: '2%',
        borderRadius: 40
    },
    checkoutText: {
        fontSize: 20,
        color: 'white'
    },
    button: {
        backgroundColor: '#FC7800',
        borderRadius: 20,
        paddingVertical: '3%',
        paddingHorizontal: '25%'
    },

})