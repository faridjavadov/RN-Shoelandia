import { StyleSheet, Text, View ,Image,Dimensions} from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AdsCard = (props: any) => {

    const url = props.item.ads
    return (
        <View style={styles.imageContainer} >
            <Image style={styles.adsImage} source={{uri:url}}/>
        </View>
    )
}

export default AdsCard

const styles = StyleSheet.create({

    imageContainer:{
        width: windowWidth/1.06,
        height: 160,

    },
    adsImage: {
        alignSelf:'center',
        width:'100%',
        height:'100%',
        borderRadius:20,
        resizeMode: 'contain'
      },
})