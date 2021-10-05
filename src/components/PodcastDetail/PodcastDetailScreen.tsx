import React, {useContext} from 'react';
import {Box, Text} from 'react-native-design-utility';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {SearchStackRouteParamsList} from '../../navigators/types';
import {theme} from '../../constants/theme';
import {useQuery} from '@apollo/client';
import feedQuery from '../../graphql/query/feedQuery';
import {FeedQuery, FeedQueryVariables} from '../../types/graphql';
import {getWeekDay, humanDuration} from '../../lib/dateTimeHelper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PlayerContext, usePlayerContext} from '../../contexts/PlayerContext';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const {data: PodcastData} = useRoute<NavigationParams>().params ?? {};
  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: PodcastData.feedUrl,
    },
  });

  const playerContext = usePlayerContext();

  return (
    <Box f={1} bg="white">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {PodcastData.thumbnail && (
                <Box mr={10}>
                  <Image
                    source={{uri: PodcastData.thumbnail}}
                    style={s.thumbnail}
                  />
                </Box>
              )}
              <Box f={1}>
                <Text size="lg" bold>
                  {PodcastData.podcastName}
                </Text>
                <Text size="xs" color="grey">
                  {PodcastData.artist}
                </Text>
                <Text color="blueLight" size="xs">
                  Subscribed
                </Text>
              </Box>
            </Box>
            <Box px="sm" mb="md" dir="row" align="center">
              <Box mr={10}>
                {playerContext.currentTrack?.url === data?.feed[0].linkUrl &&
                playerContext.isPlaying ? (
                  <TouchableOpacity onPress={() => playerContext.pause()}>
                    <FeatherIcon
                      name="pause"
                      size={30}
                      color={theme.color.blueLight}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      const el = data?.feed[0];

                      if (!el) {
                        return;
                      }

                      playerContext.play({
                        title: el.title,
                        artwork: el.image ?? PodcastData.thumbnail,
                        id: el.linkUrl,
                        url: el.linkUrl,
                        artist: PodcastData.artist,
                      });
                    }}>
                    <FeatherIcon
                      name="play"
                      size={30}
                      color={theme.color.blueLight}
                    />
                  </TouchableOpacity>
                )}
              </Box>
              <Box f={1}>
                <Text bold>Play</Text>
                <Text size="sm">{data?.feed[0].title}</Text>
              </Box>
            </Box>

            <Box px="sm" mb="md">
              <Text bold size="lg">
                Episodes
              </Text>
            </Box>

            {loading && (
              <Box h={200} center>
                <ActivityIndicator size="large" color={theme.color.blueLight} />
              </Box>
            )}
          </>
        }
        data={data?.feed}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="sm">
            <Box style={{height: StyleSheet.hairlineWidth}} bg="greyLighter" />
          </Box>
        )}
        renderItem={({item, index}) => (
          <Box px="sm">
            <Text size="xs" color="grey">
              {getWeekDay(new Date(item.pubDate)).toUpperCase()}
            </Text>
            <Text bold>{item.title}</Text>
            {item?.description && (
              <Text size="sm" color="grey" numberOfLines={2}>
                {item?.description}
              </Text>
            )}
            <Text size="sm" color="grey">
              {humanDuration(item.duration)}
            </Text>
          </Box>
        )}
        keyExtractor={item => item.linkUrl}
      />
    </Box>
  );
};

const s = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default PodcastDetailsScreen;
