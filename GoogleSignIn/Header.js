import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
    return (
        <View style={{marginLeft: 15, marginTop: 30}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                SignIn with Google
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Header;
