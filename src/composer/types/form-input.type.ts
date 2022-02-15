import { Selection } from "./selection.type";

export type FormInput = 
    Selection       |   // done missing limited selections

    'image'         |   // Storage -- main photo -- string
    'images'        |   // Storage -- slider -- string[]
    'video'         |   // Storage -- video player string
    'videos'        |   // Storage -- video player -- slider
    'audio'         |   // Storage -- audio player -- string;
    'audios'        |   // Storage -- audio player -- slider;
    'textField'     |
    'password'      |   
    'email'         |   
    'phoneNumber'   |   // globalized with country codes
    'textArea'      |   // 
    'number'        |
    'otp'           |
    'date'          |
    'dateTime'      |
    'datePeriod'    |
    'dateTimePeriod'|
    'range'         |
    'location'      |
    'area'          |
    'link'          