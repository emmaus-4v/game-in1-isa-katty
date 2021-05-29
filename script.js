

/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 200; // (begin)x-positie van speler
var spelerY = 450; // (begin)y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten
const Space = 32; // toetsenbord space 

var gravity = 0.1;
var ySpeed = 0;




/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
    fill("green");
    rect(20, 550, 1240, 200);
    rect(350, 400, 100, 150);
    rect(550, 300, 100, 250);
    rect(750, 200, 100, 350);
    fill("white");
    rect(1100, 350, 10, 200);
    rect(1130, 350, 20, 100);
    rect(1170, 350, 20, 100);
    rect(1210, 350, 20, 100);
    fill("black")
    rect(1110, 350, 20, 100);
    rect(1150, 350, 20, 100);
    rect(1190, 350, 20, 100);

};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function (x, y) {


};

/**
 * tekent de munten
 */
var tekenMunten = function () {
    fill("yellow");
    ellipse(50, 50, 60, 60);
};

/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function (x, y) {
};


/**
 * Tekent de speler
 */
var tekenSpeler = function () {
    fill("white");
    rect(spelerX, spelerY, 100, 100);
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function () {

};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function () {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function () {

    if (keyIsPressed) {
        /* springen naar aanleiding van toetsen */
        if ((keyIsDown(38) || keyIsDown(Space)) && spelerY >= height - 270) {
            ySpeed -= 7
        }

        if (keyIsDown(37)) {
            spelerX -= 2;
        }
        if (keyIsDown(39)) {
            spelerX += 2;
        }

    }
};

/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function () {
    return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function () {
    return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function () {
    return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
    // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
    createCanvas(1280, 720);
};


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */

function draw() {
    switch (spelStatus) {
        case SPELEN:
            // Kleur de achtergrond blauw, zodat je het kunt zien
            background('blue');
            tekenVeld();
            tekenSpeler()

            // gravity
            ySpeed += gravity;
            spelerY += ySpeed;
            /* beperkt beweging tot veld */
            spelerY = constrain(spelerY, 0, height - 270);
            spelerX = constrain(spelerX, 20, width - 120);

            beweegSpeler();

            if (checkVijandGeraakt()) {
                // punten erbij
                // nieuwe vijand maken
            }

            if (checkSpelerGeraakt()) {
                // leven eraf of gezondheid verlagen
                // eventueel: nieuwe speler maken
            }

            if (checkGameOver()) {
                spelStatus = GAMEOVER;
            }
            break;
    }
}





