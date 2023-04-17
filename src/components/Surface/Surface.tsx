import { FC, ComponentProps, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Surface as RNSurface, useTheme } from 'react-native-paper';

type RNSurfaceProps = ComponentProps<typeof RNSurface>;

type Props = RNSurfaceProps & {
  color?: keyof ReactNativePaper.ThemeColors;
};

const Surface: FC<Props> = (props) => {
  const { children, color } = props;
  const theme = useTheme();
  const styles = useMemo(() => creatStyles(theme, color!), [theme]);
  return (
    <RNSurface style={styles.surface} {...props}>
      {children}
    </RNSurface>
  );
};

const creatStyles = (theme: ReactNativePaper.Theme, color: keyof ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    surface: {
      padding: 20,
      borderRadius: theme.shapes.radius,
      backgroundColor: theme.colors[color],
    },
  });

Surface.defaultProps = {
  color: 'surface',
};

export default Surface;
