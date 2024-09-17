import { StyleSheet } from "react-native";

export const INTER_REGULAR = 'InterRegular';
export const GUERRILLA_REGULAR = 'GuerrillaRegular';
export const LOBSTER_REGULAR = 'Lobster'

export const globalFont = StyleSheet.create({
    mainFont: {
        fontFamily: INTER_REGULAR
    },
    headerFont: {
        fontFamily: GUERRILLA_REGULAR,
        fontSize: 22,
    },
    titleFont: {
        fontFamily: LOBSTER_REGULAR,
        fontSize: 22,
    },
})