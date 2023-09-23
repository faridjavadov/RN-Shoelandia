import { StyleSheet, Text, View, Image, FlatList,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import VerifiedIcon from '../../components/icons/homeIcons/VerifiedIcon'
import BackIcon from '../../components/icons/homeIcons/BackIcon'

import { sneakers } from '../../data/Sneakers'
import AllShoeCard from '../../components/Items/homeItems/AllShoeCard'
import LoadingScreen from '../loading/LoadingScreen'

const BrandScreen = ({ route, navigation }: any) => {
    const brand = route.params
    const [background, setBackground] = useState('')
    const [isLoading, setisLoading] = useState(true)

    const renderItemAllShoes = ({ item }: any) => {
        return (
            <AllShoeCard navigation={navigation} item={item} />
        )
    }
    useEffect(() => {
        // Set the background image based on the brand parameter
        switch (brand) {
            case 'Nike':
                setBackground('https://i.pinimg.com/564x/ee/4a/20/ee4a20a57b5c19521bcf09243f01c611.jpg')
                setisLoading(false)
                break
            case 'Adidas':
                setBackground('https://i.pinimg.com/564x/37/37/92/3737929549e31e2a5dabbe1d548510f6.jpg')
                setisLoading(false)
                break
            case 'New Balance':
                setBackground('https://i.pinimg.com/564x/76/1f/66/761f66c4c9922aac002e575aefd77330.jpg')
                setisLoading(false)
                break
            case 'Puma':
                setBackground('https://i.pinimg.com/564x/7e/2e/1d/7e2e1d895f8d527b98d8342504fd2b4b.jpg')
                setisLoading(false)
                break
            case 'Vans':
                setBackground('https://i.pinimg.com/564x/3b/a9/0f/3ba90fc1bdec6080e2750235b3b5b06b.jpg')
                setisLoading(false)
                break
            default:
                setBackground('DEFAULT_BACKGROUND_URL')
                setisLoading(false)
                break
        }
    }, [brand])

    return (
        isLoading ? <LoadingScreen /> :
            <View style={styles.container}>
                <View style={styles.backgroundImage}>
                    {/* Display the background image */}
                    <Image source={{ uri: background }} style={{ flex: 1 }} />
                </View>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.buttonBack} onPress={()=>navigation.goBack()}>

                        <BackIcon size={30} />

                    </TouchableOpacity>

                    <Text style={styles.headerText}>{brand}</Text>
                    <VerifiedIcon size={30} />
                </View>
                <View style={styles.productList}>

                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        numColumns={2}
                        data={sneakers.filter((c: any) => c.brand == brand)}
                        renderItem={renderItemAllShoes}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => { return (<View style={{ height: 15 }} />) }}
                    />
                </View>
            </View>
    )
}

export default BrandScreen

const styles = StyleSheet.create({
    container: {
        marginTop: '12%',
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    backgroundImage: {
        flex: 2,
    },
    header: {
        flex: 0.8,
        paddingHorizontal: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderBottomWidth: 2,

    },
    headerText: {
        fontSize: 30,
        color: 'black',
        fontWeight: '600',
    },
    buttonBack:{
        position:'absolute',
        left:'5%'
    },
    productList: {
        paddingHorizontal: '3%',
        flex: 7,
    },
})
