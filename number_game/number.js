// Arrays of media file URLs
const videoFiles = [
    "assets/videos/instructions.mp4" /*instructions*/,
    "assets/videos/apples.mp4" /*apples_ex_mp4*/,
    "assets/videos/gotit.mp4" /*gotit*/,
    "assets/videos/readytoplay.mp4" /*ready-to-play*/,
    "assets/videos/loading.mp4" /*loading*/,
    "assets/videos/it3.mp4" /*it3*/,
    "assets/videos/finished.mp4" /*finished*/,

];
const audioFiles = [
    "assets/audio/apples.wav" /*apples*/,
    "assets/audio/balloons.wav" /*balloons*/,
    "assets/audio/birds.wav" /*birds*/,
    "assets/audio/cats.wav" /*cats*/,
    "assets/audio/coins.wav" /*coins*/,
    "assets/audio/cookies.wav" /*cookies*/,
    "assets/audio/crayons.wav" /*crayons*/,
    "assets/audio/eight.wav" /*eight*/,
    "assets/audio/five.wav" /*five*/,
    "assets/audio/flowers.wav" /*flowers*/,
    "assets/audio/four.wav" /*four*/,
    "assets/audio/nine.wav" /*nine*/,
    "assets/audio/one.wav" /*one*/,
    "assets/audio/pictures.wav" /*pictures*/,
    "assets/audio/redballs.wav" /*balls*/,
    "assets/audio/seven.wav" /*seven*/,
    "assets/audio/six.wav" /*six*/,
    "assets/audio/stars.wav" /*stars*/,
    "assets/audio/ten.wav" /*ten*/,
    "assets/audio/three.wav" /*three*/,
    "assets/audio/two.wav" /*two*/,
];
const imageFiles = [
    "assets/images/balloons.png" /*balloons_number*/,
    "assets/images/birds.png" /*birds_number*/,
    "assets/images/books.png" /*books_number*/,
    "assets/images/cats.png" /*cats_number*/,
    "assets/images/coins.png" /*coins_number*/,
    "assets/images/cookies.png" /*cookies_number*/,
    "assets/images/crayons.png" /*crayons_number*/,
    "assets/images/flowers.png" /*flowers_number*/,
    "assets/images/pictures.png" /*pictures_number*/,
    "assets/images/stars.png" /*stars_number*/,
    "assets/images/balls.png" /*balls_number*/,
    "assets/images/replay.png" /*replay*/,
];

// Function to preload media with a progress bar
function preloadMediaWithProgress(callback) {
    const totalFiles = videoFiles.length + audioFiles.length + imageFiles.length;
    let loadedFiles = 0;

    // Show the progress bar
    document.getElementById('progress-container').style.display = 'block'; // Show the progress bar
    const progressFill = document.getElementById('progress-fill');

    // Function to update progress
    function updateProgress() {
        loadedFiles++;
        const progress = (loadedFiles / totalFiles) * 100;
        progressFill.style.width = `${progress}%`;

        if (loadedFiles === totalFiles) {
            // Hide the progress bar once done
            document.getElementById('progress-container').style.display = 'none';
            // Proceed to start the game
            if (callback && typeof callback === 'function') {
                callback(); // Show the first page or start the game
            }
        }
    }
    // Preload videos
    videoFiles.forEach((videoUrl) => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.preload = "auto"; // Preload the video
        video.oncanplaythrough = updateProgress;
        video.onerror = () => console.error(`Failed to load video: ${videoUrl}`);
        video.style.display = "none"; // Hide the video element
        document.body.appendChild(video); // Append to the body temporarily
    });

    // Preload audio
    audioFiles.forEach((audioUrl) => {
        const audio = document.createElement('audio');
        audio.src = audioUrl;
        audio.preload = "auto"; // Preload the audio
        audio.oncanplaythrough = updateProgress;
        audio.onerror = () => console.error(`Failed to load audio: ${audioUrl}`);
        audio.style.display = "none"; // Hide the audio element
        document.body.appendChild(audio); // Append to the body temporarily
    });

    // Preload images
    imageFiles.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl; // Set the image source
        img.onload = updateProgress;
        img.onerror = () => console.error(`Failed to load image: ${imageUrl}`);
    });
}

// Start button logic
document.getElementById('start-button').addEventListener('click', function () {
    // Show the progress bar and start media preload
    document.getElementById('start-container').style.display = 'none'; // Hide start container
    document.getElementById('game-container').style.display = 'none'; // Keep game container hidden initially
    // Start media preload before loading the game
    preloadMediaWithProgress(() => {
        // Once preloading is complete, show the game container and load the first page
        document.getElementById('game-container').style.display = 'block'; // Show game container
        loadPage(currentPage); // Load the first page of questions
    });
});

let currentPage = 1; // Track the current page
const responses = []; // Store user responses

// Array of set up questions with a page property
const questions = [
    {
        text: "1. experimenter",
        type: "mcq",
        name: "experimenter",
        options: ["ayan", "sophie", "rondeline", "other"],
        page: 1,
    },
    {
        text: "age",
        type: "mcq",
        name: "age",
        options: ["3", "4", "5", "other"],
        page: 1,
    },
    {
        text: "subject id",
        type: "free",
        name: "id",
        page: 1,
    },
    {
        text: "condition",
        type: "mcq",
        name: "condition",
        options: ["noise", "silence"],
        page: 1,
    },
    {
        text: "order",
        type: "mcq",
        name: "order",
        options: ["1", "2"],
        page: 1,
    },
];

// Function to create and add a replay button for both video and audio
function createReplayButton(mediaElement) {
    const replayButton = document.createElement("button");
    replayButton.classList.add("replay-button"); // This will automatically use the background image from CSS

    // Add event listener to replay the media when clicked
    replayButton.addEventListener("click", () => {
        mediaElement.currentTime = 0; // Reset the media to the start
        mediaElement.play(); // Play the media again
    });

    // Append the button to the media container
    const mediaContainer = mediaElement.parentElement;
    if (mediaContainer) {
        mediaContainer.appendChild(replayButton);
    } else {
        console.error("Media container not found.");
    }
}

// Function to load all questions for the current page
function loadPage(pageNumber) {
    console.log("Loading page:", pageNumber);

    const questionsForPage = questions.filter(q => q.page === pageNumber);
    console.log("Questions for currentPage:", questionsForPage);

    const questionForm = document.getElementById("question-form");
    questionForm.innerHTML = ""; // Clear previous content

    // Render all questions for the current page
    questionsForPage.forEach(question => {
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");

        // Add question text
        const questionText = document.createElement("p");
        questionText.textContent = question.text;
        questionContainer.appendChild(questionText);

        // Add options for MCQ questions
        if (question.type === "mcq") {
            question.options.forEach(option => {
                const label = document.createElement("label");
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = question.name;
                radio.value = option;

                label.appendChild(radio);
                label.appendChild(document.createTextNode(option));
                questionContainer.appendChild(label);
                questionContainer.appendChild(document.createElement("br"));
            });
        } else if (question.type === "free") {
            if (question.name === "id") {
                // Input for "subject id" with pattern validation
                const idInput = document.createElement('input');
                idInput.type = 'text';
                idInput.name = question.name;
                idInput.placeholder = "Enter Subject ID (e.g., M456)";
                idInput.pattern = "^M\\d{3}$"; // Regex to match "M" followed by 3 digits
                idInput.title = "Subject ID must start with 'M' followed by 3 digits (e.g., M123)";  // Tooltip for validation
                idInput.required = true; // Ensure the input is required
                questionContainer.appendChild(idInput);
            } else {
                // For other free-response questions, use a textarea
                const freeResponseInput = document.createElement('textarea');
                freeResponseInput.id = `${question.name}-${currentQuestionIndex}-free-response`;
                freeResponseInput.name = question.name;
                freeResponseInput.rows = 4;
                freeResponseInput.cols = 50;
                freeResponseInput.placeholder = "Type your response here";
                questionContainer.appendChild(freeResponseInput);
            }
        }

        questionForm.appendChild(questionContainer);
    });

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", handleNextPage);
    questionForm.appendChild(nextButton);

    // Create the Test button
    const testButton = document.createElement("button");
    testButton.textContent = "Test";
    testButton.id = "test-button";
    testButton.type = "button";
    testButton.classList.add("nav-button", "test-button");

    // Positioning at the bottom left
    testButton.style.position = "absolute";
    testButton.style.bottom = "20px";
    testButton.style.left = "20px";

    // When clicked, fill all answers with "test" and proceed
    testButton.addEventListener("click", () => {
    console.log("Test button clicked. Skipping individual answers.");

    // Fill responses with "test"
    questions.filter(q => q.page === currentPage).forEach(question => {
    responses.push({ question: question.text, answer: "test" });
    });

    console.log("Responses recorded:", responses);

    // Move to the next page
    handleNextPage();
    });

    // Append to the form
    questionForm.appendChild(testButton);

}

// Function to handle the Next button click
function handleNextPage() {
    console.log("Next button clicked.");

    // Check if "Test" button was clicked
    const testButtonClicked = responses.some(response => response.answer === "test");

    const questionsForPage = questions.filter(q => q.page === currentPage);
    let allAnswered = true;

    // Validate that all questions on the page are answered
    questionsForPage.forEach(question => {
        if (question.type === "mcq") {
            const selectedOption = document.querySelector(`input[name="${question.name}"]:checked`);
            if (selectedOption) {
                responses.push({ question: question.text, answer: selectedOption.value });
            } else {
                allAnswered = false;
            }
        } else if (question.type === "free" && question.name === "id") {
            const idInput = document.querySelector(`input[name="${question.name}"]`);
            if (idInput && idInput.value.trim() !== "") {
                responses.push({ question: question.text, answer: idInput.value.trim() });
            } else {
                allAnswered = false;
            }
        }
    });

    if (!allAnswered && !testButtonClicked) {
        alert("Please answer all questions before proceeding.");
        return;
    }

    console.log("Responses so far:", responses);

    // Move to the next page
    currentPage++;
    if (currentPage === 2) {
        console.log("Loading Hand Tablet page...");
        loadHandTablet();
    } else if (currentPage === 3) {
        console.log("Loading Instruction Video...");
        loadInstructionVideo();
    } else if (currentPage === 4) {
        console.log("Loading Ex1 Apples Audio...");
        loadEx1ApplesAudio();
    } else if (currentPage === 5) {
        console.log("Loading Ex1 Apples Video...");
        loadEx1ApplesVideo();
    } else if (currentPage === 6) {
        console.log("Loading Got It Video...");
        loadGotItVideo();
    } else if (currentPage === 7) {
        console.log("Loading Ex2 Cats Video...");
        loadEx2Cats();
    } else if (currentPage === 8) {
        console.log("Loading Ready Video...");
        loadReadyVideo();
    } else if (currentPage === 9) {
        console.log("Loading Video...");
        loadLoadingVideo();
    } else if (currentPage === 10) {
        console.log("Loading trials...");
        trials();
    } else if (currentPage === 10) {
        console.log("Loading trials...");
        loadFinishedVideo();    
    } else {
        console.log("No more pages.");
    }
}

// Function to load the "Hand Tablet" page
function loadHandTablet() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const handTabletContainer = document.createElement("div");
    handTabletContainer.classList.add("hand-tablet-container");

    const handTabletText = document.createElement("p");
    handTabletText.textContent = "Hand the tablet to the child";
    handTabletContainer.appendChild(handTabletText);

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";

    // When the user clicks Next, transition to Instruction Video
    nextButton.addEventListener("click", () => {
        console.log("Moving to the Instruction Video page...");
        loadInstructionVideo();  // Proceed to Instruction Video page
    });

    handTabletContainer.appendChild(nextButton);
    gameContainer.appendChild(handTabletContainer);
}

// Function to load the "Instruction Video" page
function loadInstructionVideo() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const instructionVideoContainer = document.createElement("div");
    instructionVideoContainer.classList.add("instruction-video-container");

    // Add the instruction video
    const instructionVideo = document.createElement("video");
    instructionVideo.src = "assets/videos/instructions.mp4" /*instructions*/;
    instructionVideo.autoplay = true;
    instructionVideo.width = 600;
    instructionVideo.height = 400;

    // Append the video to the container
    instructionVideoContainer.appendChild(instructionVideo);
    
    // Call the function to add the replay button
    createReplayButton(instructionVideo);

    // Add audio-based radio buttons below the video
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");

    const instructionRadioOptions = [
        { src: "assets/audio/one.wav" /*one*/, value: "1" },
        { src: "assets/audio/two.wav" /*two*/, value: "2" },
        { src: "assets/audio/three.wav" /*three*/, value: "3" },
        { src: "assets/audio/four.wav" /*four*/, value: "4" },
        { src: "assets/audio/five.wav" /*five*/, value: "5" },
        { src: "assets/audio/six.wav" /*six*/, value: "6" },
        { src: "assets/audio/seven.wav" /*seven*/, value: "7" },
        { src: "assets/audio/eight.wav" /*eight*/, value: "8" },
        { src: "assets/audio/nine.wav" /*nine*/, value: "9" },
        { src: "assets/audio/ten.wav" /*ten*/, value: "10" }

    ];

    // Loop through options and create radio buttons
    instructionRadioOptions.forEach(option => {
        const label = document.createElement("label");
        label.classList.add("radio-label"); 
        label.style.display = "flex";  
        label.style.flexDirection = "column"; 
        label.style.alignItems = "center";
        label.style.margin = "10px" 

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "instruction-radio"; // Same name ensures only one can be selected
        radio.value = option.value;

        const numberSpan = document.createElement("span");
        numberSpan.textContent = option.value;
        numberSpan.style.fontSize = "28px";
        numberSpan.style.fontWeight = "bold";
        numberSpan.style.marginBottom = "5px";

        // Play audio when selected
        radio.addEventListener("change", () => {
            const audio = new Audio(option.src);
            audio.play();
        });

        label.appendChild(numberSpan);
        label.appendChild(radio);
        radioContainer.appendChild(label);
    });

    // Append the radio container below the video
    instructionVideoContainer.appendChild(radioContainer);

    // Listen for the "ended" event to automatically advance when the instruction video finishes
    instructionVideo.addEventListener("ended", () => {
        console.log("Video ended, moving to the next page.");
        loadEx1ApplesAudio(); // Advance to the next page
    });

    // Add the Next button after the instruction video
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", () => {
        console.log("Moving beyond the Instruction Video page.");
        loadEx1ApplesAudio(); // Advance to the next page
    });

    // Append the video container to the game container
    gameContainer.appendChild(instructionVideoContainer);
    instructionVideoContainer.appendChild(nextButton);
}

// Function to load the "Example 1 Apples Video" page
function loadEx1ApplesAudio() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const ex1ApplesAudioContainer = document.createElement("div");
    ex1ApplesAudioContainer.classList.add("ex1apples-audio-container");

    // Display image
    const applesImage = document.createElement("img");
    applesImage.src = "assets/images/apples.png" /*apples*/;
    applesImage.style.maxWidth = "100%";
    applesImage.style.height = "auto";
    ex1ApplesAudioContainer.appendChild(applesImage);

    // Play audio
    const audioElement = document.createElement("audio");
    audioElement.src = "assets/audio/apples.wav" /*apples*/;
    audioElement.autoplay = true;
    ex1ApplesAudioContainer.appendChild(audioElement);

    // Call the function to add the replay button
    createReplayButton(audioElement);

    // Add audio-based radio buttons below the video
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");

    const ex1ApplesRadioOptions = [
        { src: "assets/audio/one.wav" /*one*/, value: "1" },
        { src: "assets/audio/two.wav" /*two*/, value: "2" },
        { src: "assets/audio/three.wav" /*three*/, value: "3" },
        { src: "assets/audio/four.wav" /*four*/, value: "4" },
        { src: "assets/audio/five.wav" /*five*/, value: "5" },
        { src: "assets/audio/six.wav" /*six*/, value: "6" },
        { src: "assets/audio/seven.wav" /*seven*/, value: "7" },
        { src: "assets/audio/eight.wav" /*eight*/, value: "8" },
        { src: "assets/audio/nine.wav" /*nine*/, value: "9" },
        { src: "assets/audio/ten.wav" /*ten*/, value: "10" }

    ];

    ex1ApplesRadioOptions.forEach((option) => {
        const label = document.createElement("label");
        label.style.display = "flex";
        label.style.flexDirection = "column"; // Stack items vertically
        label.style.alignItems = "center";
        label.style.margin = "10px"; // Add some spacing between options

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "audio-options"; // Group name for the radio buttons
        radio.value = option.value;
        radio.style.marginTop = "5px";

        const numberSpan = document.createElement("span");
        numberSpan.textContent = option.value;
        numberSpan.style.fontSize = "28px";
        numberSpan.style.fontWeight = "bold";
        numberSpan.style.marginBottom = "5px";

        // Create the event listener for the radio button
        radio.addEventListener("change", () => {
            // When a radio button is clicked, play the corresponding audio
            const audio = new Audio(option.src);
            audio.play();

            //Automatically move to next page if the correct answer is selected
            if (radio.value === "3") {
                console.log("Correct answer selected! Moving to the next phase.");
                loadEx1ApplesVideo(); 
            }
        });

        label.appendChild(numberSpan);
        label.appendChild(radio);
        radioContainer.appendChild(label);
    });

    ex1ApplesAudioContainer.appendChild(radioContainer);

    // Listen for the "ended" event to automatically advance when the instruction video finishes
    audioElement.addEventListener("ended", () => {
        console.log("Audio ended, moving to the next page.");
        loadEx1ApplesVideo(); // Advance to the next page
    });

    // Add the Back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.classList.add("nav-button", "back");

    backButton.addEventListener("click", () => {
        console.log("Going back to the previous page...");
        loadInstructionVideo(); // Replace with your logic to load the previous page
    });

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", () => {
        console.log("Next button clicked.");
    });

    ex1ApplesAudioContainer.appendChild(backButton);
    ex1ApplesAudioContainer.appendChild(nextButton);
    gameContainer.appendChild(ex1ApplesAudioContainer); 
}

// Function to load the "Example 1 Apples Video" page
function loadEx1ApplesVideo() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const ex1ApplesVideoContainer = document.createElement("div");
    ex1ApplesVideoContainer.classList.add("ex1apples-video-container");

    // Add the example 1 apples video
    const ex1ApplesVideo = document.createElement("video");
    ex1ApplesVideo.src = "assets/videos/apples.mp4" /*apples_ex_mp4*/;
    ex1ApplesVideo.autoplay = true;
    ex1ApplesVideo.style.display = "block";
    ex1ApplesVideo.width = 600;
    ex1ApplesVideo.height = 400;
    ex1ApplesVideoContainer.appendChild(ex1ApplesVideo);

    // Call the function to add the replay button
    createReplayButton(ex1ApplesVideo);

    // Add audio-based radio buttons below the video
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");

    const ex1ApplesRadioOptions = [
        { src: "assets/audio/one.wav" /*one*/, value: "1" },
        { src: "assets/audio/two.wav" /*two*/, value: "2" },
        { src: "assets/audio/three.wav" /*three*/, value: "3" },
        { src: "assets/audio/four.wav" /*four*/, value: "4" },
        { src: "assets/audio/five.wav" /*five*/, value: "5" },
        { src: "assets/audio/six.wav" /*six*/, value: "6" },
        { src: "assets/audio/seven.wav" /*seven*/, value: "7" },
        { src: "assets/audio/eight.wav" /*eight*/, value: "8" },
        { src: "assets/audio/nine.wav" /*nine*/, value: "9" },
        { src: "assets/audio/ten.wav" /*ten*/, value: "10" }

    ];

    ex1ApplesRadioOptions.forEach((option) => {
        const label = document.createElement("label");
        label.style.display = "flex";
        label.style.flexDirection = "column"; // Stack items vertically
        label.style.alignItems = "center";
        label.style.margin = "10px"; // Add some spacing between options

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "audio-options"; // Group name for the radio buttons
        radio.value = option.value;
        radio.style.marginTop = "5px";

        const numberSpan = document.createElement("span");
        numberSpan.textContent = option.value;
        numberSpan.style.fontSize = "28px";
        numberSpan.style.fontWeight = "bold";
        numberSpan.style.marginBottom = "5px";

        // Create the event listener for the radio button
        radio.addEventListener("change", () => {
            // When a radio button is clicked, play the corresponding audio
            const audio = new Audio(option.src);
            audio.play();

            //Automatically move to next page if the correct answer is selected
            if (radio.value === "3") {
                console.log("Correct answer selected! Moving to the next phase.");
                loadGotItVideo();
            }
        });

        label.appendChild(numberSpan);
        label.appendChild(radio);
        radioContainer.appendChild(label);
    });

    ex1ApplesVideoContainer.appendChild(radioContainer);

    // Add the Back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.classList.add("nav-button", "back");

    backButton.addEventListener("click", () => {
        console.log("Going back to the previous page...");
        loadEx1ApplesAudio(); // Replace with your logic to load the previous page
    });

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", () => {
        console.log("Next button clicked. You can implement a fallback action here if needed.");
    });

    ex1ApplesVideoContainer.appendChild(backButton);
    ex1ApplesVideoContainer.appendChild(nextButton);
    gameContainer.appendChild(ex1ApplesVideoContainer); 
}

// Function to load the Got It Video page
function loadGotItVideo() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const gotItVideoContainer = document.createElement("div");
    gotItVideoContainer.classList.add("gotit-video-container");

    // Add the Got It video
    const gotItVideo = document.createElement("video");
    gotItVideo.src = "assets/videos/gotit.mp4" /*gotit*/;
    gotItVideo.autoplay = true;
    gotItVideo.style.display = "block";
    gotItVideo.width = 600;
    gotItVideo.height = 400;
    gotItVideoContainer.appendChild(gotItVideo);

    // Call the function to add the replay button
    createReplayButton(gotItVideo);

    // Add the Back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.classList.add("nav-button", "back");

    backButton.addEventListener("click", () => {
        console.log("Going back to the previous page...");
        loadEx1BunnyVideo(); // Replace with your logic to load the previous page
    });

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", () => {
        console.log("Next button clicked. You can implement a fallback action here if needed.");
        loadEx2Cats(); // Advance to the next page
    });

    gotItVideoContainer.appendChild(backButton);
    gotItVideoContainer.appendChild(nextButton);
    gameContainer.appendChild(gotItVideoContainer);

}
// Function to load the "Example 1 Apples Video" page
function loadEx2Cats() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const ex2CatsContainer = document.createElement("div");
    ex2CatsContainer.classList.add("ex2cats-audio-container");

    // Display image
    const catsImage = document.createElement("img");
    catsImage.src = "assets/images/cats.png" /*cats*/;
    catsImage.style.maxWidth = "100%";
    catsImage.style.height = "auto";
    ex2CatsContainer.appendChild(catsImage);

    // Play audio
    const audioElement = document.createElement("audio");
    audioElement.src = "assets/audio/cats.wav" /*cats*/;
    audioElement.autoplay = true;
    ex2CatsContainer.appendChild(audioElement);

    // Call the function to add the replay button
    createReplayButton(audioElement);

    // Add audio-based radio buttons below the video
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");

    const ex2CatsRadioOptions = [
        { src: "assets/audio/one.wav" /*one*/, value: "1" },
        { src: "assets/audio/two.wav" /*two*/, value: "2" },
        { src: "assets/audio/three.wav" /*three*/, value: "3" },
        { src: "assets/audio/four.wav" /*four*/, value: "4" },
        { src: "assets/audio/five.wav" /*five*/, value: "5" },
        { src: "assets/audio/six.wav" /*six*/, value: "6" },
        { src: "assets/audio/seven.wav" /*seven*/, value: "7" },
        { src: "assets/audio/eight.wav" /*eight*/, value: "8" },
        { src: "assets/audio/nine.wav" /*nine*/, value: "9" },
        { src: "assets/audio/ten.wav" /*ten*/, value: "10" }

    ];

    ex2CatsRadioOptions.forEach((option) => {
        const label = document.createElement("label");
        label.style.display = "flex";
        label.style.flexDirection = "column"; // Stack items vertically
        label.style.alignItems = "center";
        label.style.margin = "10px"; // Add some spacing between options

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "audio-options"; // Group name for the radio buttons
        radio.value = option.value;
        radio.style.marginTop = "5px";

        const numberSpan = document.createElement("span");
        numberSpan.textContent = option.value;
        numberSpan.style.fontSize = "28px";
        numberSpan.style.fontWeight = "bold";
        numberSpan.style.marginBottom = "5px";

        // Create the event listener for the radio button
        radio.addEventListener("change", () => {
            // When a radio button is clicked, play the corresponding audio
            const audio = new Audio(option.src);
            audio.play();

            //Automatically move to next page if the correct answer is selected
            if (radio.value === "3") {
                console.log("Correct answer selected! Moving to the next phase.");
                loadReadyVideo(); // Replace with the function to load the next video/page
            }
        });

        label.appendChild(numberSpan);
        label.appendChild(radio);
        radioContainer.appendChild(label);
    });

    ex2CatsContainer.appendChild(radioContainer);

    /* // Listen for the "ended" event to automatically advance when the instruction video finishes
    audioElement.addEventListener("click", () => {
        console.log("Audio ended, moving to the next page.");
        loadReadyVideo(); // Advance to the next page
    }); */

    // Add the Back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.classList.add("nav-button", "back");

    backButton.addEventListener("click", () => {
        console.log("Going back to the previous page...");
        loadGotItVideo(); // Replace with your logic to load the previous page
    });

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", () => {
        console.log("Next button clicked.");
    });

    ex2CatsContainer.appendChild(backButton);
    ex2CatsContainer.appendChild(nextButton);
    gameContainer.appendChild(ex2CatsContainer); 
}
// Function to load the Ready to Play page
function loadReadyVideo() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const readyVideoContainer = document.createElement("div");
    readyVideoContainer.classList.add("ready-video-container");

    // Add the ready video
    const readyVideo = document.createElement("video");
    readyVideo.src = "assets/videos/readytoplay.mp4" /*ready-to-play*/;
    readyVideo.autoplay = true;
    readyVideo.style.display = "block";
    readyVideo.width = 600;
    readyVideo.height = 400;
    readyVideoContainer.appendChild(readyVideo);

    // Add the Back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.classList.add("nav-button", "back");

    backButton.addEventListener("click", () => {
        console.log("Going back to the previous page...");
        loadEx2Cats(); // Replace with your logic to load the previous page
    });

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", () => {
        console.log("Next button clicked.");
        loadLoadingVideo();
    });

    readyVideoContainer.appendChild(backButton);
    readyVideoContainer.appendChild(nextButton);
    gameContainer.appendChild(readyVideoContainer);

}

// Function to load the Got It Video page
function loadLoadingVideo() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const loadingVideoContainer = document.createElement("div");
    loadingVideoContainer.classList.add("loading-video-container");

    // Add the Loading Video
    const loadingVideo = document.createElement("video");
    loadingVideo.src = "assets/videos/loading.mp4" /*loading*/;
    loadingVideo.autoplay = true;
    loadingVideo.style.display = "block";
    loadingVideo.width = 600;
    loadingVideo.height = 400;
    loadingVideoContainer.appendChild(loadingVideo);

    // Add the Back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.classList.add("nav-button", "back");

    backButton.addEventListener("click", () => {
        console.log("Going back to the previous page...");
        loadReadyVideo();
    });

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", () => {
        console.log("Next button clicked. You can implement a fallback action here if needed.");
        trials(); // Advance to the next page
    });

    loadingVideoContainer.appendChild(backButton);
    loadingVideoContainer.appendChild(nextButton);
    gameContainer.appendChild(loadingVideoContainer);

}

const trialStimuli = [
    {
        id: "birds",
        image: "assets/images/birds.png" /*birds_number*/,
        audio: "assets/audio/birds.wav" /*birds*/,
        correct: "5"
    },
    {
        id: "books",
        image: "assets/images/books.png" /*books_number*/,
        audio: "assets/audio/books.wav" /*books*/,
        correct: "9"
    },
    {
        id: "coins",
        image: "assets/images/coins.png" /*coins_number*/,
        audio: "assets/audio/coins.wav" /*coins*/,
        correct: "6"
    },
    {
        id: "cookies",
        image: "assets/images/cookies.png" /*cookies_number*/,
        audio: "assets/audio/cookies.wav" /*cookies*/,
        correct: "7"
    },
    {
        id: "crayons",
        image: "assets/images/crayons.png" /*crayons_number*/,
        audio: "assets/audio/crayons.wav" /*crayons*/,
        correct: "3"
    },
    {
        id: "flowers",
        image: "assets/images/flowers.png" /*flowers_number*/,
        audio: "assets/audio/flowers.wav" /*flowers*/,
        correct: "6"
    },
    {
        id: "pictures",
        image: "assets/images/pictures.png" /*pictures_number*/,
        audio: "assets/audio/pictures.wav" /*pictures*/,
        correct: "7"
    },
    {
        id: "stars",
        image: "assets/images/stars.png" /*stars_number*/,
        audio: "assets/audio/stars.wav" /*stars*/,
        correct: "10"
    },
    {
        id: "balloons",
        image: "assets/images/balloons.png" /*balloons_number*/,
        audio: "assets/audio/balloons.wav" /*balloons*/,
        correct: "6"
    },
    {
        id: "balls",
        image: "assets/images/balls.png" /*balls_number*/,
        audio: "assets/audio/redballs.wav" /*balls*/,
        correct: "4"
    }
]

let trialIndex = 0;

// Call this function at the start of the test
function trials() {
    shuffleArray(trialStimuli);  // Shuffle the questions once
    trialIndex = 0; // Reset the index
    loadTrial(trialIndex);
}

// Function to load a question
function loadTrial(index) {
    if (index >= trialStimuli.length) {
        console.log("Test completed!");
        loadFinishedVideo();
        return;
    }

    function loadIt3Video() {
        const gameContainer = document.getElementById("game-container");
        gameContainer.innerHTML = ""; // Clear previous content
    
        const it3VideoContainer = document.createElement("div");
        it3VideoContainer.classList.add("it3-video-container");
    
        // Add the it3 video
        const it3Video = document.createElement("video");
        it3Video.src = "assets/videos/it3.mp4" /*it3*/;
        it3Video.autoplay = true;
        it3Video.style.display = "block";
        it3Video.width = 600;
        it3Video.height = 400;
        it3VideoContainer.appendChild(it3Video);
    
        // Resume trial after the video ends
        it3Video.addEventListener("ended", () => {
            console.log("it3 video ended. Resuming trials...");
            trialIndex++;
            loadTrial(trialIndex); // Resume trials from trial 6
        });
    
        gameContainer.appendChild(it3VideoContainer);
    }

    // Insert a video between trials 5 and 6
    if (index === 5) {
        console.log("Playing it3 video...");
        loadIt3Video(); // Call a function to load the video
        return; // Stop further execution until the video is done
    }

    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const trialData = trialStimuli[index];

    const trialContainer = document.createElement("div");
    trialContainer.classList.add("trial-container");

    // Display Image
    const trialImage = document.createElement("img");
    trialImage.src = trialData.image;
    trialImage.style.maxWidth = "100%";
    trialImage.style.height = "auto";
    trialContainer.appendChild(trialImage);

    // Play Audio
    const audioElement = document.createElement("audio");
    audioElement.src = trialData.audio;
    audioElement.autoplay = true;
    trialContainer.appendChild(audioElement);

    // Replay Button (Updates for Each Trial)
    const replayButton = document.createElement("button");
    replayButton.classList.add("replay-button");
    replayButton.addEventListener("click", () => {
        if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
        }
    });

    trialContainer.appendChild(replayButton);

    // Number Radio Buttons
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");

    const numberAudioOptions = [
        { src: "assets/audio/one.wav", value: "1" },
        { src: "assets/audio/two.wav", value: "2" },
        { src: "assets/audio/three.wav", value: "3" },
        { src: "assets/audio/four.wav", value: "4" },
        { src: "assets/audio/five.wav", value: "5" },
        { src: "assets/audio/six.wav", value: "6" },
        { src: "assets/audio/seven.wav", value: "7" },
        { src: "assets/audio/eight.wav", value: "8" },
        { src: "assets/audio/nine.wav", value: "9" },
        { src: "assets/audio/ten.wav", value: "10" }
    ];

    numberAudioOptions.forEach(option => {
        const label = document.createElement("label");
        label.style.display = "flex";
        label.style.flexDirection = "column";
        label.style.alignItems = "center";
        label.style.margin = "10px";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `trial-options-${trialData.id}`;
        radio.value = option.value;
        radio.style.marginTop = "5px";

        const numberSpan = document.createElement("span");
        numberSpan.textContent = option.value;
        numberSpan.style.fontSize = "28px";
        numberSpan.style.fontWeight = "bold";
        numberSpan.style.marginBottom = "5px";

        // **Play number audio when selected**
        radio.addEventListener("change", () => {
            const audio = new Audio(option.src);
            audio.play();
        });

        label.appendChild(numberSpan);
        label.appendChild(radio);
        radioContainer.appendChild(label);
    });

    trialContainer.appendChild(radioContainer);
    gameContainer.appendChild(trialContainer);

    // Back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.classList.add("nav-button", "back");
    backButton.addEventListener("click", () => {
        if (trialIndex === 0) {
            loadReadyVideo(); // Go back to the intro video if at the first question
        } else {
            trialIndex--; // Go to the previous question
            loadTrial(trialIndex);
        }
    });

    // Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add("nav-button", "next");
    nextButton.addEventListener("click", () => {
        collectTrialResponse(trialData.id); // Collect the response for this trial
        trialIndex++;
        loadTrial(trialIndex);
    });

    trialContainer.appendChild(backButton);
    trialContainer.appendChild(nextButton);
    gameContainer.appendChild(trialContainer);
}

// Collect the selected response for the current trial
function collectTrialResponse(trialId) {
    // Find the selected radio button for the current trial
    const selectedRadio = document.querySelector(`input[name="trial-options-${trialId}"]:checked`);

    // If a response was selected, push it to the responses array
    if (selectedRadio) {
        const selectedAnswer = selectedRadio.value;
        const trialData = trialStimuli.find(trial => trial.id === trialId);  // Get the correct answer for the trial

        // Compare the selected answer with the correct answer for this trial
        const isCorrect = selectedAnswer === trialData.correct;

        console.log(`Collected response for trial ${trialId}: ${selectedAnswer} | Correct answer: ${trialData.correct}`);

        // Push the selected answer and whether it's correct
        responses.push({
            trialId: trialId,
            selectedAnswer: selectedAnswer,
            isCorrect: isCorrect ? "Yes" : "No"  // Add whether the answer was correct or not
        });
    } else {
        console.log(`No response selected for trial ${trialId}`);
        responses.push({
            trialId: trialId,
            selectedAnswer: "NA",  // If no response is selected, mark as "NA"
            isCorrect: "No"
        });
    }
}

// Fisher-Yates Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to load the "Finished" page
function loadFinishedVideo() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const finishedVideoContainer = document.createElement("div");
    finishedVideoContainer.classList.add("finished-video-container");

    // Add the finished video
    const finishedVideo = document.createElement("video");
    finishedVideo.src = "assets/videos/finished.mp4" /*finished*/;
    finishedVideo.autoplay = true;
    finishedVideo.width = 600;
    finishedVideo.height = 400;
    finishedVideo.style.display = "block";
    finishedVideoContainer.appendChild(finishedVideo);

    // Create a submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.id = "submit-button";
    submitButton.type = "button";
    submitButton.classList.add("nav-button", "submit-button");

    submitButton.addEventListener("click", () => {
        console.log("Submitting responses...");
        submitResponses(); 
    });

    console.log("✅ Submit button created!");

    submitButton.classList.add("nav-button", "next");

    // Add the Back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.classList.add("nav-button", "back");
 
    backButton.addEventListener("click", () => {
        console.log("Going back to the previous page...");
        loadTrial(trialIndex); // Replace with your logic to load the previous page
    });

    console.log("✅ Back button created!");

    finishedVideoContainer.appendChild(backButton);
    finishedVideoContainer.appendChild(submitButton);
    gameContainer.appendChild(finishedVideoContainer);

    console.log("✅ Buttons successfully appended to finishedVideoContainer!");
}
// Function to collect all responses (questions and trials)
function collectResponses() {
    console.log("Collecting responses...");

    // Collect question responses (for MCQs or free text)
    questions.forEach(question => {
        if (question.type === "mcq") {
            const selectedOption = document.querySelector(`input[name="${question.name}"]:checked`);
            if (selectedOption) {
                console.log("✅ Question response:", question.text, selectedOption.value);
                responses.push({ question: question.text, answer: selectedOption.value });
            }
        } else if (question.type === "free" && question.name === "id") {
            const idInput = document.querySelector(`input[name="${question.name}"]`);
            if (idInput && idInput.value.trim() !== "") {
                const subjectId = idInput.value.trim();  
                console.log("Question response:", question.text, subjectId);
                responses.push({ question: question.text, answer: subjectId });
            }
        }
    });

    trialStimuli.forEach((trial) => {
        const selectedRadio = document.querySelector(`input[name="trial-options-${trial.id}"]:checked`);
        
        // Debugging: Check if radio button is being found and selected
        const radioButtons = document.querySelectorAll(`input[name="trial-options-${trial.id}"]`);
        console.log(`Trial: ${trial.id}, Found ${radioButtons.length} radio buttons`);
        radioButtons.forEach(radio => {
            console.log(`Radio button value: ${radio.value}, Checked: ${radio.checked}`);
        });

        let responseValue = selectedRadio ? selectedRadio.value : "NA";  // Default to "NA" if no selection
    
        // Ensure no duplicates before pushing
        if (!responses.some(response => response.trialId === trial.id)) {
            responses.push({
                trialId: trial.id,  
                selectedAnswer: responseValue  
            });
        }
    
        console.log(`Trial response for ${trial.id}: ${responseValue}`);
    });     
       
}

// Function to convert responses to CSV format
function convertToCSV(responses) {
    if (!responses || responses.length === 0) return "";  // Handle empty responses array

    // Extract subject ID
    const subjectResponse = responses.find(response => response.question === "subject id");
    const subjectId = subjectResponse ? subjectResponse.answer : "unknown";

    // Convert responses to key-value pairs
    const responseObj = { "subject id": subjectId }; // Start with subject ID as first column
    responses.forEach(response => {
        if (response.question && response.answer) {
            responseObj[response.question] = response.answer;
        } else if (response.trialId && response.selectedAnswer) {
            responseObj[`trial_${response.trialId}`] = response.selectedAnswer;
        }
    });

    // Create CSV header row (sorted for consistency)
    const headers = Object.keys(responseObj);
    const values = headers.map(header => responseObj[header] || "NA"); // Fill missing values with "NA"

    // Combine header and values into CSV format
    return `${headers.join(",")}\n${values.join(",")}`;
}

// Function to save responses to a CSV file
function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

// Function to submit responses and save locally
function submitResponses() {
    collectResponses();  // Collect responses before submitting

    if (responses.length === 0) {
        console.error("No responses to submit.");
        alert("No responses to save.");
        return;
    }

    // Now get the 'id' from the responses array
    const subjectId = responses.find(response => response.question === "subject id").answer;

    const csvContent = convertToCSV(responses);  // Convert to CSV
    downloadCSV(csvContent, `${subjectId}_numbersponses.csv`);  // Download with subjectId in filename

    fetch("http://stanford-cogsci.org:4959/save_responses", {  
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `csvData=${encodeURIComponent(csvContent)}`,
    })
    .then(response => response.text())
    .then(data => {
        console.log("✅ Data successfully uploaded:", data);
        alert("Responses submitted successfully.");
    })
    .catch(error => {
        console.error("❌ Error submitting responses:", error);
        alert("There was an error submitting your responses.");
    });    
}

// Event listener for the submit button
document.getElementById('submit-button').addEventListener('click', submitResponses);

// Assuming the submit button is inside `finishedVideoContainer`, which you have already appended
finishedVideoContainer.appendChild(submitButton);
finishedVideoContainer.appendChild(backButton);
gameContainer.appendChild(finishedVideoContainer);
