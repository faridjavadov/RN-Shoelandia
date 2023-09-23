import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList ,Dimensions} from 'react-native'
import React,{useState} from 'react'
import BackIcon from '../../components/icons/homeIcons/BackIcon'
import SearchIcon from '../../components/icons/homeIcons/SearchIcon'
import { useSelector } from 'react-redux'
import { StateType } from '../../redux/store/Store'
import ShoeFavoriteCard from '../../components/Items/homeItems/ShoeFavoriteCard'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const SearchScreen = ({navigation}:any) => {

    const { data } = useSelector((state: StateType) => state.ShoesSlice)

    const [key, setKey] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const renderItemShoesFavorite = ({ item }: any) => {
        return (
            <ShoeFavoriteCard navigation={navigation} item={item} />
        )
    }
    return (
        <View style={styles.container}>


            <View style={{ flexDirection: 'row', marginBottom: '5%', gap: 10 }}>



                <TouchableOpacity style={{ alignSelf: 'center', bottom: '2%' }} onPress={()=>navigation.navigate("HomeScreen")}>

                    <BackIcon size={26} />


                </TouchableOpacity>

                <View style={styles.searchBarModal}>


                    <SearchIcon />
                    <TextInput onChangeText={setKey} style={{ width: '90%' }} placeholder='Search shoes...' />

                </View>
            </View>



            <View style={styles.listContainer}>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={key.length > 0 ? data.filter((q: any) => q.name.toLowerCase().includes(key.toLowerCase())) : data.filter((q: any) => q.name.includes(']'))}
                    renderItem={renderItemShoesFavorite} />

            </View>

        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({

    container: {
        paddingTop: '20%',
        paddingHorizontal: '3%',
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
 
    listContainer: {
        height: '88%'
    },
    searchBarModal: {
        backgroundColor: '#F6F6F6',
        alignSelf: 'center',
        width: windowWidth / 1.2,
        height: '100%',
        borderRadius: 32,
        flexDirection: 'row',
        paddingHorizontal: '5%',
        gap: 10,
        elevation: 5,
        marginBottom: '5%'

    },
})