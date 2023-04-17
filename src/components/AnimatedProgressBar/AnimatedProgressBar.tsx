import React, {useEffect, useRef} from 'react';
import {Animated as AnimatedNative, Dimensions, Pressable, StyleSheet, View, Text} from "react-native";
import {theme} from "@/theme/theme";
import Animated from "react-native-reanimated";

const {width} = Dimensions.get("screen");
const finalWidth = width/2;

const AnimatedBar = Animated.createAnimatedComponent(Pressable);

const AnimatedProgressBar = () => {

    const barWidth = React.useRef(new Animated.Value(0)).current;


    const springConfig = {
        toValue: finalWidth,
        speed: 2, // non prende questo parametro non capisco perchè
        damping: 8,
        mass: 1,
        stiffness: 40,
        bounciness: 20,
        overshootClamping: false,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001,
        useNativeDriver: false,
    }

    const opacity = useRef(new AnimatedNative.Value(1)).current;


    const onPress = () => {
        AnimatedNative.timing(opacity, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: false,
        })
    }

    useEffect(() => {
        setTimeout(() => {
            Animated.spring(barWidth, springConfig).start();
        }, 3500);
    }, []);

    return(
        <View>
            <AnimatedBar style={[style.barContainer]} onPress={onPress}>
               <Animated.View style={[style.progressBar, {width: barWidth}]}/>
            </AnimatedBar>
            <View style={style.numbersContainer}>
                <Text> 200 </Text>
                <Text style={style.pointsNumber}> 265 </Text>
                <Text> 300 </Text>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    barContainer: {
        justifyContent: "center",
        borderWidth: 3,
        borderColor: theme.colors.lavander,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 15,
        backgroundColor: theme.colors.lavander,

    },
    progressBar: {
        backgroundColor: theme.colors.primary,
        width: width/2,
        height: 15,
        borderRadius: 15,
    },
    numbersContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 30,
        marginRight: 30,
        top: 5,
    },
    pointsNumber: {
        position: "absolute",
        marginLeft: finalWidth - 20,
        fontWeight: "bold",
        fontSize: 16,
    }
})

export default AnimatedProgressBar