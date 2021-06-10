

/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

// https://molleindustria.github.io/p5.play/
// https://happycoding.io/tutorials/processing/collision-detection

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
const WIN = 3;
var spelStatus = SPELEN;

var score = 0; // aantal behaalde punten

const space = 32; // toetsenbord space 
const upArrow = 38; // toetsenbord up 
const enter = 13; // enter toets up 

var scoreElem; // score element op het scherm

var speler; // speler

var obstakels; // obstakels

const GRAVITY = 0.1 // zwartekracht
var grond; // grond

// fotos
var groundImg;
var bgImg;
var spelerImg;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
    // background('blue');
    // Achtergrond plaatje
    image(bgImg, 0, 0, width, height);

    // teken grond
    image(groundImg, 0, 450, 1240, 200);
};

/**
 * teken de obstakels
 */
var creeerObstakels = function () {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Update speler coordinaten
 */
var beweegSpeler = function () {
    if (keyIsPressed) {
        /* springen naar aanleiding van toetsen */
        if ((keyIsDown(upArrow) || keyIsDown(space)) &&
            speler.jumping == false // springen niet mogelijk als speler al aan het springen is
        ) {
            speler.velocity.y = -4 // spring hoogte
            speler.jumping = true // speler is aan het springen
        }
    }
};

/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
function checkGameOver() {
    return false;
};

/**
 * Zoekt uit of speler gescroord heeft of dood ging
 */
var checkScore = function () {
    // update score en elven
    scoreElem.html('Score: ' + score)
};

/**
 * Zoekt uit of speler gewonnen heeft
 * @returns {boolean} true als speler heeft gewonnen
 */
var checkWin = function () {
    return false;
};

/**
 * preload
 * laden van bestand
 * word voor setup() 1x uitgevoerd
 */
function preload() {
    groundImg = loadImage('assets/grond.png');
    bgImg = loadImage('assets/bg.jpg');
    spelerImg = loadImage('assets/speler.png');
}


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
    // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
    createCanvas(1280, 720);
    // teken grond
    grond = createSprite(650, 649, 1240, 200)
    // grond.shapeColor = "green"
    grond.visible = false

    // toon score
    scoreElem = createP('Score:').position(750, 0)
        .style('color: black').style('font-size', '24px')
        .style('font-weight: bold')

    // creeer speler 
    speler = createSprite(210, 480, 90, 90);
    speler.addImage(spelerImg)

    // voeg variable jumping toe aan speler om te bepalen of de speler kan springen
    // dit zorg ervoor dat de speler maar 1 keer kan springen
    speler.jumping = false

    // creeer obstakels
    obstakels = new Group();
    creeerObstakels()
};

/**
 * laat speler springen als het op grond of obstakel sta
 */
function kanSpringen() {
    if (speler.touching.bottom == true) {
        speler.jumping = false;
    }
    if (speler.position.y >= height - 228) {
        speler.jumping = false;
    }
}

/**
 * teken getint achtergrond
 */
function tekenGetintAchtergrond() {
    // achtergrond plaatje
    image(bgImg, 0, 0, width, height);
    // transparant tint
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);
}

/**
 *  verberg score
 */
function verBergScore() {
    scoreElem.style('visibility: hidden;');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    switch (spelStatus) {
        case UITLEG:
            tekenGetintAchtergrond()
            // uitleg teksten
            textSize(30)
            fill(255, 255, 255, 255);
            text('Gebruik de pijltjes om het doel te bereiken en munten op te pakken', 400, 300, 500, 500)
            text('Spatie of het pijltje omhoog om te springen', 380, 400, 600, 500)
            text('Klik enter om te starten', 480, 500, 500, 500)

            verBergScore();

            // als speler op enter klik, start het spel
            if (keyIsDown(enter)) {
                spelStatus = SPELEN
            }

            break;
        case SPELEN:

            // teken veld
            tekenVeld();

            // toon score en leven
            scoreElem.style('visibility: visible;')

            // zwartekracht
            speler.velocity.y += GRAVITY
            speler.position.y += speler.velocity.y;

            // beperk speler beweging binnen canvas
            speler.position.y = constrain(speler.position.y, 0, height - 228);
            speler.position.x = constrain(speler.position.x, 70, width);

            // zet aanraking met grond 
            speler.collide(grond)

            // laat speler springen als speler op de grond is
            kanSpringen()

            // zet aanraking met obstakels
            speler.collide(obstakels);

            // laat springen speler op een obstakel sta
            kanSpringen()

            // beweging controles voor speler
            beweegSpeler();

            // check score
            checkScore()

            if (checkWin()) {
                spelStatus = WIN;
            }
            if (checkGameOver()) {
                spelStatus = GAMEOVER;
            }

            // teken spelers, obstakel, grond en munten
            drawSprites();

            break;
        case GAMEOVER:
            // Achtergrond plaatje
            tekenGetintAchtergrond();

            // dark overlay
            fill(0, 0, 0, 100);
            rect(0, 0, width, height);

            // draw game over text
            textAlign(CENTER);
            textSize(50);
            fill(255);
            text('GAME OVER!', width / 2, height / 3);

            textSize(20);
            text('Press ENTER to play again.', width / 2, height / 2);
            text('Score: ' + score, width / 2, height / 1.5);

            // reset score en leven en ga terug naar uitlegscherm
            if (keyIsDown(enter)) {
                spelStatus = UITLEG
                score = 0
            }

            break;
    }
}

