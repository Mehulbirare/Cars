import {useRef, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

export const useFadeIn = (duration = 300) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return opacity;
};

export const useSlideIn = (duration = 300, from = 'right') => {
  const translateX = useRef(
    new Animated.Value(from === 'right' ? 50 : from === 'left' ? -50 : 0),
  ).current;
  const translateY = useRef(
    new Animated.Value(from === 'bottom' ? 50 : from === 'top' ? -50 : 0),
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [duration, from]);

  return {translateX, translateY, opacity};
};

export const useScaleIn = (duration = 300) => {
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [duration]);

  return {scale, opacity};
};

export const staggerFadeIn = (items, delay = 100) => {
  return items.map((_, index) => ({
    opacity: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(20)).current,
    delay: index * delay,
  }));
};

export const animateStagger = (animatedItems, duration = 300) => {
  const animations = animatedItems.map(item =>
    Animated.parallel([
      Animated.timing(item.opacity, {
        toValue: 1,
        duration,
        delay: item.delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(item.translateY, {
        toValue: 0,
        duration,
        delay: item.delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]),
  );

  Animated.stagger(50, animations).start();
};

