import React from "react";
import {StyleSheet} from "react-native";
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {useAnimatedGestureHandler} from "react-native-reanimated";
import { canvas2Polar, Vector } from "react-native-redash";

import {
    CENTER, lineAnimation,
    normalize,
    SIZE, SIZE_N,
} from "./constants";
import {selectDescription} from "./constants";


interface GestureProps {
    start: Animated.SharedValue<number>;
    startPos: Animated.SharedValue<Vector>;

    title: Animated.SharedValue<string>;
    description: Animated.SharedValue<string>;

    display: Animated.SharedValue<string>
}

const Gesture = ({ start, description, title, display }: GestureProps) => {

    //const [isPressed, setIsPressed] = useState(false);

    const onGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { offset: number; }
        >({
        onStart: (_, ctx) => { //{ x, y }, usate ora solo per containedInSquare che non serve più

            //containedInSquare({x, y}, startPos.value, STROKE);
            ctx.offset = start.value;

        },
        onActive: ({ x, y }, ctx) => {
            const  {theta} = canvas2Polar({ x, y }, CENTER);
            const delta = theta - ctx.offset;
            start.value = normalize(start.value + delta);
            ctx.offset = theta;

        },
        onEnd: () => {
            const val = Number(start.value.toFixed(2))/Math.PI;
            start.value = lineAnimation(val, start.value);

            title.value = selectDescription(val).emotion;
            description.value = selectDescription(val).description;

            display.value = "true";
        }

    });

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[StyleSheet.absoluteFill, styles.box]}/>
        </PanGestureHandler>

    );
};

const styles = StyleSheet.create({
    box: {
        width: SIZE_N,
        height: SIZE_N,
        top: 0,
        left: 0,
        display: "flex",
        justifySelf: "center",
        transform: [
            {
                translateX: -SIZE_N/2,
            },
            {
                translateY: -SIZE_N/2,
            },
            {
                scale: SIZE/250,
            },
            {
                translateX: SIZE_N/2,
            },
            {
                translateY: SIZE_N/2,
            },
        ]
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C8D8F4",
        borderRadius: 40,
        width: 200,
        height: 66,
        padding: 10,
    },
    text: {
        fontSize: 18,
        fontFamily: "Satoshi",
        textTransform: "uppercase",
    },
    buttonContainer: {
            marginTop: 25,
            display: "flex" ,
            alignItems: "center",
    },
});

export default Gesture;