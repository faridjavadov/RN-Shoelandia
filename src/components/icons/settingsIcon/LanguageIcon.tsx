import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { useSelector } from "react-redux"
import { StateType } from "../../../redux/store/Store"

function SvgComponent(props: any) {

    const {theme} = useSelector((state:StateType)=>state.SettingsSlice)
    return (
        <Svg

            height={20}
            width={20}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={3}
            stroke={theme == 'Dark'? 'white':"#000"}
            fill="none"
            {...props}
        >
            <Path d="M34.53 14.59s-1.6 18.21-24 32.78" strokeLinecap="round" />
            <Path strokeLinecap="round" d="M7.35 14.59L41.46 14.59" />
            <Path strokeLinecap="round" d="M24.4 9.08L24.4 14.59" />
            <Path
                d="M16.76 22.05S25.2 36.8 32 41.33M33.55 54.92l10.74-25a.89.89 0 011.63 0l10.73 25"
                strokeLinecap="round"
            />
            <Path strokeLinecap="round" d="M37.25 46.3L52.96 46.3" />
        </Svg>
    )
}

export default SvgComponent
