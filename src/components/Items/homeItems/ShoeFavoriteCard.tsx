import { StyleSheet, Text, View, Dimensions, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import MakeFavoriteIcon from '../../icons/homeIcons/MakeFavoriteIcon'
import NotFavoriteIcon from '../../icons/homeIcons/NotFavoriteIcon'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../../../redux/store/Store';
import { handleFavorite } from '../../../redux/slicers/ShoesSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ShoeFavoriteCard = (props: any) => {


    const { favorites } = useSelector((state: StateType) => state.ShoesSlice)
    const {theme,language} = useSelector((state:StateType)=>state.SettingsSlice)
    const dispatch = useDispatch<AppDispatch>();

    const url = props.item.image;
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('DetailsScreen',props.item)}>
            <View style={styles.container}>

                <View style={styles.favoriteWrapper}>
                    <TouchableOpacity onPress={() => dispatch(handleFavorite(props.item))}>
                        {
                            favorites.find((c: any) => c.id == props.item.id) ? <MakeFavoriteIcon /> : <NotFavoriteIcon />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>

                    <Image style={styles.image} source={{ uri: url }} />

                </View>

                <Text style={[styles.nameText,{color:theme=='Dark'?'white':'black'}]}>{props.item.name}</Text>

                <Text style={styles.priceText}>$ {props.item.price}</Text>

                {/* <View style={styles.seperatorLine}>

            </View> */}


            </View >
        </TouchableOpacity>
    )
}

export default ShoeFavoriteCard

const styles = StyleSheet.create({
    container: {
        width: windowWidth / 1.06,
        height: windowHeight / 2,

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
        fontSize: 26,
        fontWeight: '500',
        color: 'black'
    },
    priceText: {
        fontSize: 26,
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
    seperatorLine: {
        borderWidth: 0.2,
        height: 0,
        width: '100%',
        borderColor: 'black'

    },
})