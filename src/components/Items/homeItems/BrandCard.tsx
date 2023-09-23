import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const BrandCard = (props: any) => {

    
    const url = props.item.logo;
    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate("BrandScreen",props.item.name)}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: url }} />
            </View>
        </TouchableOpacity>
    )
}

export default BrandCard

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: '#F6F6F6',
        borderRadius: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: 70,
        height: 70
    },
    image: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
})