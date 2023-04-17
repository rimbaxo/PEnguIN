import {LocaleConfig} from "react-native-calendars";
import {format} from "date-fns";
import {MarkedDates} from "react-native-calendars/src/types";
import {theme} from "@/theme/theme";

export const formatMonth = (month: number) => {
    return LocaleConfig.locales.it.monthNames[month - 1];
}

LocaleConfig.locales['it'] = {
    monthNames: [
        'Gennaio',
        'Febbraio',
        'Marzo',
        'Aprile',
        'Maggio',
        'Giugno',
        'Luglio',
        'Agosto',
        'Settembre',
        'Ottobre',
        'Novembre',
        'Dicembre',
    ],
    monthNamesShort: [
        'Ge.',
        'Feb',
        'Mar',
        'Apr',
        'Mag',
        'Giu',
        'Lug',
        'Ago',
        'Set',
        'Ott',
        'Nov',
        'Dic',
    ],
    dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    today: 'Oggi',
};
LocaleConfig.defaultLocale = 'it';

export const formatDate = (date = new Date()) => format(date, 'yyyy-MM-dd');

export const getMarkedDates = (appointments: Date[], val: string) => {

    const markedDates: MarkedDates = {};
    appointments.forEach((appointment) => {

        //const today_Date = new Date();
        const formattedDate = formatDate(new Date(appointment));

        markedDates[formattedDate] = {
            ...markedDates[formattedDate],
            marked: true,
            customStyles: {
                container: {
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: theme.colors.accent,
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: formattedDate === val ? theme.colors.lavander : theme.colors.primary,
                    //backgroundColor: appointment.getDate() === today_Date.getDate() ? theme.colors.lavander : theme.colors.primary, //`${theme.colors.lavander}33`
                },
                text: {
                    color: formattedDate === val ? theme.colors.primary : theme.colors.background,
                }
            },
        };
    });

    return markedDates;
};


