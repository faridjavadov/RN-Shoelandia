import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { sneakers } from '../../data/Sneakers';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store/Store';
import SearchIcon from '../../components/icons/homeIcons/SearchIcon'
import ShoeFavoriteCard from '../../components/Items/homeItems/ShoeFavoriteCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const FavoriteScreen = ({ navigation }: any) => {

  const { theme, language } = useSelector((state: StateType) => state.SettingsSlice)
  const [key, setKey] = useState('');
  const renderItemShoesFavorite = ({ item }: any) => {
    return (
      <ShoeFavoriteCard navigation={navigation} item={item} />
    )
  }
  const { favorites } = useSelector((state: StateType) => state.ShoesSlice)


  return (
    <View style={{flex:1,backgroundColor:theme == 'Dark'?'black':'light'}}>
      <View style={[styles.container, { backgroundColor: theme == 'Dark' ? 'black' : 'white' }]}>

        <View>


          <Text style={styles.headerText}>Favorites</Text>

        </View>

        <View style={styles.searchBarContainer}>

          <View style={styles.searchBar}>
            <SearchIcon />
            <TextInput onChangeText={setKey} style={{ width: '90%' }} placeholder='Search in favorites...' />

          </View>

        </View>

        <View style={styles.favoriteListContainer}>

          <FlatList
            data={key.length > 0 ? favorites.filter((q: any) => q.name.toLowerCase().includes(key.toLowerCase())) : favorites.filter((q: any) => q.name.includes(''))}
            renderItem={renderItemShoesFavorite}
            showsVerticalScrollIndicator={false}
          />


        </View>

      </View>
    </View>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({
  container: {
    marginTop: '12%',
    paddingHorizontal: '3%',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  favoriteListContainer: {
    height: '75%'
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#FC7800'
  },
  searchBarContainer: {

    justifyContent: 'center',
    marginVertical: '5%'
  },
  searchBar: {
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
    width: windowWidth / 1.12,
    height: 50,
    borderRadius: 32,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    gap: 10,
    elevation: 5,

  },
})