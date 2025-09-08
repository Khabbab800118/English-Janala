const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((reponse) => reponse.json())
        .then((json) => displayLessons(json.data))
}
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data));
}
// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML=''
    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div")
        card.innerHTML = `
        <div class="bg-white text-center p-10 rounded-xl space-y-5">
            <h2 class="text-xl font-bold">${word.word}</h2>
            <p class="text-sm font-semibold">Meaning /Pronounciation</p>
            <p class="text-xl font-bold"><span>${word.meaning}</span> / <span>${word.pronunciation}</span></p>
            <div class="flex justify-between">
                <button class="btn">
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no} </button>
        `
        levelContainer.append(btnDiv)
    }
};
loadLessons();