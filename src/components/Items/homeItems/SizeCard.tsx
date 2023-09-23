import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../../../redux/store/Store'
import { handleSize } from '../../../redux/slicers/CartSlice'

const SizeCard = (props: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const { size } = useSelector((state: StateType) => state.CartSlice)
  return (
    <TouchableOpacity onPress={() => dispatch(handleSize(props.item.size))}>
      <View style={[styles.container,{borderWidth:size==props.item.size?1:0}]}>
        <Text style={styles.text}>{props.item.size}</Text>
      </View>
    </TouchableOpacity>

  )
}

export default SizeCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    width: 60,
    height: 40

  },
  text: {
    fontSize: 16,
    fontWeight: '400'
  },
})