import {
  FlatList,
  ImageBackground,
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  Image,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
const zoomIn = {
  from: {
    scale: 0.8,
  },
  to: {
    scale: 1,
  },
};
const zoomOut = {
  from: {
    scale: 1,
  },
  to: {
    scale: 0.8,
  },
};

const TrendingItem = ({ activeItem, item }: { activeItem: any; item: any }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn as any: zoomOut as any}
      duration={500}
    >
      {play ? (
        <Text className="text-white">playing</Text>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center  items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            source={{ uri: item.thumbail }}
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending = ({ posts }: { posts: any }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
