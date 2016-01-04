// import sounds
var soundJump = new Audio("sounds/wing.ogg");
var soundScore = new Audio("sounds/point.ogg");
var soundHit = new Audio("sounds/hit.ogg");
var soundDie = new Audio("sounds/die.ogg");
var soundSwoosh = new Audio("sounds/swooshing.ogg");
var soundPowerup = new Audio("sounds/powerup.ogg");
var sounds_max = 10; // number of sounds
var sound_length = 1000;
audiosounds = new Array();
for (i = 0; i < sounds_max; i++) { // prepare the channels
    audiosounds[i] = new Array();
    audiosounds[i]['sounds'] = new Audio(); // create a new audio object
    audiosounds[i]['finished'] = -1; // expected end time for this channel
}

/** This function plays preloaded sounds
* param {string} s - variable name of audio to be played
*/
function play_sound(s) {
    for (i = 0; i < audiosounds.length; i++) {
        thistime = new Date();
        if (audiosounds[i]['finished'] < thistime.getTime()) { // is this channel finished?
            audiosounds[i]['finished'] = thistime.getTime() + s.duration * sound_length;
            audiosounds[i]['sounds'].src = s.src;
            audiosounds[i]['sounds'].load();
            audiosounds[i]['sounds'].play();
            break;
        }
    }
}