/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The function below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
async function extendedFeatures() {
    try {
        await bootstrapExtra()
        console.log('Scripting API Extra loaded successfully');
    } catch (error) {
        console.error('Scripting API Extra ERROR',error);
    }
}
extendedFeatures();


// Manage popups
let currentZone: string;
let currentPopup: any;
const config = [
    {
        zone: 'loungeEntrance',
        message: 'Welcome to our new office, BER01!',
        cta: [],
    },
    {
        zone: 'owlyBase',
        message: 'The OwlyBase is just one click away',
        cta: [
            {
                label: 'Open OwlyBase',
                className: 'normal',
                callback: () => WA.nav.openTab('https://confluence.signavio.com/x/KodNB'),
            },
        ]
    }
];
WA.room.onEnterZone('clock', () => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    currentPopup = WA.ui.openPopup('clockPopup', "It's " + time, []);
});
WA.room.onLeaveZone('clock', closePopup);

WA.room.onEnterZone('loungeEntrance', () => openPopup('loungeEntrance'));
WA.room.onLeaveZone('loungeEntrance', closePopup);

WA.room.onEnterZone('owlyBase', () => openPopup('owlyBase'));
WA.room.onLeaveZone('owlyBase', closePopup);

// Popup management functions
function openPopup(zoneName: string) {
    currentZone = zoneName
    const popupName = zoneName + 'Popup'
    const zone = config.find((item) => {
        return item.zone == zoneName
    });
    if (typeof zone !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta)
    }
}
function closePopup(){
    if (typeof currentPopup !== 'undefined') {
        currentPopup.close();
        currentPopup = undefined;
    }
}
