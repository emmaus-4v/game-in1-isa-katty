

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

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten
var leven = 3; // aantal leven

const space = 32; // toetsenbord space 
const leftArrow = 37; // toetsenbord left 
const rightArrow = 39; // toetsenbord right 
const upArrow = 38; // toetsenbord up 
const enter = 13; // enter toets up 

var scoreElem; // score element op het scherm
var levenElem; // leven element op het scherm

var speler; // speler

var munten; // munten
var obstakels; // obstakels
var pieken; // pieken
var doel; // doel

const GRAVITY = 0.1 // zwartekracht
var grond; // grond

// fotos
var groundImg;
var bgImg;
var spikeImg;
var doelImg;
var muntImg;
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
        munt.addImage(muntImg)
    })
}


/**
 * teken de obstakels
 */
var creeerObstakels = function () {
    obstakels.add(createSprite(400, 478, 100, 150));
    obstakels.add(createSprite(600, 425, 100, 250));
    obstakels.add(createSprite(800, 378, 100, 350));

    obstakels.forEach((obstakel, i) => {
        // voeg obstakel foto toe op basis van naam en array index
        let obstakelImg = loadImage('assets/obstakel' + i + '.png');
        obstakel.addImage(obstakelImg)
        obstakel.immovable = true // obstakel zijn niet beweegbaar

        // teken een piek voor elke obstakel behalve de laatste
        if (i != obstakels.size() - 1) {
            let piek = createSprite(obstakel.position.x + 100, 513, 50, 50)
            piek.addImage(spikeImg)
            pieken.add(piek)
        }
    })
};

/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function (x, y) { };


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function () { };


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function () { };


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
function checkGameOver() {
    if (leven <= 0) {
        return true;
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
 * actie als speler een piek raak
 */
function piekGeraak() {
    // verminder score
    score -= 1

    // verminder leven
    leven -= 1

    // zet speler op begin locatie
    resetSpeler()
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
 * Zoekt uit of speler gescroord heeft of dood ging
 */
var checkScoreEnLeven = function () {
    // score aanpassen als speler een munt aanraak
    speler.overlap(munten, muntGeraak);

    // speler is bij doel
    speler.overlap(doel, spelerBijDoel);

    // speler is gevalen tussen de obstakels
    speler.overlap(pieken, piekGeraak);

    // update score en elven
    scoreElem.html('Score: ' + score)
    levenElem.html('Leven: ' + leven)
};

/**
 * speler is bij doel
 */
function spelerBijDoel() {
    score += 5
    // als speler doel heeft bereik creeer munten opnieuw
    creeerMunten()
    resetSpeler()
}

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
    spikeImg = loadImage('assets/spike.png');
    doelImg = loadImage('assets/end.png');
    muntImg = loadImage('assets/munt.png');
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

    // toon leven
    levenElem = createP('Leven:').position(550, 0)
        .style('color: black').style('font-size', '24px')
        .style('font-weight: bold')

    // creeer speler 
    speler = createSprite(210, 480, 90, 90);
    speler.addImage(spelerImg)

    // voeg variable jumping toe aan speler om te bepalen of de speler kan springen
    // dit zorg ervoor dat de speler maar 1 keer kan springen
    speler.jumping = false

    // creeer munten
    munten = new Group();
    creeerMunten()

    // creeer obstakels
    pieken = new Group();
    obstakels = new Group();
    creeerObstakels()

    // teken doel
    doel = createSprite(1100, 445, 300, 300)
    doel.addImage(doelImg)
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
 *  verberg score en leven
 */
function verBergScoreEnLeven() {
    scoreElem.style('visibility: hidden;');
    levenElem.style('visibility: hidden;');
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
            text('Gebruik pijltjes toets om te bewegen', 420, 300, 500, 500)
            text('Spatie of pijltje omhoog om te springen', 400, 400, 700, 500)
            text('Klik enter om te starten', 500, 500, 500, 500)

            verBergScoreEnLeven();

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
            levenElem.style('visibility: visible;')

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

            // check score en leven
            checkScoreEnLeven()

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

            // uitleg teksten
            textSize(30)
            fill(255, 255, 255, 255);
            textAlign(CENTER);
            text('GAME OVER!', 420, 300, 500, 500)
            text('Klik enter om naar uitlegscherm te gaan', 420, 500, 500, 500)

            verBergScoreEnLeven()

            // reset score en leven en ga terug naar uitlegscherm
            if (keyIsDown(enter)) {
                spelStatus = UITLEG
                leven = 3
                score = 0
            }

            break;
    }
}

