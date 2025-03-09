// Media arrays
const audioFiles = [
    "assets/audio/banana.wav" /*banana*/,
    "assets/audio/carrot.wav" /*carrot*/,
    "assets/audio/end_practice.wav" /*end practice*/,
    "assets/audio/hat.wav" /*hat*/,
    "assets/audio/monkey.wav" /*monkey*/,
    "assets/audio/practice_intro.mp3" /*practice intro*/,
    "assets/audio/worm.wav" /*worm*/
];
const imageFiles = [
    "assets/images/ball_green.png" /*green balls*/,
    "assets/images/basket.png" /*basket*/,
    "assets/images/banana.png" /*banana*/,
    "assets/images/carrot.png" /*carrot*/,
    "assets/images/dog.png" /*dog*/,
    "assets/images/egg.png" /*egg*/,
    "assets/images/icecream.png" /*ice cream*/,
    "assets/images/cone.png" /*ice cream cone*/,
    "assets/images/monkey.png" /*monkey*/,
    "assets/images/spoon.png" /*spoon*/,
    "assets/images/hat.png" /*hat*/,
    "assets/images/worm.png" /*worm*/,
    "assets/images/bed.png" /*bed*/,
    "assets/images/chair.png" /*chair*/,
    "assets/images/tablet.png" /*tablet*/,
    "assets/images/ribbon.png" /*ribbon*/
];

// Preload media
function preloadMediaWithProgress(callback) {
    const totalFiles = audioFiles.length + imageFiles.length;
    let loadedFiles = 0;

    function updateProgress() {
        loadedFiles++;
        if (loadedFiles === totalFiles && callback) {
            callback();
        }
    }

    audioFiles.forEach((audioUrl) => {
        const audio = new Audio();
        audio.src = audioUrl;
        audio.preload = "auto";
        audio.oncanplaythrough = updateProgress;
        audio.onerror = () => console.error(`Failed to load audio: ${audioUrl}`);
    });

    imageFiles.forEach((imageUrl) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = updateProgress;
        image.onerror = () => console.error(`Failed to load image: ${imageUrl}`);
    });
}

// Page navigation logic
let currentPage = 1;

document.getElementById('start-button').addEventListener('click', function () {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';
    preloadMediaWithProgress(() => {
        document.getElementById('game-container').style.display = 'block';
        loadInstructionPage();
    });
});

// Handle next page navigation
function handleNextPage() {
    // Move to the next page
    currentPage++;
    if (currentPage === 2) {
        console.log("Loading Hand Tablet page...");
        loadInstructionPage();
    } else if (currentPage === 3) {
        console.log("Loading instruction video...");
        loadTrials();
    } else if (currentPage === 4) {
        console.log("Loading test trials...");
        loadFinishedPage();
    } else {
        console.error("no more pages to load");
    }

}

// Function to load the Instruction Page
function loadInstructionPage() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";

    const instructionPageContainer = document.createElement("div");
    instructionPageContainer.classList.add("instruction-page-container");

    const tabletImage = document.createElement("img");
    tabletImage.src = "assets/images/tablet.png"; 
    tabletImage.style.display = "block";
    tabletImage.width = 350;
    tabletImage.height = 400;
    tabletImage.style.margin = "0 auto";

    const instructionAudio = document.createElement("audio");
    instructionAudio.src = "assets/audio/practice_intro.mp3";
    instructionAudio.autoplay = true;
    instructionAudio.controls = false;

    instructionPageContainer.appendChild(tabletImage);
    instructionPageContainer.appendChild(instructionAudio);

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", () => {
        loadTrials();
    });

    instructionPageContainer.appendChild(nextButton);
    gameContainer.appendChild(instructionPageContainer);
}

// Trial stimuli
const trialStimuli = [
    {
        id: "hat",
        audio: "assets/audio/hat.wav",
        options: [
            { src: "assets/images/hat.png", value: "hat" }
        ],
        correct: "hat"
    },
    {
        id: "carrot",
        audio: "assets/audio/carrot.wav",
        options: [
            { src: "assets/images/carrot.png", value: "carrot",  width: 50, height: 100 }
        ],
        correct: "carrot"
    },
    {
        id: "monkey",
        audio: "assets/audio/monkey.wav",
        options: [
            { src: "assets/images/monkey.png", value: "monkey", width: 80, height: 120 },
            { src: "assets/images/ball_green.png", value: "ball" },
            { src: "assets/images/basket.png", value: "basket" },
            { src: "assets/images/bed.png", value: "bed" }
        ],
        correct: "monkey"
    },
    {
        id: "worm",
        audio: "assets/audio/worm.wav",
        options: [
            { src: "assets/images/spoon.png", value: "spoon", width: 40, height: 100 },
            { src: "assets/images/worm.png", value: "worm" }
        ],
        correct: "worm"
    },
    {
        id: "banana",
        audio: "assets/audio/banana.wav",
        options: [
            { src: "assets/images/dog.png", value: "dog" },
            { src: "assets/images/egg.png", value: "egg" },
            { src: "assets/images/banana.png", value: "banana" },
            { src: "assets/images/icecream.png", value: "ice cream", width: 75, height: 100 }
        ],
        correct: "banana"
    },
    
];

// Function to load trials
function loadTrials() {
    console.log("Starting trials...");
    loadTrial(0);
}

// Function to load a trial
function loadTrial(index) {
    if (index >= trialStimuli.length) {
        console.log("Test completed!");
        return;
    }

    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const trialData = trialStimuli[index];

    const trialContainer = document.createElement("div");
    trialContainer.classList.add("trial-container");

    // Play audio
    const audioElement = document.createElement("audio");
    audioElement.src = trialData.audio;
    audioElement.autoplay = true;
    trialContainer.appendChild(audioElement);

    // Radio container
    const radioContainer = document.createElement("div");
    radioContainer.id = `radio-container-${index}`; // Ensure a unique ID for each trial
    radioContainer.classList.add("radio-container");

    // Generate image-based radio buttons for this trial
    trialData.options.forEach((option) => {
    const label = document.createElement("label");
    label.style.display = "inline-block"; // Ensure images and radios are inline
    label.style.margin = "20px"; // Add spacing between options

    const img = document.createElement("img");
    img.src = option.src;
    img.alt = option.value;
    img.style.width = "100px";  // Set image size
    img.style.height = "100px";
    img.style.display = "block";
    img.style.cursor = "pointer"; // Make it look clickable

    // Override with custom size if specified
    if (option.width) img.style.width = `${option.width}px`;
    if (option.height) img.style.height = `${option.height}px`;

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `trial-options-${trialData.id}`; // Unique name per trial (remains the same)
    radio.value = option.value;
    radio.style.marginTop = "5px";

    // Automatically move to the next page when the correct answer is selected
    radio.addEventListener("change", () => {
        if (radio.value === trialData.correct) {
            console.log("Correct answer selected!");
            // Check if it's the last trial
            if (index + 1 < trialStimuli.length) {
                // Automatically move to the next trial
                loadTrial(index + 1);
            } else {
                // If it's the last trial, show the Next button
                console.log("Last trial completed, click Next to finish.");
                nextButton.style.display = "block";  // Show the Next button
            }
        }
    });

    label.appendChild(img); 
    label.appendChild(radio);
    radioContainer.appendChild(label);
});

trialContainer.appendChild(radioContainer);

    // Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add("nav-button", "next");
    nextButton.addEventListener("click", () => {
        if (index + 1 < trialStimuli.length) {
            // Move to the next trial
            loadTrial(index + 1);
        } else {
            // All trials completed, load the finished page
            console.log("All trials completed!");
            loadFinishedPage();
        }
    });

    trialContainer.appendChild(nextButton);
    gameContainer.appendChild(trialContainer);
}

function loadFinishedPage() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";

    const finishedPageContainer = document.createElement("div");
    finishedPageContainer.classList.add("finished-page-container");

    const ribbonImage = document.createElement("img");
    ribbonImage.src = "assets/images/ribbon.png"; 
    ribbonImage.style.display = "block";
    ribbonImage.width = 200;
    ribbonImage.height = 300;
    ribbonImage.style.margin = "0 auto";

    const endPracticeAudio = document.createElement("audio");
    endPracticeAudio.src = "assets/audio/end_practice.wav";
    endPracticeAudio.autoplay = true;
    endPracticeAudio.controls = false;

    finishedPageContainer.appendChild(ribbonImage);
    finishedPageContainer.appendChild(endPracticeAudio);

    gameContainer.appendChild(finishedPageContainer);
}