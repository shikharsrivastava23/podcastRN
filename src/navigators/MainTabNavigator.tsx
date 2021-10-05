import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
  BottomTabView,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather';

import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import SearchScreen from '../components/search/SearchScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import PodcastDetailScreen from '../components/PodcastDetail/PodcastDetailScreen';
import {theme} from '../constants/theme';
import MiniPlayer from '../components/miniPlayer/MiniPlayer';
import EpisodeDetails from '../components/episodeDetails/EpisodeDetailsScreen';
import EpisodeDetailsScreen from '../components/episodeDetails/EpisodeDetailsScreen';

const ListenNowStack = createStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator screenOptions={{headerShown: false}}>
      <ListenNowStack.Screen
        options={{
          title: 'Listen Now',
        }}
        name="ListenNowScreen"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};

const PodcastStack = createStackNavigator();

const PodcastStackNavigator = () => {
  return (
    <PodcastStack.Navigator screenOptions={{headerShown: false}}>
      <PodcastStack.Screen
        name="PodcastDetails"
        component={PodcastDetailScreen}
      />
      <PodcastStack.Screen
        name="EpisodeDetail"
        component={EpisodeDetailsScreen}
      />
    </PodcastStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator screenOptions={{headerShown: false}}>
      <SearchStack.Screen name="SearchHome" component={SearchScreen} />
      <SearchStack.Screen
        name="PodcastDetails"
        component={PodcastStackNavigator}
      />
    </SearchStack.Navigator>
  );
};

const LibraryStack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator screenOptions={{headerShown: false}}>
      <LibraryStack.Screen name="LibraryHome" component={LibraryScreen} />
    </LibraryStack.Navigator>
  );
};

const ICON_SIZE = 24;

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBar={props => (
        <>
          <MiniPlayer />
          <BottomTabBar {...props} />
        </>
      )}
      screenOptions={{
        tabBarActiveTintColor: theme.color.blueLight,
      }}>
      <MainTab.Screen
        name="ListenNow"
        options={{
          title: 'Listen Now',
          tabBarIcon: props => (
            <FeatherIcon
              color={props.color}
              size={ICON_SIZE}
              name="headphones"
            />
          ),
        }}
        component={ListenNowStackNavigator}
      />
      <MainTab.Screen
        name="Library"
        component={LibraryStackNavigator}
        options={{
          tabBarIcon: props => (
            <FeatherIcon color={props.color} size={ICON_SIZE} name="inbox" />
          ),
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: props => (
            <FeatherIcon color={props.color} size={ICON_SIZE} name="search" />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
