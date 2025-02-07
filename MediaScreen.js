import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';
export default function CreatePost() {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState();

  const { session } = useAuth();

  useEffect(() => {
    if (!media) {
      pickMedia();
    }
  }, [media]);

  const pickMedia = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type);
    }
  };

  const createPost = async () => {
    if (!media) {
      return;
    }
    const response = await uploadImage(media);
    console.log('image id: ', response && response.public_id);

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          caption,
          image: response && response.public_id,
          user_id: session && session.user.id,
          media_type: mediaType,
        },
      ])
      .select();

    router.push('/(tabs)');
  };

  return (
    <View className="p-3 items-center flex-1">
      {/* Image Picker Preview */}
      {!media ? (
        <View className="w-52 aspect-[3/4] rounded-lg bg-slate-300" />
      ) : mediaType === 'image' ? (
        <Image
          source={{ uri: media }}
          className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
        />
      ) : (
        <Video
          className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
          style={{ width: '100%', aspectRatio: 16 / 9 }}
          source={{ uri: media }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
        />
      )}

      <Text onPress={pickMedia} className="text-blue-500 font-semibold m-5">
        Change
      </Text>

      {/* Caption Input */}
      <TextInput
        value={caption}
        onChangeText={(newValue) => setCaption(newValue)}
        placeholder="What is on your mind"
        className="w-full p-3"
      />

      {/* Share Button */}
      <View className="mt-auto w-full">
        <Button title="Share" onPress={createPost} />
      </View>
    </View>
  );
}
