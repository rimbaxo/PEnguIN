import {FC, useMemo} from "react";
import {HeaderProps} from "@/navigation/StackNavigator/types";
import {Appbar, useTheme} from "react-native-paper";
import {Dimensions, StyleSheet, View, Text} from "react-native";

const HeaderSuccess: FC<HeaderProps> = (props) => {

    const {title, instructions, exercise, progressInfo } = props;

    const theme = useTheme();

    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <View style={styles.header}>
            <Appbar style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.textInfo}>{instructions}</Text>
                    <Text style={[styles.textInfo, styles.exercise]}>{exercise}</Text>
                    <Text style={[styles.textInfo, styles.progressInfo]}>{progressInfo}</Text>
                </View>

            </Appbar>
        </View>
    );
};


const createStyles = (theme: ReactNativePaper.Theme) =>
    StyleSheet.create({
        header: {
            height: 0,
            backgroundColor: theme.colors.yellow,
        },
        container: {
            height: 0,
            paddingHorizontal: theme.gaps.containerPaddingHorizontal,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: theme.colors.yellow,
            bottomOpacity: 0.0,
            elevation: 0.0,
        },
        barNav: {
            top: 15,
            width: Dimensions.get("screen").width,
            opacity: 0.5,
            paddingLeft: 10,
        },
        text: {
            fontFamily: "Satoshi",
            padding: 20,
            color: "#EBFDFF",
            fontSize: 14,
        },
        titleContainer: {
            top: 25,
            width: Dimensions.get("screen").width,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            color: theme.colors.primary,
            fontSize: 24,
        },
        title: {
            color: theme.colors.primary,
            fontSize: 32,
            fontFamily: 'Satoshi',
            textAlign: "center",
            top: 100,
        },
        infoContainer : {
            width: Dimensions.get("screen").width,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            height: 100,
        },
        textInfo: {
            width: Dimensions.get("screen").width,
            color: theme.colors.primary,
            fontSize: 16,
            fontFamily: 'Satoshi',
            textAlign: "center",
        },
        exercise: {
            fontSize: 24,
            marginTop: 20,
        },
        progressInfo: {
            fontSize: 16,
            marginTop: 75,
        }
    });

export default HeaderSuccess;