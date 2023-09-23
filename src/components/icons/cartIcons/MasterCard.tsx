import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props: any) {
    return (
        <Svg
            width={26}
            height={26}
            viewBox="0 0 52 32"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <Path
                    fill="#FF5F00"
                    d="M18.7752605 28.537934L32.6926792 28.537934 32.6926792 3.41596003 18.7752605 3.41596003z"
                />
                <Path
                    d="M19.659 15.977c0-5.097 2.376-9.636 6.075-12.561A15.791 15.791 0 0015.904 0C7.121 0 0 7.153 0 15.977 0 24.8 7.12 31.954 15.904 31.954c3.71 0 7.124-1.276 9.83-3.416a15.975 15.975 0 01-6.075-12.561"
                    fill="#EB001B"
                />
                <Path
                    d="M50.971 25.877v-.62h-.16l-.186.427-.185-.427h-.162v.62h.114v-.468l.174.404h.118l.174-.404v.468h.113zm-1.02 0v-.514h.206v-.105h-.526v.105h.207v.514h.112zm1.517-9.9c0 8.824-7.12 15.977-15.904 15.977a15.79 15.79 0 01-9.83-3.416 15.974 15.974 0 006.075-12.561c0-5.096-2.376-9.636-6.075-12.561A15.79 15.79 0 0135.564 0c8.783 0 15.904 7.153 15.904 15.977z"
                    fill="#F79E1B"
                />
            </G>
        </Svg>
    )
}

export default SvgComponent
