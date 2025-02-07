import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  FlatList 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');


const contentData = [
  { type: 'video', id: '1', uri: 'https://s3-alpha-sig.figma.com/img/92b1/5288/8db1850a0b8a68d321f2badf348763ad?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jvQqmbL5kVcp6ZM3-TY4ll~5WNEsJRTqpjFiqB3bGhOft9tiPAcdm1-8Ua~AerDQWxpnsQ1vjZir4Sn6XpnJMQRlXtI7DeyaN7aokL6~HvnoSA9RuBd4CHjp6r2jK3BATxRtB6gESCz4iwDlH3V-uRqZtm8or8xEZLu2gmABeNnpTinW59VSUh7gxeY~wWjAJ-LRuiN8SqWE5fvaEZ97adFOxFSP5EN6rAbJ~5guPl7dFrQtHD8dlFX~Nkdffp4uF5PUthGFPLNmfnCf7Ify1MWcq~k1hbTAXc71yDc3OVJ5TiyqerH-XKCQGj83XuB3cUGhRiHmwxf6bT6Z5xN5aA__' },
  { type: 'poll', id: '2' },
  { type: 'poll', id: '3' },

];

const pollOptions = [
  { id: '1', text: 'Reading a Book' },
  { id: '2', text: 'Listening to Music' },
  { id: '3', text: 'Going for a Walk' },
  { id: '4', text: 'Watching TV' }
];

// Right side interactive options, arranged in a vertical column.
const RightOptions = () => {
  return (
    <View style={styles.rightOptions}>
      {/* 1. Profile Image */}
      <TouchableOpacity style={styles.optionButton}>
        <Image 
          source={require('../assets/Logo.png')} 
          style={styles.profileImage}
        />
      </TouchableOpacity>
      {/* 2. Up Arrow (Likes) */}
      <TouchableOpacity style={styles.optionButton}>
        <Icon name="arrow-up-bold" size={20} color="#fff" />
        <Text style={styles.optionText}>1.2K</Text>
      </TouchableOpacity>
      {/* 3. Down Arrow (Dislikes) */}
      <TouchableOpacity style={styles.optionButton}>
        <Icon name="arrow-down-bold" size={20} color="#fff" />
        <Text style={styles.optionText}>50</Text>
      </TouchableOpacity>
      {/* 4. Comment */}
      <TouchableOpacity style={styles.optionButton}>
        <Icon name="comment-outline" size={30} color="#fff" />
        <Text style={styles.optionText}>120</Text>
      </TouchableOpacity>
      {/* 5. Repost */}
      <TouchableOpacity style={styles.optionButton}>
        <Icon name="repeat" size={30} color="#fff" />
        <Text style={styles.optionText}>Repost</Text>
      </TouchableOpacity>
      {/* 6. Save */}
      <TouchableOpacity style={styles.optionButton}>
        <Icon name="bookmark-outline" size={30} color="#fff" />
        <Text style={styles.optionText}>Save</Text>
      </TouchableOpacity>
      {/* 7. Share */}
      <TouchableOpacity style={styles.optionButton}>
        <Icon name="share-outline" size={30} color="#fff" />
        <Text style={styles.optionText}>Share</Text>
      </TouchableOpacity>

    </View>
    
  );
};

const VideoItem = ({ item }) => {
  return (
    <View style={styles.videoContainer}>
      {/* Replace the Image with a Video component for real playback */}
      <Image 
        source={{ uri: item.uri }} 
        style={styles.video}
        resizeMode="cover"
      />
      {/* Right Side Interactive Options */}
      <RightOptions />
        {/* Bottom Audio Info */}
        <View style={styles.bottomAudio}>
        <Icon name="music" size={20} color="#fff" />
        <Text style={styles.audioText}>Original Audio - Artist</Text>
      </View>
    </View>
  );
};

const PollScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [pollResults, setPollResults] = useState({});

  const handleOptionSelect = (id) => {
    const randomResults = pollOptions.reduce((acc, option) => {
      acc[option.id] = Math.floor(Math.random() * 100);
      return acc;
    }, {});
    setSelectedOption(id);
    setPollResults(randomResults);
  };

  return (
    <View style={styles.pollContainer}>
      <Text style={styles.pollQuestion}>What is your favorite way to relax after work?</Text>
      {pollOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.pollButton,
            { opacity: selectedOption ? (selectedOption === option.id ? 1 : 0.5) : 0.5 }
          ]}
          onPress={() => handleOptionSelect(option.id)}
          disabled={selectedOption !== null}
        >
          <Text style={styles.pollButtonText}>{option.text}</Text>
          {selectedOption && (
            <Text style={styles.pollPercentage}>{pollResults[option.id]}%</Text>
          )}
        </TouchableOpacity>
      ))}
            {/* Right Side Interactive Options */}
        <RightOptions />
        {/* Bottom Audio Info */}
        <View style={styles.bottomAudio}>
        <Icon name="music" size={20} color="#fff" />
        <Text style={styles.audioText}>Original Audio - Artist</Text>
      </View>

    </View>
  );
};


const HomeScreen = () => {
  // State for switching between "For You" and "Following" tabs.
  const [activeTab, setActiveTab] = useState("For You");

  return (
    <View style={styles.container}>
      {/* Fixed Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Image 
            source={require('../assets/Logo.png')} 
            style={styles.headerProfile}
          />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <TouchableOpacity onPress={() => setActiveTab("For You")}>
            <Text style={activeTab === "For You" ? styles.headerTextActive : styles.headerText}>
              For You
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("Following")}>
            <Text style={activeTab === "Following" ? styles.headerTextActive : styles.headerText}>
              Following
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="send" size={30} color="#fff" />
        </TouchableOpacity>

        
      </View>
      
      
      {/* Scrollable Video/Photo Content */}
      <FlatList 
        data={contentData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          item.type === 'video' ? <VideoItem item={item} /> : <PollScreen />
        }
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={height}
        snapToAlignment="start"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1,
    backgroundColor: '#000' 
  },
  header: {
    position: 'absolute',
    top: 60,
    width: '100%',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
  },
  headerProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  headerCenter: {
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 10,
    opacity: 0.6,
  },
  headerTextActive: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  videoContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height,
  },
  rightOptions: {
    position: 'absolute',
    right: 10,
    bottom: 150,
    alignItems: 'center',
  },
  optionButton: {
    marginVertical: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  audioContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    marginTop: 10,
  },
  audioImage: {
    width: '100%',
    height: '100%',
  },
  bottomAudio: {
    position: 'absolute',
    left: 15,
    bottom: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  pollContainer: {
    width: width,
    height: height,
    backgroundColor: 'linear-gradient(180deg,rgb(98, 0, 226),rgb(51, 0, 181),rgb(135, 0, 25))',
    justifyContent: 'center',
    alignItems: 'center',

  },
  pollQuestion: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  pollButton: {
    width: '80%',
    height: 70,
    padding: 15,
    backgroundColor: '#ffffff99',
    borderRadius: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  pollButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  pollPercentage: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});

export default HomeScreen;
