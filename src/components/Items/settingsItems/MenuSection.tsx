import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import NextIcon from '../../icons/settingsIcon/NextIcon'
import AccountIcon from '../../icons/settingsIcon/AccountIcon'
import AddressIcon from '../../icons/settingsIcon/AdressIcon'
import AppearanceIcon from '../../icons/settingsIcon/ApperanceIcon'
import PaymentIcon from '../../icons/settingsIcon/PaymentIcon'
import NotificationsIcon from '../../icons/settingsIcon/NotificationsIcon'
import ReportIcon from '../../icons/settingsIcon/ReportIcon'
import FAQIcon from '../../icons/settingsIcon/FAQIcon'
import LanguageIcon from '../../icons/settingsIcon/LanguageIcon'
import ShareIcon from '../../icons/settingsIcon/ShareIcon'
import RateIcon from '../../icons/settingsIcon/RateIcon'
import { useSelector } from 'react-redux'
import { StateType } from '../../../redux/store/Store'


const MenuSection = (props: any) => {
    let iconComponent = null;

    const { theme, language } = useSelector((state: StateType) => state.SettingsSlice)

    switch (props.name) {
        case 'Account Information':
            iconComponent = <AccountIcon />;
            break;
        case 'Address information':
            iconComponent = <AddressIcon />;
            break;
        case 'Appearance':
            iconComponent = <AppearanceIcon />;
            break;
        case 'Language':
            iconComponent = <LanguageIcon />;
            break;
        case 'Payment methods':
            iconComponent = <PaymentIcon />;
            break;
        case 'Notifications':
            iconComponent = <NotificationsIcon />;
            break;
        case 'FAQ':
            iconComponent = <FAQIcon />;
            break;
        case 'Report on issue':
            iconComponent = <ReportIcon />;
            break;
        case 'Rate us':
            iconComponent = <RateIcon />;
            break;
        case 'Share application':
            iconComponent = <ShareIcon />;
            break;

        default:
            break;
    }
    return (
        <View>


            <View style={styles.menuSection}>

                <View style={{ flexDirection: 'row', gap: 7 }}>
                    {iconComponent}
                    <Text style={[styles.generalText, { color: theme == "Dark" ? 'white' : 'black' }]}>{props.name}</Text>

                </View>

                <View style={{ flexDirection: 'row',left:335,top:7,position:'absolute'}}>

                    <NextIcon />

                </View>
            </View>
            <View style={styles.seperator} />

        </View>

    )
}

export default MenuSection

const styles = StyleSheet.create({
    menuSection: {
        padding: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    seperator: {
        width: 355,
        height: 2,
        backgroundColor: '#F0EFF5',
        marginTop: '3%'
    },

    generalText: {
        fontSize: 14,
        fontWeight: '500'
    },
})