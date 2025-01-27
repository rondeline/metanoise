let currentPage = 1;  // Track the current page
let currentQuestionIndex = 0;  // Track the current question within the page
const responses = [];  // Store user responses

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

// Intro questions
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

// Preload media with a progress bar
function preloadMediaWithProgress(callback) {
    const totalFiles = videoFiles.length + audioFiles.length + imageFiles.length;
    let loadedFiles = 0;

    // Create progress bar
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

    function updateProgress(fileUrl) {
        loadedFiles++;
        const progress = (loadedFiles / totalFiles) * 100;
        progressFill.style.width = `${progress}%`;

        if (loadedFiles === totalFiles) {
            document.body.removeChild(progressBar);
            if (callback) callback();
        }
    }

    videoFiles.forEach((url) => {
        const video = document.createElement('video');
        video.src = url;
        video.preload = "auto";
        video.oncanplaythrough = () => updateProgress(url);
        video.onerror = () => console.error(`Failed to load video: ${url}`);
    });

    audioFiles.forEach((url) => {
        const audio = document.createElement('audio');
        audio.src = url;
        audio.preload = "auto";
        audio.oncanplaythrough = () => updateProgress(url);
        audio.onerror = () => console.error(`Failed to load audio: ${url}`);
    });

    imageFiles.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => updateProgress(url);
        img.onerror = () => console.error(`Failed to load image: ${url}`);
    });
}

// Start button logic
document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-container').style.display = 'none';
    preloadMediaWithProgress(() => {
        document.getElementById('game-container').style.display = 'block';
        loadPage(currentPage);
    });
});

// Load questions for the current page
function loadPage(pageNumber) {
    console.log("Loading page:", pageNumber);
    const questionsForPage = questions.filter(q => q.page === pageNumber);

    if (!questionsForPage.length) {
        console.warn(`No questions for page ${pageNumber}`);
        return;
    }

    const questionForm = document.getElementById('question-form');
    questionForm.innerHTML = '';
    questionsForPage.forEach((q) => renderQuestion(q, questionForm));

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.type = "button";
    nextButton.addEventListener('click', handleNextPage);
    questionForm.appendChild(nextButton);
}

function renderQuestion(question, questionForm) {
    const questionContainer = document.createElement('div');
    const questionText = document.createElement('p');
    questionText.textContent = question.text;
    questionContainer.appendChild(questionText);

    if (question.type === "mcq") {
        question.options.forEach((option) => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = "radio";
            radio.name = question.name;
            radio.value = option;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            questionContainer.appendChild(label);
        });
    } else if (question.type === "free") {
        const input = document.createElement('textarea');
        input.name = question.name;
        input.rows = 4;
        input.cols = 50;
        questionContainer.appendChild(input);
    }

    questionForm.appendChild(questionContainer);
}

// Handle the next button click
function handleNextPage() {
    const currentQuestions = questions.filter(q => q.page === currentPage);
    const question = currentQuestions[currentQuestionIndex];
    let answer;

    if (question.type === "mcq") {
        const selectedOption = document.querySelector(`input[name="${question.name}"]:checked`);
        if (selectedOption) {
            answer = selectedOption.value;
        }
    } else if (question.type === "free") {
        const input = document.querySelector(`textarea[name="${question.name}"]`);
        if (input && input.value.trim() !== "") {
            answer = input.value;
        }
    }

    if (answer) {
        responses.push({ question: question.text, answer });
    } else {
        alert("Please answer the question before proceeding.");
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        const questionForm = document.getElementById('question-form');
        questionForm.innerHTML = '';
        renderQuestion(currentQuestions[currentQuestionIndex], questionForm);
    } else {
        currentQuestionIndex = 0;
        currentPage++;
        loadPage(currentPage);
    }
}