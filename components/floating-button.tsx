import React, { useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { IconButton } from './ui/icon-button';
import { LucideIcon, Plus } from 'lucide-react-native';

type FloatingButtonProps = {
    Icon : LucideIcon;
    onPressAction?: () => void;
}

const FloatingButton = ({ Icon, onPressAction } : FloatingButtonProps) => {
  const animatedValue = new Animated.Value(0); // Animation value for scale effect

  const handlePress = () => {
    if (onPressAction) {
      onPressAction();
    }
  };

  return (
      <Animated.View
        className="absolute bg-blue-500 rounded-full  shadow-lg bottom-36 right-10 focus:scale-110"
      >
        <IconButton size="lg" icon={Plus} onPress={handlePress} className='p-8' />
     </Animated.View>
  );
};

export default FloatingButton;
