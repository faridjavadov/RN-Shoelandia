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
      stroke={theme=='Dark'?'white':'black'}
      viewBox="0 0 384 512"
      {...props}
    >
      <Path d="M215.7 499.2C267 435 384 279.4 384 192 384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2 12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 110 128 64 64 0 110-128z" />
    </Svg>
  )
}

export default SvgComponent
