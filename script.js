

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
var spelStatus = UITLEG;

var score = 0; // aantal behaalde punten

const space = 32; // toetsenbord space 
const upArrow = 38; // toetsenbord up 
const enter = 13; // enter toets up 

var scoreElem; // score element op het scherm

var speler; // speler

var obstakels; // obstakels

const GRAVITY = 0.2 // zwartekracht
var grond; // grond

// fotos
var groundImg;
var bgImg;
var obstakelImg;
var spelerImg;

var volgendeObstakelAfstand;
var minObstakelAfstand = 500;

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
 * Kijkt wat de toetsen/muis etc zijn.
 * Update speler coordinaten
 */
var beweegSpeler = function () {
    if (keyIsPressed) {
        /* springen naar aanleiding van toetsen */
        if ((keyIsDown(upArrow) || keyIsDown(space)) &&
            speler.jumping == false // springen niet mogelijk als speler al aan het springen is
        ) {
            speler.velocity.y = -5.5 // spring hoogte
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
    obstakelImg = loadImage('assets/obstakel.png');
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

    // creeer obstakels groep
    obstakels = new Group();
};

/**
 * laat speler springen als het op grond sta
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
    // zwarte tint
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
 *  Gameover
 */
function gameOver() {
    obstakels.removeSprites()
    resetSpeler()
    spelStatus = GAMEOVER
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
 * creeer obstakel
 */
function creeerObstakel() {
    // obstakel grote
    const obstakelGrote = random(2, 5);
    // creeer obstakel
    const obstakel = createSprite(width - 100, grond.position.y - 125 - (obstakelGrote * 10 / 2));
    // voeg foto
    obstakel.addImage(obstakelImg);
    // zet grote
    obstakel.scale = obstakelGrote;
    // voeg obstakel toe aan p5.play groep
    obstakels.add(obstakel);
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

            textSize(30)
            // wit teksten
            fill(255);
            // uitleg teksten
            textAlign(CENTER);
            text('Vermijd obstakels', width / 2, height / 3)
            text('Spatie of pijltje omhoog om te springen', width / 2, height / 2)
            text('Klik enter om te starten', width / 2, height / 1.5)

            verBergScore();

            // als speler op enter klik, start het spel
            if (keyIsDown(enter)) {
                spelStatus = SPELEN
            }

            break;
        case SPELEN:

            // teken veld
            tekenVeld();

            // genereer random obstakeks. alleen generen als er 0 obstakels zijn of als de laatste obstakel verder is dan volgendeObstakelAfstand
            if (obstakels.length <= 0 || width - obstakels[obstakels.size() - 1].position.x >= volgendeObstakelAfstand) {
                creeerObstakel();
                // calculeer volgende obstakel afstand
                volgendeObstakelAfstand = random(minObstakelAfstand, width);
            }

            obstakels.forEach(obstakel => {
                // snelheid van obstakel
                obstakel.position.x -= 8;
                // verwijderd obstakel als het buiten platform komt
                if (obstakel.position.x < 75) {
                    obstakel.remove();
                    // voeg score toe
                    score++
                }
            })

            // toon score
            scoreElem.style('visibility: visible;')

            // zwartekracht
            speler.velocity.y += GRAVITY
            speler.position.y += speler.velocity.y;

            // beperk speler beweging binnen canvas
            speler.position.y = constrain(speler.position.y, 0, height - 228);
            speler.position.x = constrain(speler.position.x, 70, width);

            // zet aanraking met grond 
            speler.collide(grond)

            // zet aanraking met obstakels
            speler.collide(obstakels, gameOver);

            // kan speler weer springen?
            kanSpringen()

            // beweging controles voor speler
            beweegSpeler();

            // update score
            scoreElem.html('Score: ' + score)

            // teken spelers, obstakel en grond
            drawSprites();

            break;
        case GAMEOVER:
            tekenGetintAchtergrond();
            verBergScore();

            // teken gameover texten
            textAlign(CENTER);
            textSize(50);
            // wit tekst
            fill(255);
            text('GAME OVER!', width / 2, height / 3);

            textSize(30);
            text('Score: ' + score, width / 2, height / 2);

            textSize(20);
            text('Klik ENTER om opnieuw te beginnen.', width / 2, height / 1.5);

            // reset score en ga terug naar uitlegscherm
            if (keyIsDown(enter)) {
                score = 0
                spelStatus = UITLEG
            }

            break;
    }
}

