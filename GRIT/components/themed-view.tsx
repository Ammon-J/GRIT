import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export function ThemedView({ style, lightColor, darkColor, children, ...rest }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const safeChildren = React.Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <ThemedText>{String(child)}</ThemedText>;
    }
    return child;
  });

  return (
    <View style={[{ backgroundColor }, style]} {...rest}>
      {safeChildren}
    </View>
  );
}