import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { useSelector } from "react-redux"
import { StateType } from "../../../redux/store/Store"

function SvgComponent(props:any) {
 const {theme} = useSelector((state:StateType)=>state.SettingsSlice)

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={20}
      width={20}
      fill={theme=='Dark'?'white':'black'}
      viewBox="0 0 448 512"
      {...props}
    >
      <Path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352v64c0 53 43 96 96 96h256c53 0 96-43 96-96v-64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32v-64z" />
    </Svg>
  )
}

export default SvgComponent
