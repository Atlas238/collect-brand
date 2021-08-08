// Time Variables For Demo!
const numHoursHunger = 1;
const numHoursHappiness = 3;
const numHoursGrooming = 5;
const numHoursEnergy = 1;

// CreatureID, UserID
const updateCreatureId = document.getElementById('icon').getAttribute('data-id')
const userID = document.getElementById('icon').getAttribute('data-user');
// Creature Icon and Holder
const icon = document.getElementById('icon');
const iconDiv = document.getElementById('icon-holder');
// Buttons
const catchBtn = document.getElementById('catchBtn');
const feedBtn = document.getElementById('feedBtn');
const petBtn = document.getElementById('petBtn');
//host
const host = 'http://localhost:3001';
let notSyncing = true; //Is set to false when the player interacts with their creature, so the autosync will not run

const currentCreature = {
    id: 0,
    hunger: 0,
    happiness: 0,
    grooming: 0,
    energy: 0,
    lastinteraction: new Date(),
};

const adjustCreatureStats = (currentStats) => {
    console.log(currentStats.lastinteraction);
    const dbTime = moment(currentStats.lastinteraction);
    let currentTime = moment();
    let diffInTime = currentTime.diff(dbTime,'hours');
    diffInTime = diffInTime < 0 ? 0 : diffInTime;
    console.log(`DB Time: ${dbTime}`);
    console.log(`Current Time: ${currentTime}`);
    console.log(diffInTime);

    // // Check and degrade values...
    // // Delete
    // if (diffInTime > numHoursHunger) {
    //     const valueDecrease = Math.floor(diffInTime/numHoursHunger);
    //     if(currentStats.hunger - valueDecrease > 0) {
    //         currentStats.hunger -= valueDecrease;
    //     } else {
    //         currentStats.hunger = 0;
    //     }
    // }
    if (diffInTime > numHoursHappiness) {
        const valueDecrease = Math.floor(diffInTime/numHoursHappiness);
        if(currentStats.happiness - valueDecrease > 0) {
            currentStats.happiness -= valueDecrease;
        } else {
            currentStats.happiness = 0;
        }
    }
    // if (diffInTime > numHoursGrooming) {
    //     const valueDecrease = Math.floor(diffInTime/numHoursGrooming);
    //     if(currentStats.grooming - valueDecrease > 0) {
    //         currentStats.grooming -= valueDecrease;
    //     } else {
    //         currentStats.grooming = 0;
    //     }
    // }
    // if (diffInTime > numHoursEnergy) {
    //     const valueDecrease = Math.floor(diffInTime/numHoursEnergy);
    //     if(currentStats.energy - valueDecrease > 0) {
    //         currentStats.energy -= valueDecrease;
    //     } else {
    //         currentStats.energy = 0;
    //     }
    // }
};

const init = async () => {
    try {
        const loadStats = await fetch(`${host}/creature/care/${updateCreatureId}`,{method: 'GET',}).then(resp => resp.json());
        adjustCreatureStats(loadStats);
        currentCreature.id = loadStats.id;
        currentCreature.hunger = loadStats.hunger;
        currentCreature.happiness = loadStats.happiness;
        currentCreature.grooming = loadStats.grooming;
        currentCreature.energy = loadStats.energy;
        currentCreature.lastinteraction = loadStats.lastinteraction; //last interaction is updated when one of the btns is pressed
        console.log("Starting Stats Interval");
        // updateStats();
        console.log("Syncing with database")
        // startDbAutoSync();
        renderHunger(currentCreature.hunger);
    } catch (err) {
        console.log(err);
    }
};

const updateStats = async () => {
    const updateInterval = setInterval(() => {
        adjustCreatureStats(currentCreature);
        console.log(currentCreature);
        // Render Creature Stats
    },1000*60*60);
};

// Database gets updated every minute
const startDbAutoSync = () => {
    const syncInterval = setInterval(() => {
        if(notSyncing){
            console.log("Auto Sync");
            updateDatabase();
        }
    },1000*5);
}

const renderMeters = (maxValue,currValue,icon) => {
    const happyMeter = document.querySelector('#happy-meter');
    const emptyHearts = 4 - value;
    happyMeter.textContent = '';

}

const renderHunger = (value) => {
    const hungerMeter = document.querySelector("#hunger-meter");
    const emptyLemons = 4 - value;
    hungerMeter.textContent = '';
    for(let i = 0; i < value ; i++){
        const lemon = document.createElement("i");
        lemon.setAttribute("class","fa-solid fa-lemon");
        hungerMeter.append(lemon);
    }
    for(let i = 0; i < emptyLemons ; i++){
        const emptyLemon = document.createElement("i");
        emptyLemon.setAttribute("class","fa-regular fa-lemon");
        hungerMeter.append(emptyLemon);
    }
}

// const renderGrooming = () => {
    
// }

// const renderEnergy = () => {
    
// }

// // CATCH WITH CREATURE
// const catchCreature = (id) => {
//     try {
//         fetch(`http://localhost:3001/creature/care/${id}`, {
//             method: 'GET',
//         }).then((response) => {
//            return response.json();
//         }).then((carestats) => {
//             // Now have our carestat obj...
//             if (carestats.energy > 0) {
//                 let updatedHappinessVal = carestats.happiness++;
//                 let updatedEnergyVal = carestats.energy--;
//                 try {
//                     fetch(`http://localhost:3001/creature/care/${id}`, {
//                         method: 'PUT',
//                         body: {
//                             happiness: updatedHappinessVal,
//                             energy: updatedEnergyVal,
//                         }
//                     }).then((response) => {
//                         return response.json();
//                     }).then((data) => {
//                         console.log(data);
//                     });
//                 } catch (error) {console.log(error)}
//             };
//         });
//     } catch (error) {console.log(error)};
// };

// // FEED CREATURE SCRIPT
// const feedCreature = (id) => {

//     try {
//         fetch(`http://localhost:3001/creature/care/${id}`, {
//             method: 'GET'
//         })
//         .then((response) => {
//             return response.json()
//         })
//         .then((carestats) => {

//             console.log('Receieved Carestats for creature...');
//             console.log(carestats);

//             if(carestats.energy > 0) {
//                 if (carestats.hunger < 4) {
//                     let newHungerVal = carestats.hunger + 1;
//                     let newEnergyVal = carestats.energy - 1;
//                     console.log('New Hunger and Energy Values...');
//                     console.log(newHungerVal);
//                     console.log(newEnergyVal);
//                     try {
//                         fetch(`http://localhost:3001/creature/care/${id}`, {
//                             method: 'PUT',
//                             body: {
//                                 hunger: newHungerVal,
//                                 energy: newEnergyVal,
//                             },
//                         }).then((response) => {
//                             return response.json()
//                         }).then((data) => {
//                             console.log('Creature carestats Updated');
//                             console.log(data);
//                         });
//                     } catch (error) {
//                         console.log('Error in updating carestats');
//                         console.log(error);
//                     };
//                 };
//             };
//         });
//     } catch (error) { console.log('Error getting data from the database') };
// };

// // PET CREATURE
// const petCreature = (id) => {
//     try {
//         fetch(`http://localhost:3001/creature/care/${id}`, {
//             method: 'GET'
//         }).then((response) => {
//             console.log(response);
//             return response.json();
//         }).then((carestats) => {
//             console.log('Current carestats recieved...');
//             console.log(carestats);
//             // Now have carestat obj...
//             if (carestats.energy > 0) {

//                 let updatedGroomingVal = carestats.grooming++;
//                 let updatedEnergyVal = carestats.energy--;

//                 try {
//                     fetch(`http://localhost:3001/creature/care/${id}`, {
//                         method: 'PUT',
//                         body: {
//                             grooming: updatedGroomingVal,
//                             energy: updatedEnergyVal,
//                         },
//                     }).then((response) => {
//                         return response.json();
//                     }).then((data) => console.log(data));
//                 } catch (error) { console.log(error) };
//             };
//         });
//     } catch (error) { console.log(error) };
// };

// // updateCreatureStats(updateCreatureId, userID);

const updateDatabase = async () => {
    // If id is 0 then the creature was not loaded properly
    if(currentCreature.id !== 0){
        console.log('Syncing now');
        try{
            const updateSql = await fetch(`${host}/creature/care/${updateCreatureId}`, {
                method: 'PUT',
                body: JSON.stringify(currentCreature),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const respData = await updateSql.json();

            if(respData.message){
                console.log("Data backed up on the super secret cloud");
            } else {
                console.log("Data not backed up... :'(");
            }
        } catch (error){
            console.log(error);
        }
    } else {
        // clearInterval(syncInterval);
        console.log(currentCreature.id);
    }
};

// Interaction Event Listeners
petBtn.addEventListener('click', (event) => {
    event.preventDefault();
    currentCreature.hunger++;
    currentCreature.lastinteraction=moment().format('YYYY-MM-DDTHH:mm:ss');
    updateDatabase();
    renderHunger(currentCreature.hunger);
});
feedBtn.addEventListener('click', (event) => {
    event.preventDefault();
    currentCreature.hunger++;
    currentCreature.lastinteraction=moment().format('YYYY-MM-DDTHH:mm:ss');
    updateDatabase();
    renderHunger(currentCreature.hunger);
});
// catchBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     catchCreature(updateCreatureId);
//     updateCreatureStats(updateCreatureId, userID);
// });

init();