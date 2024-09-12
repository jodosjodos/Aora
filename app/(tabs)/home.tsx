import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
interface postsProps extends Models.Document {
  video: string;
  thumbnail: string;
  title: string;
  prompt: string;
}
const Home = () => {
  const { data: posts, refetch } = useAppwrite({ fn: getAllPosts });
  const [refreshing, setReFreshing] = useState(false);
  const onRefresh = async () => {
    setReFreshing(true);
    await refetch();
    setReFreshing(false);
  };
  
  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        // data={[]}
        data={posts ?? []}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 py-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Jodos
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-9"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput
              placeholder="Search for a video topic"
              title=""
              value=""
              handleChangeText={() => {}}
            />
            {/* <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg mb-3 font-pregular">
                Latest Videos
              </Text>
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View> */}
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
