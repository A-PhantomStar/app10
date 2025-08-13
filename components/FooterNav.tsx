import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type FooterNavProps = {
  active: 'home' | 'bag' | 'heart' | 'user' | 'search';
};

const FooterNav = ({ active }: FooterNavProps) => {
  const router = useRouter();

  const iconColor = (name: string) => (active === name ? 'black' : 'gray');

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderColor: '#eee' }}>
      <TouchableOpacity onPress={() => router.push('/mainpage')}>
        <Feather name="home" size={24} color={iconColor('home')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/cart_screen')}>
        <Feather name="shopping-bag" size={24} color={iconColor('cart')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/favorites_screen')}>
        <Feather name="heart" size={24} color={iconColor('heart')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/accountInfo')}>
        <Feather name="user" size={24} color={iconColor('user')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/search')}>
        <Feather name="search" size={24} color={iconColor('search')} />
      </TouchableOpacity>
    </View>
  );
};

export default FooterNav;
