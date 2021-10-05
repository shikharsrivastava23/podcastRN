import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {PlayerContext, usePlayerContext} from '../../contexts/PlayerContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {theme} from '../../constants/theme';
import {Image} from 'react-native';
const MiniPlayer = () => {
  const playerContext = usePlayerContext();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }

  return (
    <Box
      h={75}
      bg="white"
      px="sm"
      style={{borderTopWidth: 1, borderTopColor: theme.color.greyLight}}>
      <Box f={1} dir="row" align="center" justify="between">
        <Box
          h={50}
          w={50}
          bg="blueLight"
          radius={10}
          mr={10}
          style={{overflow: 'hidden'}}>
          <Image
            source={{uri: playerContext.currentTrack.artwork?.toString()}}
            style={{flex: 1}}
          />
        </Box>
        <Box f={1} mr={10}>
          <Text numberOfLines={1}>{playerContext.currentTrack.title}</Text>
        </Box>
        <Box mr={10}>
          {playerContext.isPaused && (
            <TouchableOpacity onPress={() => playerContext.play()}>
              <FeatherIcon name="play" size={30} />
            </TouchableOpacity>
          )}

          {playerContext.isPlaying && (
            <TouchableOpacity onPress={() => playerContext.pause()}>
              <FeatherIcon name="pause" size={30} />
            </TouchableOpacity>
          )}

          {playerContext.isStopped && (
            <TouchableOpacity onPress={() => null}>
              <FeatherIcon name="play" size={30} />
            </TouchableOpacity>
          )}
        </Box>
        <Box>
          <TouchableOpacity onPress={() => playerContext.seekto(30)}>
            <FeatherIcon name="rotate-cw" size={30} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default MiniPlayer;
