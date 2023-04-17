import React from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { Path } from "react-native-svg";
import {CENTER} from "@/components/emotionalWheel/constants";

//Make any React component Animatable. Used to create Animated.View, etc.
const AnimatedPath = Animated.createAnimatedComponent(Path);
const r = 5;//STROKE / 2;


interface PathProps {
    pos: Animated.SharedValue<Vector>;
    onPress?: () => void;
}


const MyPath = ({ pos, onPress }: PathProps) => {
    const animatedProps = useAnimatedProps(() => {
        const { x, y } = pos.value;
        return {
            d: "M " + CENTER.x.toString() + " " + CENTER.y.toString() + " L " + x.toString() + " " + y.toString() + " M " + (x - r).toString() + ", " + y.toString() + " a " + r.toString() + "," + r.toString() + " 0 1,0 " + (r*2).toString() + ",0 " + "a " + r.toString() + "," + r.toString() + " 0 1,0 -" + (r*2).toString() + ",0",
            strokeWidth: "3",
        };
    });
    return <AnimatedPath animatedProps={animatedProps} stroke="#222233" fill="#222233" onPressOut={onPress} onPressIn={onPress}/>;
};



export default MyPath;
