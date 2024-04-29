import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logOut = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logOut}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Image
              source={{ uri: user?.avatar }}
              className="w-16 h-16 rounded-lg"
              resizeMode="cover"
            />

            <View className="mt-5">
              <Text className="text-white text-lg text-center font-psemibold">
                {user?.username}
              </Text>
              <Text className="text-sm text-gray-100 text-center font-pregular">
                {`${posts.length || 0} Posts`}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Try searching for something else"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
