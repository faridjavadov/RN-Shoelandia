import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
      }}
      {...props}
    >
      <Path
        d="M9 15a1 1 0 112 0v3a1 1 0 11-2 0v-3zM14 14a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
        fill="#0F0F0F"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 2.525a1 1 0 111.732-1l2.583 4.474.687.001a3.45 3.45 0 01.475.045c.253.042.605.128.97.31.369.185.768.477 1.073.934.308.463.48 1.036.48 1.711s-.172 1.248-.48 1.71c-.305.458-.704.75-1.073.934-.18.09-.357.157-.52.206l-.766 8.422A3 3 0 0117.174 23H6.826a3 3 0 01-2.987-2.728l-.766-8.422a3.292 3.292 0 01-.52-.206 2.754 2.754 0 01-1.073-.933C1.172 10.248 1 9.675 1 9s.172-1.248.48-1.711c.305-.457.704-.75 1.073-.933A3.457 3.457 0 013.999 6h.685l2.584-4.475a1 1 0 011.732 1L6.995 5.998c3.336-.002 6.673-.003 10.01-.001L15 2.525zM3.852 8.018c.083-.014.143-.017.157-.018h15.982a1.461 1.461 0 01.562.144.758.758 0 01.302.254c.067.1.145.277.145.602 0 .325-.078.502-.145.602a.757.757 0 01-.302.254 1.461 1.461 0 01-.562.144H4.009a1.46 1.46 0 01-.562-.144.758.758 0 01-.302-.254C3.078 9.502 3 9.325 3 9c0-.325.078-.502.145-.602a.758.758 0 01.302-.254 1.46 1.46 0 01.405-.126zM5.83 20.09L5.095 12h13.81l-.736 8.09a1 1 0 01-.995.91H6.826a1 1 0 01-.995-.91z"
        fill="#0F0F0F"
      />
    </Svg>
  )
}

export default SvgComponent