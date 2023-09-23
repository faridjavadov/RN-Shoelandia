import { StyleSheet, Text, View, Dimensions, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import MakeFavoriteIcon from '../../icons/homeIcons/MakeFavoriteIcon'
import NotFavoriteIcon from '../../icons/homeIcons/NotFavoriteIcon'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../../../redux/store/Store';
import { handleFavorite, addFavorite, removeFavorite } from '../../../redux/slicers/ShoesSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ShoeCard = (props: any) => {



    const { theme, language } = useSelector((state: StateType) => state.SettingsSlice)
    const { favorites } = useSelector((state: StateType) => state.ShoesSlice)
    const { userEmail } = useSelector((state: StateType) => state.UserSlice)
    const dispatch = useDispatch<AppDispatch>();

    const url = props.item.image;


    const MakeUserFavorite = () => {
        
        if (favorites.find((c: any) => c.id == props.item.id)!=undefined) {
            console.log('salam');
            
            dispatch(removeFavorite({ email: userEmail, item: props.item }))
            dispatch(handleFavorite(props.item))

        }
        else {
            dispatch(addFavorite({ email: userEmail, item: props.item }))
            dispatch(handleFavorite(props.item))

        }
    }
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('DetailsScreen', props.item)}>
            <View style={styles.container}>

                <View style={styles.favoriteWrapper}>
                    <TouchableOpacity onPress={MakeUserFavorite}>
                        {
                            favorites.find((c: any) => c.id == props.item.id) ? <MakeFavoriteIcon size={22} /> : <NotFavoriteIcon size={22} />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>

                    <Image style={styles.image} source={{ uri: url }} />

                </View>

                <Text style={[styles.nameText, { color: theme == 'Dark' ? 'white' : 'black' }]}>{props.item.name}</Text>

                <Text style={styles.priceText}>$ {props.item.price}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default ShoeCard

const styles = StyleSheet.create({
    container: {
        width: windowWidth / 2.3,
        height: windowHeight / 4,

    },
    imageContainer: {
        width: '100%',
        height: '75%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,

    },
    nameText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    priceText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FC7800'
    },
    favoriteWrapper: {
        position: 'absolute',
        right: '3%',
        top: '3%',
        zIndex: 1,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        backgroundColor: 'white'
    },

})