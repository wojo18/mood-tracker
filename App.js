import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const moods = ['😄', '😊', '😐', '😢', '😠'];

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState([]);

  const saveMood = async () => {
    if (!selectedMood) return;
    const today = new Date().toISOString().split('T')[0];
    const newEntry = { date: today, mood: selectedMood, note };
    const updated = [newEntry, ...history];
    await AsyncStorage.setItem('moodHistory', JSON.stringify(updated));
    setHistory(updated);
    setSelectedMood(null);
    setNote('');
  };

  const loadHistory = async () => {
    const stored = await AsyncStorage.getItem('moodHistory');
    if (stored) setHistory(JSON.parse(stored));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>How do you feel today?</Text>
      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood}
            onPress={() => setSelectedMood(mood)}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.selected,
            ]}
          >
            <Text style={styles.mood}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add a note (optional)"
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveMood}>
        <Text style={styles.saveText}>Save Mood</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Mood History</Text>
      {history.map((entry, idx) => (
        <View key={idx} style={styles.historyItem}>
          <Text>{entry.date}: {entry.mood} {entry.note ? `- ${entry.note}` : ''}</Text>
        </View>
      ))}
    </ScrollView>
  );
}export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Siema, świat!</Text>
    </View>
  );
              }
          

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  moodButton: { padding: 10, borderWidth: 1, borderRadius: 10 },
  selected: { backgroundColor: '#ddd' },
  mood: { fontSize: 32 },
  input: { borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 20 },
  saveButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10 },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  historyTitle: { fontSize: 20, marginTop: 30, marginBottom: 10 },
  historyItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});
