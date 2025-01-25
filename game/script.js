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
    console.log('Total Files to Preload:', videoFiles.length + audioFiles.length + imageFiles.length);
    let loadedFiles = 0;

    // Create a progress bar
    const progressBar = document.createElement('div');
    progressBar.style.width = "50%";
    progressBar.style.height = "20px";
    progressBar.style.border = "1px solid #000";
    progressBar.style.position = "absolute";
    progressBar.style.top = "50%";
    progressBar.style.left = "50%";
    progressBar.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(progressBar);

    const progressFill = document.createElement('div');
    progressFill.style.height = "100%";
    progressFill.style.width = "0%";
    progressFill.style.backgroundColor = "#00f";
    progressBar.appendChild(progressFill);

    // Function to update progress
    function updateProgress(fileUrl) {
        loadedFiles++;
        console.log(`Loaded: ${fileUrl} (${loadedFiles}/${totalFiles})`);
        const progress = (loadedFiles / totalFiles) * 100;
        progressFill.style.width = `${progress}%`;

        if (loadedFiles === totalFiles) {
            console.log("Media preloading complete!");
            document.body.removeChild(progressBar); // Remove the progress bar

            // Call the callback function when preloading is complete
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
            video.oncanplaythrough = () => updateProgress(videoUrl, loadPage);
            video.onerror = () => console.error(`Failed to load video: ${videoUrl}`);
            video.style.display = "none"; // Hide the video element
            document.body.appendChild(video); // Append to the body temporarily
        });

        // Preload audio
        audioFiles.forEach((audioUrl) => {
            const audio = document.createElement('audio');
            audio.src = audioUrl;
            audio.preload = "auto"; // Preload the audio
            audio.oncanplaythrough = () => updateProgress(audioUrl, loadPage);
            audio.onerror = () => console.error(`Failed to load audio: ${audioUrl}`);
            audio.style.display = "none"; // Hide the audio element
            document.body.appendChild(audio); // Append to the body temporarily
        });

        // Preload images
        imageFiles.forEach((imageUrl) => {
            const img = new Image();
            img.src = imageUrl; // Set the image source
            img.onload = updateProgress(imageUrl);
            img.onerror = () => console.error(`Failed to load image: ${imageUrl}`);
        });
}

// Start button logic
document.getElementById('start-button').addEventListener('click', function () {
    // Hide the start container
    document.getElementById('start-container').style.display = 'none';
  
    // Preload media files before showing the game container
    preloadMediaWithProgress(() => {
        document.getElementById('game-container').style.display = 'block';
        // Load the first page of questions
        loadPage(currentPage);
    });
});

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

//Hand tablet to child
function loadHandTablet() {
    // Clear any existing content in the form
    const questionForm = document.getElementById('question-form');
    questionForm.innerHTML = '';
    
    // Create new container 
    const handTabletContainer = document.createElement('div');
    handTabletContainer.classList.add('hand-tablet-container');

    // Add text
    const handTabletText = document.createElement('p');
    handTabletText.textContent = "hand tablet to child";
    handTabletContainer.appendChild(handTabletText);

    // Add next button
    handTabletContainer.innerHTML += '<button type="button" id="next-button">Next</button>';

    // Add the hand tablet container to the form
    questionForm.appendChild(handTabletContainer);

    // Add event listener to the new Next button
    document.getElementById('next-button').addEventListener('click', function() {
        // Load instruction video
        currentPage++;
        loadPage(currentPage);
    });
}


let currentPage = 1; // Track the current page
let currentQuestionIndex = 0; // Track the current question within the page
const responses = []; // Store user responses

// Function to load questions for the current page
function loadPage(pageNumber) {
    // Filter questions for the current page
    const questionsForPage = questions.filter(q => q.page === pageNumber);

    // Clear any existing content in the form
    const questionForm = document.getElementById('question-form');
    questionForm.innerHTML = '';

    // Render each question for the current page
    questionsForPage.forEach((question) => {
        renderQuestion(question, questionForm);
    });

    // Add the Next button
    questionForm.innerHTML += '<button type="button" id="next-button">Next</button>';

    // Add event listener to the new Next button
    document.getElementById('next-button').addEventListener('click', handleNextPage);
}

// Function to render a single question
function renderQuestion(question, questionForm) {
    // Create a new div for each question
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');

    // Set the question text inside the container
    const questionText = document.createElement('p');
    questionText.textContent = question.text;
    questionContainer.appendChild(questionText);

    // Render the options for multiple-choice questions
    if (question.type === "mcq") {
        question.options.forEach((option, index) => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = question.name;
            radio.value = option;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option.charAt(0).toUpperCase() + option.slice(1)));
            questionContainer.appendChild(label);
            questionContainer.appendChild(document.createElement('br'));

            // If the option is "other", create the "Other" input field
            if (option === "other") {
                const otherInput = document.createElement('input');
                otherInput.type = 'text';
                otherInput.id = `other-text-${index}`;  // Ensure unique id for each "Other" input
                otherInput.placeholder = "Please type your response here";
                questionContainer.appendChild(otherInput);

            }
        });
    } else if (question.type === "free") {
        // Render a text input for free-response questions
        const freeResponseInput = document.createElement('textarea');
        freeResponseInput.id = "free-response";
        freeResponseInput.name = question.name;
        freeResponseInput.rows = 4;
        freeResponseInput.cols = 50;
        freeResponseInput.placeholder = "Type your response here";
        questionContainer.appendChild(freeResponseInput);
        questionContainer.appendChild(document.createElement('br'));
    }

    // Add the question container to the form
    questionForm.appendChild(questionContainer);
}

// Function to handle the "Next" button click
function handleNextPage() {
    const question = questions[currentQuestionIndex];

    // Capture the response based on the question type
    let answer;
    if (question.type === "mcq") {
        const selectedOption = document.querySelector(`input[name="${question.name}"]:checked`);
        if (selectedOption) {
            answer = selectedOption.value;
            if (answer === "other") {
                const otherInput = document.getElementById(`other-text-${currentQuestionIndex}`);
                if (otherInput && otherInput.value.trim() !== "") {
                    answer = otherInput.value;
                }
            }
        }
    } else if (question.type === "free") {
        const freeResponseInput = document.getElementById("free-response");
        if (freeResponseInput && freeResponseInput.value.trim() !== "") {
            answer = freeResponseInput.value;
        }
    }

    if (answer) {
        responses.push({ question: question.text, answer });
        console.log("Current Responses:", responses);
    } else {
        alert("Please answer the question before proceeding.");
        return;
    }

    // Move to the next question or next page
    currentQuestionIndex++;

    // If we're done with set up questions, load the hand tablet instruction
    if (currentQuestionIndex < questions.filter(q => q.page === currentPage).length) {
        if (currentPage == 1) {
            loadHandTablet();
    } else {
        currentPage++;
        loadPage (currentPage);
    }
} else {
    loadPage(currentPage);
}
}

// Function to download responses as a CSV
function downloadResponses() {
    let csvContent = "data:text/csv;charset=utf-8,Question,Answer\n";
    responses.forEach(response => {
        csvContent += `${response.question},${response.answer}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "responses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
