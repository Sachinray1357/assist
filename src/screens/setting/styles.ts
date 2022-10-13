import {height, width} from '../../styles/Dimension';

import Colors from '../../assets/colors/Colors';
import {StyleSheet} from 'react-native';

// import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgColor,
        // justifyContent:'center',
        // alignItems:'center',
    },
    menuWrap: {
        width: '95%',
        marginTop: 15,
        paddingHorizontal: 7,
        // backgroundColor: 'pink'
    },
    headerView: {
        width: width,
        height: height * 0.05,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    profileContainer: {
        width: width,
        height: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    picContainer: {
        height: height * 0.12,
        width: width * 0.22,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    profilePic: {
        width: width * 0.21,
        height: height * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    },
    editIconContainer: {
        backgroundColor: Colors.bgColor,
        width: width * 0.09,
        height: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 18,
        left: 25,
        bottom: 26
    },
    profileTextContainer: {
        width: width,
        height: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default styles;
