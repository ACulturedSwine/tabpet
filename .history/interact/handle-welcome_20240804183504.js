import { isSpecialDay } from '/utils/date.js';
import { openedToday, getTimeOfDay } from '/utils/date.js';

export default function handleWelcome(pet) {
    const specialDay = isSpecialDay();
    if (specialDay) {
        pet.specialDay(specialDay);
    }
    else if (!openedToday()) {
        const timeOfDay = getTimeOfDay();
        pet.welcome(timeOfDay);
    }
    else {
        randomEmote();
    }
}