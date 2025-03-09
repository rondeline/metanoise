// Arrays of media file URLs
const videoFiles = [
    "assets/videos/instructions.mp4" /*instructions*/,
    "assets/videos/ex1bunny.mp4" /*bunny_ex_mp4*/,
    "assets/videos/gotit.mp4" /*gotit*/,
    "assets/videos/readytoplay.mp4" /*ready-to-play*/,
    "assets/videos/loading.mp4" /*loading*/,
    "assets/videos/it3.mp4" /*it3*/,
    "assets/videos/finished.mp4" /*finished*/,

];
const audioFiles = [
    "assets/audio/prompt.wav" /*prompt*/,
];
const imageFiles = [
    "assets/images/apple.png" /*apple*/,
    "assets/images/balloon.png" /*balloon*/,
    "assets/images/banana.png" /*banana*/,
    "assets/images/baseball.png" /*baseball*/,
    "assets/images/basketball.png" /*basketball*/,
    "assets/images/book.png" /*book*/,
    "assets/images/book_picture.png" /*book_picture*/,
    "assets/images/bowl.png" /*bowl*/,
    "assets/images/bowl_picture.png" /*bowl_picture*/,
    "assets/images/bunny.png" /*bunny*/,
    "assets/images/bunny_picture.png" /*bunny_picture*/,
    "assets/images/bus.png" /*bus*/,
    "assets/images/car.png" /*car*/,
    "assets/images/car_picture.png" /*car_picture*/,
    "assets/images/cat.png" /*cat*/,
    "assets/images/cat_picture.png" /*cat_picture*/,
    "assets/images/cheese.png" /*cheese*/,
    "assets/images/circle.png" /*circle*/,
    "assets/images/crayon.png" /*crayon*/,
    "assets/images/cup.png" /*cup*/,
    "assets/images/cupcake.png" /*cupcake*/,
    "assets/images/door.png" /*door*/,
    "assets/images/door_picture.png" /*door_picture*/,
    "assets/images/dress.png" /*dress*/,
    "assets/images/elephant.png" /*elephant*/,
    "assets/images/fish.png" /*fish*/,
    "assets/images/fish_picture.png" /*fish_picture*/,
    "assets/images/flower.png" /*flower*/,
    "assets/images/flower_picture.png" /*flower_picture*/,
    "assets/images/giraffe.png" /*giraffe*/,
    "assets/images/hand.png" /*hand*/,
    "assets/images/hand_picture.png" /*hand_picture*/,
    "assets/images/hotdog.png" /*hotdog*/,
    "assets/images/letter.png" /*letter*/,
    "assets/images/orange.png" /*orange*/,
    "assets/images/pen.png" /*pen*/,
    "assets/images/pencil.png" /*pencil*/,
    "assets/images/pour.png" /*pour*/,
    "assets/images/scissors.png" /*scissors*/,
    "assets/images/scissors_picture.png" /*scissors_picture*/,
    "assets/images/shirt.png" /*shirt*/,
    "assets/images/shower.png" /*shower*/,
    "assets/images/soccer.png" /*soccer*/,
    "assets/images/sock.png" /*sock*/,
    "assets/images/sock_picture.png" /*sock_picture*/,
    "assets/images/square.png" /*square*/,
    "assets/images/tiger.png" /*tiger*/,
    "assets/images/tooth.png" /*tooth*/,
    "assets/images/toothbrush.png" /*toothbrush*/,
    "assets/images/toothpaste.png" /*toothpaste*/,
    "assets/images/tree.png" /*tree*/,
    "assets/images/tree_picture.png" /*tree_picture*/,
    "assets/images/triangle.png" /*triangle*/,
    "assets/images/truck.png" /*truck*/,
    "assets/images/wave.png" /*wave*/,
    "assets/images/window_blue.png" /*window blue*/,
    "assets/images/window_gray.png" /*window gray*/,
    "assets/images/window_green.png" /*window green*/,
];

// Function to preload media with a progress bar
function preloadMediaWithProgress(callback) {
    const totalFiles = videoFiles.length + audioFiles.length + imageFiles.length;
    let loadedFiles = 0;
    let loadedImages = 0;
    let loadedAudios = 0;
    let loadedVideos = 0;

    // Show the progress bar
    const progressContainer = document.getElementById('progress-container');
    progressContainer.style.display = 'block';
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    // Function to update progress
    function updateProgress() {
        loadedFiles++;
        const progress = (loadedFiles / totalFiles) * 100;
        progressFill.style.width = `${progress}%`;

         // Display text updates
         if (loadedImages === imageFiles.length) {
            progressText.textContent = "Images Loaded";
        } else if (loadedAudios === audioFiles.length) {
            progressText.textContent = "Audios Loaded";
        } else if (loadedVideos === videoFiles.length) {
            progressText.textContent = "Videos Loaded";
        }

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
        const audio = new Audio;
        audio.src = audioUrl;
        audio.preload = "auto"; // Preload the audio
        audio.oncanplaythrough = updateProgress;
        audio.onerror = () => console.error(`Failed to load audio: ${audioUrl}`);
        audio.style.display = "none"; // Hide the audio element
        document.body.appendChild(audio); // Append to the body temporarily
    });

    // Preload images
    imageFiles.forEach((imageUrl) => {
        const image = new Image();
        image.src = imageUrl; // Set the image source
        image.onload = updateProgress;
        image.style.display = "none";
        image.onerror = () => console.error(`Failed to load image: ${imageUrl}`);
        document.body.appendChild(image);
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
let responses = []; // Array to store responses

// Array of set up questions with a page property
const questions = [
    {
        text: "experimenter",
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

    // Check if "Test" button was clicked (on the first page)
    const testButtonClicked = responses.some(response => response.answer === "test");

    let allAnswered = true;

    // If Test button was clicked, proceed with different logic
    if (testButtonClicked) {
        console.log("Test button clicked!");
        loadHandTablet();
        return;
    }

    // Collect responses for the setup questions
    if (currentPage === 1) {
        const questionsForPage = questions.filter(q => q.page === currentPage);
        
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

        // Check if all questions on the first page are answered
        if (!allAnswered && !testButtonClicked) {
            alert("Please answer all questions before proceeding.");
            return;
        }
    }

    // Collect responses for pages 4, 6, and all trial pages
    if (currentPage === 4 || currentPage === 6) {
        // Example for pages 4 and 6, replace with your logic for specific trials or videos
        const selectedOption = document.querySelector(`input[name="some-option"]:checked`);
        if (selectedOption) {
            responses.push({ question: "Page-specific question", answer: selectedOption.value });
        } else {
            allAnswered = false;
        }
    }

    if (currentPage >= 9) {
        const trialData = trialStimuli[currentPage - 9];
        // Loop through options for each trial
        const selectedRadio = document.querySelector(`input[name="trial-options-${trialData.id}"]:checked`);  // Ensure the correct name is used

        if (selectedRadio) {
            responses.push({
                question: trialData.id,  // Use trial ID as the question
                answer: selectedRadio.value  // Store the selected answer
            });
    
            console.log(`Trial response for ${trialData.id}: ${selectedRadio.value}`);  // Debugging log
        } else {
            console.log(`No response selected for trial ${trialData.id}`);  // Debugging log when no response is selected
        }
    }

    // If not all questions were answered, show an alert
    if (!allAnswered) {
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
        console.log("Loading instruction video...");
        loadInstructionVideo();
    } else if (currentPage === 4) {
        console.log("Loading Ex1 Bunny Video...");
        loadEx1BunnyVideo(); 
    } else if (currentPage === 5) {
        console.log("Loading Got It Video...");
        loadGotItVideo();
    } else if (currentPage === 6) {
        console.log("Loading Ex2 Car Video...");
        loadEx2Car();
    } else if (currentPage === 7) {
        console.log("Loading Ready Video...");
        loadReadyVideo();
    } else if (currentPage === 8) {
        console.log("Loading Video...");
        it3();
    } else if (currentPage === 9) {
        console.log("Loading trials...");
        trials();
    } else if (currentPage === 9) {
        console.log("Loading finished video...");
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
    instructionVideoContainer.appendChild(instructionVideo);

    // Listen for the "ended" event to automatically advance when the instruction video finishes
    instructionVideo.addEventListener("ended", () => {
        console.log("Video ended, moving to the next page.");
        loadEx1BunnyVideo(); // Advance to the next page
    });

    // Add the Next button after the instruction video
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");
    

    nextButton.addEventListener("click", () => {
        console.log("Moving beyond the Instruction Video page.");
        loadEx1BunnyVideo(); // Advance to the next page
    });

    instructionVideoContainer.appendChild(nextButton);
    gameContainer.appendChild(instructionVideoContainer); // Append to the game container instead of questionForm
}

// Function to load the "Example 1 Bunny Video" page
function loadEx1BunnyVideo() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const ex1BunnyVideoContainer = document.createElement("div");
    ex1BunnyVideoContainer.classList.add("ex1bunny-video-container");

    // Add the example 1 bunny video
    const ex1BunnyVideo = document.createElement("video");
    ex1BunnyVideo.src = "assets/videos/ex1bunny.mp4" /*bunny_ex_mp4*/;
    ex1BunnyVideo.autoplay = true;
    ex1BunnyVideo.style.display = "block";
    ex1BunnyVideo.width = 600;
    ex1BunnyVideo.height = 400;
    ex1BunnyVideoContainer.appendChild(ex1BunnyVideo);

    // Add image-based radio buttons below the video
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");

    const ex1BunnyRadioOptions = [
        { src: "assets/images/apple.png" /*apple*/, value: "apple" },
        { src: "assets/images/banana.png" /*banana*/, value: "banana" },
        { src: "assets/images/orange.png" /*orange*/, value: "orange" },
        { src: "assets/images/bunny.png" /*bunny*/, value: "bunny" }
    ];

    ex1BunnyRadioOptions.forEach((option) => {
        const label = document.createElement("label");
        label.style.display = "inline-block"; // Ensure images and radios are inline
        label.style.margin = "10px"; // Add some spacing between options

        const img = document.createElement("img");
        img.src = option.src;
        img.alt = option.value;
        img.style.width = "100px"; // Set image width
        img.style.height = "75px"; // Set image height
        img.style.display = "block";
        img.style.cursor = "pointer"; // Make the image clickable

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "bunny-options"; // Group name for the radio buttons
        radio.value = option.value;
        radio.style.marginTop = "5px";

        // Automatically move to the next page when the correct answer is selected
        radio.addEventListener("change", () => {
            if (radio.value === "bunny") {
                console.log("Correct answer selected! Moving to the next phase.");
                loadGotItVideo(); // Replace with the function to load the next video/page
            }
        });

        label.appendChild(img);
        label.appendChild(radio);
        radioContainer.appendChild(label);
    });

    ex1BunnyVideoContainer.appendChild(radioContainer);

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

    ex1BunnyVideoContainer.appendChild(backButton);
    ex1BunnyVideoContainer.appendChild(nextButton);
    gameContainer.appendChild(ex1BunnyVideoContainer); // Append to the game container instead of questionForm
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
        loadEx2Car(); // Advance to the next page
    });

    gotItVideoContainer.appendChild(backButton);
    gotItVideoContainer.appendChild(nextButton);
    gameContainer.appendChild(gotItVideoContainer);

}

// Function to load a page with an image and auto-playing audio
function loadEx2Car() {
    console.log("Loading Example 2");

    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    // Create a container for the image and audio
    const ex2CarContainer = document.createElement("div");
    ex2CarContainer.classList.add("ex2Car-container");

    // Add the image
    const ex2CarImage = document.createElement("img");
    ex2CarImage.src = "assets/images/car_picture.png" /*car_picture*/,
    ex2CarImage.style.maxWidth = "100%";
    ex2CarImage.style.height = "auto";
    ex2CarContainer.appendChild(ex2CarImage);

    // Add the audio
    const ex2CarAudio = document.createElement("audio");
    ex2CarAudio.src = "assets/audio/prompt.wav" /*prompt*/;
    ex2CarAudio.autoplay = true; // Auto-play audio when the page loads
    ex2CarAudio.style.marginTop = "20px";
    ex2CarContainer.appendChild(ex2CarAudio);

    // Add image-based radio buttons below the video
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");

    const ex2CarRadioOptions = [
        { src: "assets/images/triangle.png" /*triangle*/, value: "triangle" },
        { src: "assets/images/car.png" /*car*/, value: "car" },
        { src: "assets/images/square.png" /*square*/, value: "square" },
        { src: "assets/images/circle.png" /*circle*/, value: "circle" }
    ];

    ex2CarRadioOptions.forEach((option) => {
        const label = document.createElement("label");
        label.style.display = "inline-block"; // Ensure images and radios are inline
        label.style.margin = "10px"; // Add some spacing between options

        const img = document.createElement("img");
        img.src = option.src;
        img.alt = option.value;
        img.style.width = "90px"; // Set image width
        img.style.height = "75px"; // Set image height
        img.style.display = "block";
        img.style.cursor = "pointer"; // Make the image clickable

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "car-options"; // Group name for the radio buttons
        radio.value = option.value;
        radio.style.marginTop = "5px";

        // Automatically move to the next page when the correct answer is selected
        radio.addEventListener("change", () => {
            if (radio.value === "car") {
                console.log("Correct answer selected! Moving to the next phase.");
                loadReadyVideo();
            }
        });

        label.appendChild(img);
        label.appendChild(radio);
        radioContainer.appendChild(label);
    });

    ex2CarContainer.appendChild(radioContainer);

    // Add the Back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.classList.add("nav-button", "back");

    backButton.addEventListener("click", () => {
        console.log("Going back to the previous page...");
        loadGotItVideo();
        
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

    ex2CarContainer.appendChild(backButton);
    ex2CarContainer.appendChild(nextButton);
    gameContainer.appendChild(ex2CarContainer);
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
        loadEx2Car(); // Replace with your logic to load the previous page
    });

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";
    nextButton.classList.add("nav-button", "next");

    nextButton.addEventListener("click", () => {
        console.log("Next button clicked.");

        loadLoadingVideo(); // Advance to the next page
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
        id: "door",
        image: "assets/images/door_picture.png" /*door_picture*/,
        options: [
            {   src: "assets/images/window_blue.png" /*window blue*/, value: "window blue"    },
            {   src: "assets/images/window_gray.png" /*window gray*/, value: "window gray"    },
            {   src: "assets/images/door.png" /*door*/, value: "door"   },
            {   src: "assets/images/window_green.png" /*window green*/, value: "window green"   }
        ],
        correct: "door"
    },
    {
        id: "tree",
        image: "assets/images/tree_picture.png" /*tree_picture*/,
        options: [
            {   src: "assets/images/tree.png" /*tree*/, value: "tree"   },
            {   src: "assets/images/cheese.png" /*cheese*/, value: "cheese"   },
            {   src: "assets/images/cupcake.png" /*cupcake*/, value: "cupcake"   },
            {   src: "assets/images/hotdog.png" /*hotdog*/, value: "hotdog"   }
        ],
        correct: "tree"
    },
    {
        id: "cat",
        image: "assets/images/cat_picture.png" /*cat_picture*/,
        options: [
            {   src: "assets/images/cat.png" /*cat*/, value: "cat"   },
            {   src: "assets/images/sock.png" /*sock*/, value: "sock"   },
            {   src: "assets/images/dress.png" /*dress*/, value: "dress"   },
            {   src: "assets/images/shirt.png" /*shirt*/, value: "shirt"   }
        ],
        correct: "cat"
    },
    {
        id: "hand",
        image: "assets/images/hand_picture.png" /*hand_picture*/,
        options: [
            {   src: "assets/images/baseball.png" /*baseball*/, value: "baseball"   },
            {   src: "assets/images/hand.png" /*hand*/, value: "hand"   },
            {   src: "assets/images/basketball.png" /*basketball*/, value: "basketball"   },
            {   src: "assets/images/soccer.png" /*soccer*/, value: "soccer"   }
        ],
        correct: "hand"
    },
    {
        id: "flower",
        image: "assets/images/flower_picture.png" /*flower_picture*/,
        options: [
            {   src: "assets/images/crayon.png" /*crayon*/, value: "crayon"   },
            {   src: "assets/images/pencil.png" /*pencil*/, value: "pencil"   },
            {   src: "assets/images/flower.png" /*flower*/, value: "flower"   },
            {   src: "assets/images/pen.png" /*pen*/, value: "pen"   }
        ],
        correct: "flower"
    },
    {
        id: "bowl",
        image: "assets/images/bowl_picture.png" /*bowl_picture*/,
        options: [
            {   src: "assets/images/bus.png" /*bus*/, value: "bus"   },
            {   src: "assets/images/bowl.png" /*bowl*/, value: "bowl"   },
            {   src: "assets/images/car.png" /*car*/, value: "car"   },
            {   src: "assets/images/truck.png" /*truck*/, value: "truck"   }
        ],
        correct: "bowl"
    },
    {
        id: "scissors",
        image: "assets/images/scissors_picture.png" /*scissors_picture*/,
        options: [
            {   src: "assets/images/scissors.png" /*scissors*/, value: "scissors"   },
            {   src: "assets/images/giraffe.png" /*giraffe*/, value: "giraffe"   },
            {   src: "assets/images/elephant.png" /*elephant*/, value: "elephant"   },
            {   src: "assets/images/tiger.png" /*tiger*/, value: "tiger"   }
        ],
        correct: "scissors"
    },
    {
        id: "fish",
        image: "assets/images/fish_picture.png" /*fish_picture*/,
        options: [
            {   src:"assets/images/shower.png" /*shower*/, value: "shower"   },
            {   src: "assets/images/pour.png" /*pour*/, value: "pour"   },
            {   src: "assets/images/fish.png" /*fish*/, value: "fish"   },
            {   src: "assets/images/wave.png" /*wave*/, value: "wave"   }
        ],
        correct: "fish"
    },
    {
        id: "sock",
        image: "assets/images/sock_picture.png" /*sock_picture*/,
        options: [
            {   src: "assets/images/tooth.png" /*tooth*/, value: "tooth"   },
            {   src: "assets/images/toothbrush.png" /*toothbrush*/, value: "toothbrush"   },
            {   src: "assets/images/sock.png" /*sock*/, value: "sock"   },
            {   src: "assets/images/toothpaste.png" /*toothpaste*/, value: "toothpaste"   }
        ],
        correct: "sock"
    },
    {
        id: "balloon",
        image: "assets/images/book_picture.png" /*book_picture*/,
        options: [
            {   src: "assets/images/balloon.png" /*balloon*/, value: "balloon"   },
            {   src: "assets/images/letter.png" /*letter*/, value: "letter"   },
            {   src: "assets/images/book.png" /*book*/, value: "book"   },
            {   src: "assets/images/cup.png" /*cup*/, value: "cup"   }
        ],
        correct: "balloon"
    }
];

let trialIndex = 0;
const trialAudio = "assets/audio/prompt.wav" /*prompt*/;
let audioElement = null;

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

    // Display image
    const trialImage = document.createElement("img");
    trialImage.src = trialData.image;
    trialImage.style.maxWidth = "100%";
    trialImage.style.height = "auto";
    trialContainer.appendChild(trialImage);

    // Play audio
    const audioElement = document.createElement("audio");
    audioElement.src = trialAudio;
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
    label.style.margin = "10px"; // Add spacing between options

    const img = document.createElement("img");
    img.src = option.src;
    img.alt = option.value;
    img.style.width = "90px";  // Set image size
    img.style.height = "75px";
    img.style.display = "block";
    img.style.cursor = "pointer"; // Make it look clickable

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `trial-options-${trialData.id}`; // Unique name per trial (remains the same)
    radio.value = option.value;
    radio.style.marginTop = "5px";

    label.appendChild(img); 
    label.appendChild(radio);
    radioContainer.appendChild(label);
});

trialContainer.appendChild(radioContainer);

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
        console.log(`Collected response for trial ${trialId}: ${selectedRadio.value}`);
        responses.push({
            trialId: trialId,
            selectedAnswer: selectedRadio.value
        });
    } else {
        console.log(`No response selected for trial ${trialId}`);
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
    finishedVideo.src = "assets/videos/finished.mp4"; 
    finishedVideo.autoplay = true;
    finishedVideo.width = 600;
    finishedVideo.height = 400;
    finishedVideo.style.display = "block";
    finishedVideoContainer.appendChild(finishedVideo);

    console.log("✅ Finished video added!");

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
            responseObj[`trial_${response.trialId}`] = response.selectedAnswer; // Store trial responses with unique column names
        }
    });

    // Create CSV header row (sorted for consistency)
    const headers = Object.keys(responseObj);
    const values = headers.map(header => responseObj[header] || "NA"); // Fill missing values with "NA"

    // Combine header and values into CSV format
    return `${headers.join(",")}\n${values.join(",")}`;

    /* const header = Object.keys(responses[0]).join(",");  // Get keys as the header
    const rows = responses.map(response => Object.values(response).join(",")).join("\n");  // Convert values to a string

    return `${header}\n${rows}`;  // Combine header and rows */
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
    downloadCSV(csvContent, `${subjectId}_pictureresponses.csv`);  // Download with subjectId in filename

    fetch("http://stanford-cogsci.org:3959/save_responses", {  
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
