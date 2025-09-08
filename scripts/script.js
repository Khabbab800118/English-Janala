const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((reponse) => reponse.json())
        .then((json) => displayLessons(json.data))
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"))
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    dispayWordDetails(details)
}

const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`)
    return (htmlElements.join(" "));

}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const dispayWordDetails = (word) => {
    console.log(word);

    const modalContainer = document.getElementById("details-container");
    modalContainer.innerHTML = `
    <div id="details-container" class="space-y-3">
                <h1 class="text-xl font-bold">${word.data.word ? word.data.word : "শব্দ পাওয়া যায়নি"}(<i class="fa-solid fa-microphone-lines"></i>:${word.data.pronunciation ? word.data.pronunciation : "Pronunciation পাওয়া যায়নি"})</h1>
                <p class="text-lg font-semibold">Meaning</p>
                <p class="font-bangla font-semibold">${word.data.meaning ? word.data.meaning : "অর্থ পাওয়া যায়নি"}</p>
                <h1 class="text-xl font-bold">Example</h1>
                <p>${word.data.sentence ? word.data.sentence : "Sentence পাওয়া যায়নি"}</p>
                <div class="flex flex-col">
                    <h1 class="font-bangla text-lg font-bold">সমার্থক শব্দ</h1>
                    <div class="">${createElement(word.data.synonyms)}</div>
                </div>
            </div>
    `
    document.getElementById("my_modal_5").showModal();
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        });
}

const displayLevelWord = (words) => {
    manageSpinner(false);
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ''
    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="flex flex-col items-center text-center col-span-full font-bangla space-y-6 py-10">
                <img src="./assets/alert-error.png" alt="">
                <p class="font-extralight text-sm text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="font-semibold text-4xl">নেক্সট Lesson এ যান</h1>
            </div>
            `
        return;
    }
    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML = `
        <div class="bg-white text-center p-10 rounded-xl space-y-5">
            <h2 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="text-sm font-semibold">Meaning /Pronounciation</p>
            <p class="text-xl font-bold"><span>${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</span> / <span>${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}</span></p>
            <div class="flex justify-between">
                <button class="btn" onclick="loadWordDetails(${word.id})">
                    <i class="fa-solid fa-circle-info rounded-lg"></i>
                </button>
                <button class="btn">
                    <i class="fa-solid fa-volume-high rounded-lg"></i>
                </button>
            </div>
        </div>
        `
        wordContainer.append(card)
    });

}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    for (let lesson of lessons) {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no} </button>
        `
        levelContainer.append(btnDiv)
    }
};
loadLessons();

document.getElementById('search-btn').addEventListener('click', () => {
    removeActive();
    const input = document.getElementById('search-input');
    const searchValue = input.value.trim().toLowerCase();
    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue))
            displayLevelWord(filterWords);
        }
        )
})