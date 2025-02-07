// Navigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/Homescreen';
import MediaScreen from './Screens/MediaScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import PollScreen from './Screens/PollScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// AnimatedTabIcon: scales up when focused.
const AnimatedTabIcon = ({ name, size, color, focused }) => {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [focused]);
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Icon name={name} size={size} color={color} />
    </Animated.View>
  );
};

// OptionItem component: renders an icon with a label.
const OptionItem = ({ iconName, label, onPress }) => (
  <TouchableOpacity style={styles.fabOption} onPress={onPress}>
    <View style={styles.innerContainer}>
      <Icon name={iconName} size={25} color="white" />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// FloatingButton with a callback prop for navigation.
const FloatingButton = ({ onMediaPress, onPollPress }) => {
  const [expanded, setExpanded] = React.useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const getStyle = (angle, radius) => {
    return {
      transform: [
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, radius * Math.cos(angle)],
          }),
        },
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, radius * Math.sin(angle)],
          }),
        },
      ],
      opacity: animation,
    };
  };

  return (
    <View style={styles.fabContainer}>
      <Animated.View style={[styles.option, getStyle(-Math.PI / 3, 150)]}>
        <OptionItem iconName="format-quote-close" label="Quote" onPress={() => alert('Quote')} />
      </Animated.View>
      <Animated.View style={[styles.option, getStyle(-Math.PI / 2, 150)]}>
        <OptionItem iconName="image" label="Media" onPress={onMediaPress} />
      </Animated.View>
      <Animated.View style={[styles.option, getStyle(-2 * Math.PI / 3, 150)]}>
        <OptionItem iconName="poll" label="Poll" onPress={onPollPress} />
      </Animated.View>
      <TouchableOpacity style={styles.simpleFab} onPress={toggleMenu}>
        <Icon name={expanded ? "close" : "plus"} size={30} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};


const BottomTabNavigator = () => {
  const navigation = useNavigation();
  // Pass a callback to FloatingButton to navigate to MediaScreen when "Media" is tapped.
  const handleMediaPress = () => {
    navigation.navigate('Media');
  };

  const handlePollPress = () => {
    navigation.navigate('Poll');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarIcon: ({ focused, size }) => (
            <AnimatedTabIcon name="home" size={size} color="white" focused={focused} />
          ) 
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={HomeScreen} 
        options={{ 
          tabBarIcon: ({ focused, size }) => (
            <AnimatedTabIcon name="shopping" size={size} color="white" focused={focused} />
          ) 
        }}
      />
      <Tab.Screen 
        name="AddPost" 
        component={HomeScreen}
        options={{
          tabBarButton: () => <FloatingButton onMediaPress={handleMediaPress} onPollPress={handlePollPress} />,
        }}
      />
      <Tab.Screen  
        name="Search"
        component={HomeScreen} 
        options={{ 
          tabBarIcon: ({ focused, size }) => (
            <AnimatedTabIcon name="magnify" size={size} color="white" focused={focused} />
          ) 
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={HomeScreen} 
        options={{ 
          tabBarIcon: ({ focused, size }) => (
            <AnimatedTabIcon name="account" size={size} color="white" focused={focused} />
          ) 
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Media" component={MediaScreen} /> 
      <Stack.Screen name="Poll" component={PollScreen} /> 

    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000',
    borderTopWidth: 0,
    height: 90,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  simpleFab: {
    padding: 10,
    marginBottom: -10,
  },
  fabOption: {
    width: 64.27,
    height: 80,
    backgroundColor: 'rgba(187, 187, 187, 0.4)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(103, 19, 230)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
  labelContainer: {
    marginTop: 4,
    width: 40,
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: 'white',
  },
  option: {
    position: 'absolute',
  },
});
