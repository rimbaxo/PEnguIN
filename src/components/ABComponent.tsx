import React from "react";

import {View, StyleSheet, useWindowDimensions, Text} from "react-native";
import CircularSlider from "@/components/emotionalWheel/CircularSlider";
import {useSharedValue} from "react-native-reanimated";

const ABComponent = ({item}:{item:any}) => {

    const {width} = useWindowDimensions();
    const start = useSharedValue( Math.PI / 2);

    /*
    const start1 = 1900;
    const values = new Array(new Date().getFullYear() - start1 + 1)
        .fill(0)
        .map((_, i) => {
            const value = start1 + i;
            return { value, label: `${value}` };
        }).reverse();

    */

    if(item.num === "1"){
        return(
            <View style={[styles.container, {width}]}>
                <CircularSlider start={start}/>
            </View>
        )
    }
    else if(item.num === "2"){

        return (
            <View style={[styles.container, {width}]}>
                <Text> component x </Text>
            </View>
    )}
    else
        return (
            <View style={[styles.container, {width}]}>
                <Text> Another component </Text>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ABComponent;
