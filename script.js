

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
const WIN = 3;
var spelStatus = SPELEN;

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten

const space = 32; // toetsenbord space 
const leftArrow = 37; // toetsenbord left 
const rightArrow = 39; // toetsenbord right 
const upArrow = 38; // toetsenbord up 
const enter = 13; // enter toets up 

var scoreElem; // score element op het scherm

var speler; // speler

var munten; // munten
var obstakels; // obstakels

const GRAVITY = 0.1 // zwartekracht
var grond; // grond

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
    // teken grond
    grond = createSprite(650, 649, 1240, 200)
    grond.shapeColor = "green"

    // teken doel
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
function tekenVijand(x, y) { };

/**
 * creeer munten
 */
function creeerMunten() {
    munten.add(createSprite(400, 370, 50, 50));
    munten.add(createSprite(600, 270, 50, 50));
    munten.add(createSprite(800, 170, 50, 50));

    // munten zijn geel en heeft een circle borm
    munten.forEach(munt => {
        munt.draw = function () {
            noStroke();
            fill("yellow")
            ellipse(0, 0, munt.originalWidth, munt.originalHeight)
        }
    })
}


/**
 * teken de obstakels
 */
var creeerObstakels = function () {
    obstakels.add(createSprite(400, 475, 100, 150));
    obstakels.add(createSprite(600, 425, 100, 250));
    obstakels.add(createSprite(800, 375, 100, 350));

    obstakels.forEach(obstakel => {
        obstakels.immovable = true // obstakel zijn niet beweegbaar
        obstakel.shapeColor = "#654321" // hex code voor donker bruin
    })
};

/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function (x, y) {};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function () {};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function () {};


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

        if (keyIsDown(leftArrow)) {
            speler.position.x -= 2;
        }

        if (keyIsDown(rightArrow)) {
            speler.position.x += 2;
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
    if (speler.pos.x >= 350 && speler.pos.x <= 750) {
        console.log("lose")
    }
    return false;
};

/**
 * actie als een munt geraakd is
 * 
 * @param {{}} speler de speler
 * @param {{}} geraakteMunt de geraakte munt
 */
function muntGeraak(speler, geraakteMunt) {
    // verwijder munt
    geraakteMunt.remove()
    // pas score aan met +1
    score++;
}

/**
 * zet speler op origineel positie
 */
function resetSpeler() {
    speler.jumping = false // speler kan weer springen
    speler.position.x = 200
    speler.position.y = 450
}

/**
 * Zoekt uit of speler gescroord heeft
 */
var checkGescore = function () {
    // score aanpassen als speler een munt aanraak
    speler.overlap(munten, muntGeraak);

    // speler is bij doel
    if (speler.position.x >= 1075 && speler.position.y >= 350) {
        score += 5
        creeerMunten()
        resetSpeler()
    }

    // speler is gevalen
    if (speler.position.x >= 350 && speler.position.x <= 750 && speler.position.y >= 500) {
        score -= 1
        resetSpeler()
    }

    // update score
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

    // toon score
    scoreElem = createP('Score:').position(900, 0).style('color: white')

    // creeer speler 
    speler = createSprite(210, 460, 90, 90);
    speler.shapeColor = "white"
    speler.jumping = false

    // creeer munten
    munten = new Group();
    creeerMunten()

    // creeer obstakels
    obstakels = new Group();
    creeerObstakels()
};

/**
 * laat speler springen als het iets aanraak
 */
function kanSpringen() {
    if (speler.touching.bottom == true) {
        speler.jumping = false;
    }
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    switch (spelStatus) {
        case UITLEG:
            textSize(30)
            text('Gebruik pijltjes toets om te bewegen', 420, 300, 500, 500)
            text('Spatie of pijltje omhoog om te springen', 400, 400, 700, 500)
            text('Klik enter om te starten', 500, 500, 500, 500)
            if (keyIsDown(enter)) {
                spelStatus = SPELEN
            }
            break;
        case SPELEN:
            // Kleur de achtergrond blauw, zodat je het kunt zien
            background('blue');
            // teken veld
            tekenVeld();

            // zwartekracht
            speler.velocity.y += GRAVITY
            speler.position.y += speler.velocity.y;

            // beperk speler beweging binnen canvas
            speler.position.y = constrain(speler.position.y, 0, height - 215);
            speler.position.x = constrain(speler.position.x, 70, width);

            // zet aanraking met grond 
            speler.collide(grond)
            // laat speler springen als speler op de grond is
            kanSpringen()

            // zet aanraking met obstakels 
            speler.collide(obstakels);
            // laat springen speler op een obstacle sta
            kanSpringen()

            // beweging controles voor speler
            beweegSpeler();

            // check of speler iets gescore heeft
            checkGescore()

            // teken spelers, obstakel, grond en munten
            drawSprites();

            if (checkWin()) {
                spelStatus = WIN;
            }
            if (checkGameOver()) {
                spelStatus = GAMEOVER;
            }
            break;
    }
}