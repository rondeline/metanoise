// Arrays of media file URLs
const videoFiles = [
    "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_8fc8602pVdH5xSC", /*loading*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_vjAFSwglsGUlBOb", /*bunny_ex_mp4*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_yaYNcGdsg2lOLyv", /*instructions_ooo*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_f4R7OxepjYiQR7o", /*it3*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_dbNIB9feseNdbq6", /*ready_to_play*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_7u8XEkQum4pUFwy", /*gotit*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_9GYCF0irIMoxGQK", /*finished*/

];
const audioFiles = [
    "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_Bzoey2gBy4AtScC", /*prompt_ooo*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_Q5bdEMeMt8ELiac", /*ex_bunny_ooo*/
];
const imageFiles = [
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_jjit1HcQagoLa0A", /*balloon*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_dUFXpoibTYONRfV", /*shower*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_PdijW6pSeaBFOa1", /*letter*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_UQZV1yMdhqhpwyC", /*cup*/
	"https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_wxzeqVW3lpFXrly", /*wave*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_rnH7mhnqSJruTOw", /*pour*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_zi7pW0CkCbjE9qb", /*fish1*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_2EuV438IOKhvgXx", /*hand*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6s9VFQnlZd4XuRN", /*crayon*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_FMIdve9tpN9EkVy", /*pencil*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ltgNhMB1P3FmvNT", /*pen*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Ua6QKOJadCF460W", /*flower*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6FLHmlAFKuR33Cw", /*square*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Lhq9ju0Y8IL2LHa", /*bus*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_htkrGoBFsfjwgo3", /*sock*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_HclfpaxTpJzIUTE", /*bowl*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ZhDSTZ1PiReFuR8", /*scissors*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6DjD6Mh4gHy8GuZ", /*hand_q*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_fiNnUTlsZRcDNiF", /*door_q*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_u52zX0vZMmKah1c", /*tree_q*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cCQcola6ZPz8zgG", /*car_q*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_AECv3YQv1bxpz9c", /*cheese*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_WZCSMP73ocm2lq9", /*hotdog*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_fUYuze8TEZAfhra", /*cupcake*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bZdNU4LMZt9WQur", /*window1*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_OIjIoX3PTQBEZrq", /*circle_img*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ZZ5VQ3a34yWKfn7", /*tree1_img*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_maImIreishj7paE", /*baseball*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_pkcmVkPEz5t9tdf", /*basketball*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_wgEklZKR7AUPllw", /*tooth*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_LD2Agr4ntuZKWkm", /*soccer*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_YtvlC8F5G4vVS5s", /*toothpaste*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cpR3uSJhlYeDXl8", /*elephant*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_7W7HUBxwnfbayCa", /*giraffe*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_fe8ZHAaPBwHlkMK", /*truck*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_caC0kmPGngKwkSR", /*tiger*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ydGOadDzGotlrO3", /*triangle*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bBHagdJ8gwNBQbG", /*dress*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_x2Mv2nOkwFicI2O", /*cat_img*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_LeMdsG9u26jAYEZ", /*shirt*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6jLgcpUK8IaNX0j", /*apple*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_QXFHARAaziIewBB", /*orange*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_XdbhJhqsnmrAkX1", /*car_yellow*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_g4bOy7IB6WtkEUK", /*window_green*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_FKStLDqUcH4Dduh", /*window_gray*/
    "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_nHyg5d9GIMBPdVX" /*banana*/
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
        text: "2. age",
        type: "mcq",
        name: "age",
        options: ["3", "4", "5", "other"],
        page: 1,
    },
    {
        text: "3. subject id",
        type: "free",
        name: "id",
        page: 1,
    },
    {
        text: "4. condition",
        type: "mcq",
        name: "condition",
        options: ["noise", "silence"],
        page: 1,
    },
    {
        text: "5. site",
        type: "mcq",
        name: "site",
        options: ["bing", "cdm", "jmz", "other"],
        page: 1,
    },
    {
        text: "6. bing classroom",
        type: "mcq",
        name: "classroom",
        options: ["center", "east", "west", "none"],
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

    nextButton.addEventListener("click", handleNextPage);
    questionForm.appendChild(nextButton);
}

// Function to handle the Next button click
function handleNextPage() {
    console.log("Next button clicked.");

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
        loadInstructionVideo();  // Now this will be triggered
    } else if (currentPage === 4) {
        console.log("Loading Ex1 Bunny Video...");
        loadEx1BunnyVideo();  // Load the Ex1 Bunny Video page on page 4
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
    instructionVideo.src = "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_yaYNcGdsg2lOLyv"; // instructions_ooo
    instructionVideo.controls = true;
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
    ex1BunnyVideo.src = "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_vjAFSwglsGUlBOb"; /*bunny_ex_mp4*/
    ex1BunnyVideo.controls = true;
    ex1BunnyVideo.autoplay = true;
    ex1BunnyVideo.style.display = "block";
    ex1BunnyVideo.width = 600;
    ex1BunnyVideo.height = 400;
    ex1BunnyVideoContainer.appendChild(ex1BunnyVideo);

    // Add image-based radio buttons below the video
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");

    const ex1BunnyRadioOptions = [
        { src: "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6jLgcpUK8IaNX0j" /*apple*/, value: "Option 1" },
        { src: "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_nHyg5d9GIMBPdVX" /*banana*/, value: "Option 2" },
        { src: "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_QXFHARAaziIewBB" /*orange*/, value: "Option 3" },
        { src: "https://stanforduniversity.qualtrics.com/ControlPanel/Graphic.php?IM=IM_jjit1HcQagoLa0A" /*balloon*/, value: "Option 4" }
    ];

    ex1BunnyRadioOptions.forEach((option) => {
        const label = document.createElement("label");
        label.style.display = "inline-block"; // Ensure images and radios are inline
        label.style.margin = "10px"; // Add some spacing between options

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "bunny-options"; // Group name for the radio buttons
        radio.value = option.value;

        const img = document.createElement("img");
        img.src = option.src;
        img.alt = option.value;
        img.style.width = "100px"; // Set image width
        img.style.height = "75px"; // Set image height
        img.style.cursor = "pointer"; // Make the image clickable

        // Automatically move to the next page when the correct answer is selected
        radio.addEventListener("change", () => {
            if (radio.value === "Option 4") {
                console.log("Correct answer selected! Moving to the next phase.");
                loadGotItVideo(); // Replace with the function to load the next video/page
            }
        });

        label.appendChild(radio);
        label.appendChild(img);
        radioContainer.appendChild(label);
    });

    ex1BunnyVideoContainer.appendChild(radioContainer);

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";

    nextButton.addEventListener("click", () => {
        console.log("Next button clicked. You can implement a fallback action here if needed.");
    });

    ex1BunnyVideoContainer.appendChild(nextButton);
    gameContainer.appendChild(ex1BunnyVideoContainer); // Append to the game container instead of questionForm
}

// Function to load the "Got It Video page
function loadGotItVideo() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear previous content

    const gotItVideoContainer = document.createElement("div");
    gotItVideoContainer.classList.add("gotit-video-container");

    // Add the got it video
    const gotItVideo = document.createElement("video");
    gotItVideo.src = "https://stanforduniversity.qualtrics.com/ControlPanel/File.php?F=F_7u8XEkQum4pUFwy" /*gotit*/
    gotItVideo.controls = true;
    gotItVideo.autoplay = true;
    gotItVideo.style.display = "block";
    gotItVideo.width = 600;
    gotItVideo.height = 400;
    gotItVideoContainer.appendChild(gotItVideo);

    // Add the Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.type = "button";

    nextButton.addEventListener("click", () => {
        console.log("Moving beyond the Got It Video page.");
        loadNextPage(); // Advance to the next page
    });

    gotItVideoContainer.appendChild(nextButton);
    gameContainer.appendChild(gotItVideoContainer); // Append to the game container instead of questionForm
}

// Start button logic
document.getElementById("start-button").addEventListener("click", function () {
    document.getElementById("start-container").style.display = "none"; // Hide start container
    document.getElementById("game-container").style.display = "none"; // Hide the game container initially
    loadPage(currentPage); // Load the first page of questions after preload
});