import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
  Easing,
  withSequence, withRepeat, withSpring
} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function App() {
  const textSize = useSharedValue(12);
  const textSlide = useSharedValue(0);
  const textShake = useSharedValue(0);
  const bottomTextShake = useSharedValue(0);
  const textAnimationConfig: WithTimingConfig  = {
    duration: 800,
    easing: Easing.bezier(0.2, 0.5, 0.2, 1),
  };
  const textStyles = useAnimatedStyle(() => ({
    fontSize: withTiming(textSize.value, textAnimationConfig),
    transform: [
      {
        translateX: withTiming(textSlide.value, {
          duration: 100
        })
      },
      {
        rotate: `${textShake.value}deg`,
      }
    ]
  }));

  useEffect(() => {
    bottomTextShake.value = withRepeat(withSequence(
      withSpring(0, { duration: 400 }),
      withSpring(-50, { duration: 400 }),
      withSpring(50, { duration: 400 }),
      withSpring(0, { duration: 400 }),
    ), -1);
  }, [])

  const shakeTextStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${bottomTextShake.value}deg`,
      }
    ]
  }));

  function increaseTextSize(): void {
    textSize.value = textSize.value + 2;
  }

  function decreaseTextSize(): void {
    textSize.value = textSize.value - 2;
  }

  function slideText(): void {
    textSlide.value = withSequence(
      withTiming(-100),
      withTiming(-80),
      withTiming(-120),
      withTiming(1000)
    );
  }

  function slideTextBack(): void {
    textSlide.value = withTiming(0, { duration: 1200 });
  }

  function shakeText(): void {
    textShake.value = withSequence(
      withTiming(-50),
      withTiming(50),
      withTiming(-20),
      withTiming(20),
      withTiming(-5),
      withTiming(0),
    );
  }

  return (
    <View style={styles.container}>
      <Animated.Text style={textStyles}>Show de Bola!</Animated.Text>
      <Button onPress={increaseTextSize} title="Aumentar Texto" />
      <Button onPress={decreaseTextSize} title="Diminuir Texto" />
      <Button onPress={shakeText} title="Tremer Texto" />
      <Button onPress={slideText} title="Escapar Texto" />
      <Button onPress={slideTextBack} title="Voltar Texto" />
      <Animated.Text style={shakeTextStyles}>Tic Tac!</Animated.Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
});
