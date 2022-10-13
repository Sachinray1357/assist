import React, { Component } from 'react'
import { StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { height, width } from '../../styles/Dimension';

import Colors from '../../assets/colors/Colors';
import CustomButton from '../../components/CustomButton';
import Icons from '../../constants/Icons';
import InputArea from '../../components/InputContainer';
import LogoWithTitle from '../../components/LogoWithTitle';
import StraightLine from '../../components/StraightLine';
import styles from './styles';

interface LoginProps {
  navigation?: any,
}

interface LoginState {
  isVisible: boolean,
  email: string,
}

export class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      isVisible: false,
      email: '',
    }
  }

  passwordVisibility = () => {
    if (this.state.isVisible) {
      this.setState({ isVisible: false })
    }
    else {
      this.setState({ isVisible: true })
    }
  }

  render() {
    console.log('login--');
    console.log(this.state.email);
      
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor={Colors.bgColor} />
        {/* <Text>Login</Text> */}
        <LogoWithTitle/>
        <View style={styles.inputContainer}>
          <InputArea
            placeHolderTitle='Email'
            placeholderColor={Colors.primaryGrayColor}
            value={this.state.email}
            keyboardType='email-address'
            onChangeText={(text:string)=>this.setState({email:text})}
          />
          <InputArea
            placeHolderTitle='Password'
            secureTextEntry={this.state.isVisible}
            placeholderColor={Colors.primaryGrayColor}
            onPress={this.passwordVisibility}
            Icon={
              <Icons.Ionicons name={this.state.isVisible ? 'eye-off' : 'eye'} size={22} color='gray' />
            }
          />
        </View>
        <CustomButton
          onPress={() => this.props.navigation.navigate('BottomTabNavigation')}
          title='Log in'
        />
        <StraightLine title='Or' />
        <CustomButton
          onPress={() => this.props.navigation.navigate('DuringCall2')}
          title2='Log in with Facebook'
          styles={{ backgroundColor: Colors.bgColor, borderWidth: 1, borderColor: 'gray', top: 5 }}
          Icon={
            <Icons.MaterialIcons name='facebook' size={25} color={Colors.headerColor} style={{ right: 5 }} />
          }
        />
        <TouchableOpacity activeOpacity={0.7} style={{ justifyContent: 'center', bottom: 10, position: 'absolute' }}>
          <Text style={{ fontWeight: 'normal', fontSize: 15, color: 'gray' }}>Forgot password ?</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login