import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "video"
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }

      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail) {
      return Alert.alert("Please fill in all the fields");
    }

    setUploading(true);

    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Title"
          value={form.title}
          placeholder="Give your video a catchy title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity
            onPress={() => {
              openPicker("video");
            }}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 border border-black-200 bg-black-100 rounded-2xl justify-center items-center">
                <Image
                  source={icons.upload}
                  className="w-[42%] h-[42%]"
                  resizeMode="contain"
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity
            onPress={() => {
              openPicker("image");
            }}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border border-black-200 flex-row space-x-2">
                <Image
                  source={icons.uploadSmall}
                  className="w-5 h-5"
                  resizeMode="contain"
                />

                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Publish"
          handlePress={submit}
          containerStyles="mt-7 mb-12"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
