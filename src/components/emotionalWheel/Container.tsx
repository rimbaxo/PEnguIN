import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import {
    PADDING,
} from "./constants";

import Label from "./Label";

interface ContainerProps {
    start: Animated.SharedValue<number>;
    children: ReactNode;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EBFDFF",
        borderRadius: 16,
        padding: PADDING,

    },
    values: {
        flexDirection: "row",
        justifyContent: "space-between",
        color: "black"
    },
});

const Container = ({ start, children }: ContainerProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.values}>
                <Label theta={start} label="BEDTIME" icon="bed" />
            </View>
            {children}
        </View>
    );
};

export default Container;