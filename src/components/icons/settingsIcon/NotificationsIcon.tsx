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
      <Path d="M224 0c-17.7 0-32 14.3-32 32v17.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416h400c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6c-28.3-35.5-43.8-79.6-43.8-125V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3c25.8-40 39.7-86.7 39.7-134.6V200c0-57.4 46.6-104 104-104h8zm64 352H160c0 17 6.7 33.3 18.7 45.3S207 512 224 512s33.3-6.7 45.3-18.7S288 465 288 448z" />
    </Svg>
  )
}

export default SvgComponent
