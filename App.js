import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Device from 'expo-device';

export default function App() {
  const [containerLayout, setContainerLayout] = useState(null);
  const [layout, setLayout] = useState(null);

  function handleContainerLayout(event) {
    setContainerLayout(event.nativeEvent.layout);
  }

  function handleLayout(event) {
    setLayout(event.nativeEvent.layout);
  }

  function safeArea() {
    let topHeight = 0;
    let bottomHeight = 0;
    if (layout !== null) {
      topHeight = layout.y;
    }
    if (layout !== null && containerLayout !== null) {
      bottomHeight = containerLayout.height - (layout.y + layout.height);
    }
    return { topHeight, bottomHeight };
  }

  return (
    <View style={styles.container} onLayout={handleContainerLayout}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.safeArea} onLayout={handleLayout}>
          <Text style={styles.label}>Safe Area</Text>
          <Text style={styles.specLabel}>Top: {safeArea().topHeight}  Bottom: {safeArea().bottomHeight}</Text>
          <View style={styles.modelInfo}>
            <Text style={styles.modelName}>{Device.modelName}</Text>
            {containerLayout &&
              <Text style={styles.specLabel}>{containerLayout.width} x {containerLayout.height}</Text>}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5D5BD3',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#319CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  modelInfo: {
    alignItems: 'center',
    marginTop: 24,
  },
  modelName: {
    color: '#FFFFFF',
    fontSize: 32,
  },
  cutoutLabel: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  specLabel: {
    color: '#FFFFFF',
    fontSize: 20,
  }
});
