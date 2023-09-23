import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AllShoeCard from '../../components/Items/homeItems/AllShoeCard';
import BackIcon from '../../components/icons/homeIcons/BackIcon'
import { sneakers } from '../../data/Sneakers';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ViewMoreScreen = ({ navigation }: any) => {
    const renderItemAllShoes = ({ item }: any) => {
        return (
            <AllShoeCard navigation={navigation} item={item} />
        )
    }
    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
                    <BackIcon size={26} />
                </TouchableOpacity>
                <Text style={styles.headerText}>All Products</Text>
            </View>

            <View style={styles.productList}>


                <FlatList
                    columnWrapperStyle={{justifyContent:'space-between'}}
                    numColumns={2}
                    data={sneakers}
                    renderItem={renderItemAllShoes}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => { return (<View style={{ height: 15 }} />) }}
                />



            </View>


        </View>
    )
}

export default ViewMoreScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: '12%',
        paddingHorizontal: '3%',
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%'
    },
    headerText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#FC7800',
        marginLeft: windowWidth / 4
    },
    productList: {
        height:'92%'
    },
})