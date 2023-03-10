import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const themeColors = {
    primary: '#41b883',
    primaryMedium: '#b4e4ce',
    primaryLight: '#f7fcfa',
    secondary: '#ff227d',
    accent: '#797bf2',
    accentMedium: '#d4b3ff',
    accentLight: '#b8ccff',
    success: '#06d6a0',
    info: '#039BE5',
    warning: '#faae42',
    danger: '#FF7273',
    purple: '#8269B2',
    blue: '#37C3FF',
    green: '#93E088',
    yellow: '#FFD66E',
    orange: '#FFA981',
    lightText: '#a2a5b9',
    fadeGrey: '#ededed',
}

const notyf = new Notyf({
    duration: 2000,
    position: {
        x: 'right',
        y: 'bottom',
    },
    types: [
        {
            type: 'warning',
            background: themeColors.warning,
            icon: {
                className: 'fas fa-hand-paper',
                tagName: 'i',
                text: '',
            },
        },
        {
            type: 'info',
            background: themeColors.info,
            icon: {
                className: 'fas fa-info-circle',
                tagName: 'i',
                text: '',
            },
        },
        {
            type: 'primary',
            background: themeColors.primary,
            icon: {
                className: 'fas fa-car-crash',
                tagName: 'i',
                text: '',
            },
        },
        {
            type: 'accent',
            background: themeColors.accent,
            icon: {
                className: 'fas fa-car-crash',
                tagName: 'i',
                text: '',
            },
        },
        {
            type: 'purple',
            background: themeColors.purple,
            icon: {
                className: 'fas fa-check',
                tagName: 'i',
                text: '',
            },
        },
        {
            type: 'blue',
            background: themeColors.blue,
            icon: {
                className: 'fas fa-check',
                tagName: 'i',
                text: '',
            },
        },
        {
            type: 'green',
            background: themeColors.green,
            icon: {
                className: 'fas fa-check',
                tagName: 'i',
                text: '',
            },
        },
        {
            type: 'orange',
            background: themeColors.orange,
            icon: {
                className: 'fas fa-check',
                tagName: 'i',
                text: '',
            },
        },
    ],
})

export default function useNotyf() {
    return {
        success: (message: string) => {
            notyf.success(message)
        },
        error: (message: string) => {
            notyf.error(message)
        },
        info: (message: string) => {
            notyf.open({
                type: 'info',
                message,
            })
        },
        warning: (message: string) => {
            notyf.open({
                type: 'warning',
                message,
            })
        },
        primary: (message: string) => {
            notyf.open({
                type: 'primary',
                message,
            })
        },
        purple: (message: string) => {
            notyf.open({
                type: 'purple',
                message,
            })
        },
        blue: (message: string) => {
            notyf.open({
                type: 'blue',
                message,
            })
        },
        green: (message: string) => {
            notyf.open({
                type: 'green',
                message,
            })
        },
        orange: (message: string) => {
            notyf.open({
                type: 'orange',
                message,
            })
        },
    }
}