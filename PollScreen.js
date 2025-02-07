import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PollScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Entertainment', 'Music', 'Science']);

  const categories = [
    'Comedy', 'Economic', 'Education',
    'Entertainment', 'Inspirational', 'Fashion',
    'Food & Nutrition', 'Music', 'Politics',
    'Pop Culture', 'Real Estate', 'Religion',
    'Satire', 'Science', 'Sports',
    'Tech', 'Travel', 'Roll the Dice'
  ];

  const options = ['TV & Snacks', 'Card games w friends'];

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <LinearGradient
         colors={['rgb(210, 31, 60)', 'rgb(178, 34, 34)', 'rgb(139, 0, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.postButtonGradient}>
          <TouchableOpacity style={styles.postButton}>
            <Text style={styles.postButtonText}>Post</Text>
            <Icon name="play" size={16} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Question Section */}
      <View style={styles.questionSection}>
        <Text style={styles.questionText}>What's your question?</Text>
        <TouchableOpacity style={styles.plusButton}>
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <View key={index} style={styles.optionWrapper}>
            <TouchableOpacity style={styles.deleteButton}>
              <Icon name="trash-can-outline" size={20} color="#666" />
            </TouchableOpacity>
            <View style={styles.optionButton}>
              <Text style={styles.optionText}>{option}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Add Option Button */}
      <TouchableOpacity style={styles.addOptionButton}>
        <Text style={styles.addOptionText}>Add Option</Text>
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Metadata Section */}
      <View style={styles.metadataSection}>
        <View style={styles.metadataGroup}>
          <Text style={styles.metadataLabel}>Hidden Hashtags</Text>
          <Icon name="information" size={16} color="#666" style={styles.infoIcon} />
        </View>
        <View style={styles.metadataGroup}>
          <Text style={styles.metadataLabel}>Algorithm Score</Text>
          <Icon name="information" size={16} color="#666" style={styles.infoIcon} />
        </View>
        <Text style={styles.scoreText}>8.2</Text>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategories.includes(category) && styles.selectedCategory
            ]}>
            <Text style={[
              styles.categoryText,
              selectedCategories.includes(category) && styles.selectedCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight || 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
  },
  postButtonGradient: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 6,
  },
  questionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
  },
  plusButton: {
    backgroundColor: '#6F00FF',
    padding: 10,
    borderRadius: 8,
  },
  optionsContainer: {
    marginBottom: 15,
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  deleteButton: {
    padding: 10,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6F00FF',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  addOptionText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 6,
  },
  metadataSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  metadataGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoIcon: {
    marginLeft: 4,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6F00FF',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#6F00FF',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
});

export default PollScreen;
