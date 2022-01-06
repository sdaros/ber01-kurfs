/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

// Pat´s Test
// AUSGEBLENDET BY PAT
/*
// Testnew popup


// Open the popup when we enter a given zone

/* helloWorldPopup = WA.room.onEnterLayer("WelcomeMessagePopup").subscribe(() => {
    WA.ui.openPopup("WelcomeMessage", 'Welcome to our new Common Area!', [{
        label: "Close",
        className: "primary",
        callback: (popup) => {
            // Close the popup when the "Close" button is pressed.
            popup.close();
        }
    }]);
});

// Close the popup when we leave the zone.


*/
// Ab hier der orignale Teil

// Original unterhalb
let currentPopup: any = undefined;
let helloWorldPopup: string;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveZone('clock', closePopUp);

helloWorldPopup = WA.room.onEnterLayer("WelcomeMessagePopup").subscribe(() => {
    WA.ui.openPopup("WelcomeMessage", 'Welcome to our new Common Area!', [{
        label: "Close",
        className: "primary",
        callback: (popup) => {
            // Close the popup when the "Close" button is pressed.
            popup.close();
        }
    }]);
});

WA.room.onLeaveLayer("WelcomeMessage").subscribe(() => {
    helloWorldPopup.close();
})

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
