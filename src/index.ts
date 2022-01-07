/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})
WA.room.onLeaveZone('clock', closePopUp);

WA.room.onEnterZone('WelcomeMessagePopup', () => {
    currentPopup =  WA.ui.openPopup("WelcomeMessage","Welcome to our new Common Area!",[{
        label: "Close",
        className: "normal",
        callback: (popup) => {
            popup.close();
        }
    }]);
})
WA.room.onLeaveZone('WelcomeMessagePopup', closePopUp);

WA.room.onEnterZone('OwlyBase', () => {
    currentPopup =  WA.ui.openPopup("owlyBasePopup","OwlyBase is just one click away",[{
        label: "Open Owly Base",
        className: "normal",
        callback: () => {
            WA.nav.openTab('https://confluence.signavio.com/x/KodNB')
        }
    }]);
})
WA.room.onLeaveZone('OwlyBase', closePopUp);


function closePopUp(){
    if (currentPopup !== undefined) {
        // Close the popup when the "Close" button is pressed
        currentPopup.close();
        currentPopup = undefined;
    }
}
