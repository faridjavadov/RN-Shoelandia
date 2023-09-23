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
      <Path d="M304 128a80 80 0 10-160 0 80 80 0 10160 0zm-208 0a128 128 0 11256 0 128 128 0 11-256 0zM49.3 464h349.4c-8.9-63.3-63.3-112-129-112h-91.4c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
    </Svg>
  )
}

export default SvgComponent
