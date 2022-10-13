import {height, width} from '../../styles/Dimension';

import Colors from '../../assets/colors/Colors';
import {StyleSheet} from 'react-native';

// import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: Colors.bgColor,
        height:height,
        // backgroundColor: Colors.headerColor,
        // justifyContent:'center',
        alignItems:'center',
    },
    headerView: {
        width: width,
        height: height * 0.05,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    inputContainer: {
        width:width,
        height:height*0.25,
        alignItems:'center',
        // backgroundColor:'pink'
    }
});

export default styles;
