const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlist');

function resquestApi(searchTerm){
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;

    fetch(url)
        .then(resp => resp.json())
        .then(result => displayResults(result))
}

function displayResults(result){

    resultPlaylist.classList.add('hidden');

    const artistName = document.getElementById('artist-name')
    const artistImage = document.getElementById('artist-img')

    document.querySelector("#grid-container-artists").innerHTML = '';

    result.forEach(el => {
        
        let templateArtist = `
                        <div class="artist-card" id="">
                            <div class="card-img">
                                <img id="artist-img" class="artist-img" src=${el.urlImg}>
                                <div class="play">
                                    <span class="fa fa-solid fa-play"></span>
                                </div>
                            </div>
                            <div class="card-text">
                                <a title="Foo Fighters" class="vst" href=""></a>
                                <span class="artist-name" id="artist-name">${el.name}</span>
                                <span class="artist-categorie">Artista</span>
                                </a>
                            </div>
                        </div>
        `

        document.querySelector("#grid-container-artists").insertAdjacentHTML("beforeend", templateArtist);
    });

    resultsArtist.classList.remove('hidden');
}

document.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    if(searchTerm === ''){
        resultPlaylist.classList.remove('hidden');
        resultsArtist.classList.add('hidden');
    }
    else{
        resultPlaylist.classList.add('hidden');
        resultsArtist.classList.remove('hidden');

        resquestApi(searchTerm);
    }
})