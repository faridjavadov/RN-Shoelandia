import CartCard from "../Items/cartItems/CartCard"
import AdsCard from "../Items/homeItems/AdsCard"
import AllShoeCard from "../Items/homeItems/AllShoeCard"
import BrandCard from "../Items/homeItems/BrandCard"
import ShoeCard from "../Items/homeItems/ShoeCard"
import ShoeFavoriteCard from "../Items/homeItems/ShoeFavoriteCard"
import SizeCard from "../Items/homeItems/SizeCard"


export const renderItemAds = ({ item }: any) => {
  return (
    <AdsCard item={item} />
  )
}




export const renderItemSizes = ({ item }: any) => {
  return (
    <SizeCard item={item} />
  )
}
export const cartRenderItem = ({ item }: any) => {
  return (
    <CartCard item = {item}/>
  )
}
