import React, {FC, useRef} from 'react';
import {Animated as AnimatedNative, Dimensions, Pressable, StyleSheet, View, Text} from "react-native";
import Svg, {Path} from "react-native-svg";
import {theme} from "@/theme/theme";
import Icon from "@/components/Icon";
import Animated from "react-native-reanimated";

interface Props {
    text: string;
    press: () => void;
    icon: IconName;
    color: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ABCbutton: FC<Props> = (props) => {

    const {press, text, icon, color} = props;

    const opacity = useRef(new AnimatedNative.Value(1)).current;
    const scale = useRef(new AnimatedNative.Value(1)).current;

    const styles = StyleSheet.create({
        button: {
            backgroundColor: color,
            padding: 10,
            width: Dimensions.get('window').width - 50,
            height: 80,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 15,
            marginTop: 10,

        },
        elevation: {
            shadowColor: theme.colors.primary,
            elevation: 1,
        },
        textButton: {
            fontSize: 14,
            textTransform: 'uppercase',
            fontFamily: 'Satoshi',
            color: '#222233',
            marginLeft: 10,
        },
        labelContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    });

    const onPressIn = () => {
        AnimatedNative.parallel([
            AnimatedNative.timing(opacity, {
                toValue: 0.9,
                duration: 150,
                useNativeDriver: true,
            }),
            AnimatedNative.timing(scale, {
                toValue: 0.95,
                duration: 150,
                useNativeDriver: true,
            })
        ]).start();
    };

    const onPressOut = () => {
        AnimatedNative.parallel([
            AnimatedNative.timing(opacity, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
            AnimatedNative.timing(scale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animatedStyle = {
        opacity,
        transform: [{ scale }],
    };

    return (
        <AnimatedPressable
            onPress={press}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <AnimatedNative.View style={[animatedStyle, styles.button, styles.elevation]}>
                <View style={styles.labelContainer}>
                    <Icon iconName={icon} size="22" color={theme.colors.backdrop}/>
                    <Text
                        style={styles.textButton}
                    >{text}</Text>

                </View>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                        stroke="#222233"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.5"
                        d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
                    />
                </Svg>
            </AnimatedNative.View>

        </AnimatedPressable>
    );
}

export default ABCbutton;