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
      viewBox="0 0 576 512"
      {...props}
    >
      <Path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16h448zm16 144v192c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224h480zM64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24h-48zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h112c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" />
    </Svg>
  )
}

export default SvgComponent
