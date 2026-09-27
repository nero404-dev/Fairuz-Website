// script.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgYBRsDno53O1Gz4FHd6ALpW17iv-rnmo",
  authDomain: "fairuz-website.firebaseapp.com",
  projectId: "fairuz-website",
  storageBucket: "fairuz-website.firebasestorage.app",
  messagingSenderId: "113554025234",
  appId: "1:113554025234:web:01ad20a37fabb9e8d4e1cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";

// Scroll

window.scrollToSection = function (id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

//  js loading - loads the whole code 
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");

    const sources = new Set();

    // 1. All <img> tags
    document.querySelectorAll("img").forEach(img => {
        if (img.src) sources.add(img.src);
    });

    // 2. All elements with inline background-image
    document.querySelectorAll("*").forEach(el => {
        const style = getComputedStyle(el);
        const bg = style.backgroundImage;
        if (bg && bg !== "none") {
            const matches = bg.match(/url\((['"])?(.*?)\1\)/g);
            if (matches) {
                matches.forEach(m => {
                    const url = m.replace(/^url\((['"])?(.*?)\1\)$/, "$2");
                    sources.add(url);
                });
            }
        }
    });

    // 3. All data-bg attributes (like in your sidenav)
    document.querySelectorAll("[data-bg]").forEach(el => {
        const bg = el.getAttribute("data-bg");
        if (bg) {
            const url = bg.replace(/^url\((['"])?(.*?)\1\)$/, "$2");
            sources.add(url);
        }
    });

    // Turn into array
    const images = Array.from(sources);
    let loaded = 0;

    if (images.length === 0) {
        // no images? just hide loader immediately
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
            content.style.display = "block";
            content.style.opacity = "1";
        }, 600);
        return;
    }

    // Preload them all
    images.forEach(src => {
        const img = new Image();
        img.onload = img.onerror = () => {
            loaded++;
            if (loaded === images.length) {
                preloader.style.opacity = "0";
                setTimeout(() => {
                    preloader.style.display = "none";
                    content.style.display = "block";
                    content.style.opacity = "1";
                }, 600);
            }
        };
        img.src = src;
    });
});

//  js - only remove hash after nav clicks 
document.querySelectorAll('a[data-target]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

//  js resp nav 
window.openNav = function () {
    document.getElementById("mySidenav").style.width = "100%";
}

window.closeNav = function () {
    document.getElementById("mySidenav").style.width = "0";
}

//  js side nav - animation 
const sidenav = document.getElementById('mySidenav');
const links = sidenav.querySelectorAll('a[data-bg]');
// ✅ Get default background-image from CSS
const defaultBg = getComputedStyle(sidenav).backgroundImage;

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const bg = link.getAttribute('data-bg');
        sidenav.style.backgroundImage = bg;
    });
    link.addEventListener('mouseleave', () => {
        sidenav.style.backgroundImage = defaultBg;
    });
});

//  js - nav active state 
// Select all links that have data-target
const allLinks = document.querySelectorAll("a[data-target]");

allLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const target = link.getAttribute("data-target");

        // Remove active class from all links
        allLinks.forEach(l => l.classList.remove("active"));

        // Add active class to all links that match the clicked target
        allLinks.forEach(l => {
            if (l.getAttribute("data-target") === target) {
                l.classList.add("active");
            }
        });
    });
});

const form = document.getElementById('inquiriesForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Your WhatsApp number (IMPORTANT: use country code, no +, no spaces)
    const whatsappNumber = "96176134251"; // <-- replace with your number

    // Build message
    const message = `Hello, I'd like to make an inquiry regarding Fairuz's Website: \n\nFull Name: \n${firstName} ${lastName}\n——————\n\nPhone Number: \n${phone}\n——————\n\nEmail Address: \n${email || ' - N/A - '}\n\n————————————————\nThank you! \n`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect to WhatsApp
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(url, '_blank');

    // Optional: reset form
    form.reset();
});

function checkScreenSize() {
    const isMobile = window.innerWidth <= 900;
    const isLandscape = window.innerWidth > window.innerHeight;

    if (isMobile && isLandscape) {
        document.body.classList.add("mobile-landscape");
    } else {
        document.body.classList.remove("mobile-landscape");
    }
}

// Run on load
checkScreenSize();

// Run on resize (important for rotation)
window.addEventListener("resize", checkScreenSize);

// // theme-mode js

const themeCheckbox = document.getElementById("input");
const wikiFrame = document.getElementById("wikiFrame");

themeCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", themeCheckbox.checked);

    const url = new URL(wikiFrame.src);

    url.searchParams.set(
        "vectornightmode",
        themeCheckbox.checked ? "1" : "0"
    );

    wikiFrame.src = url.toString();
});

// swap image

document.querySelectorAll(".swap-image").forEach(img => {
    new Image().src = img.dataset.hover;
});

// Toggle Class

const showMoreImgs = document.getElementById("showMoreImgs");
const moreImgs = document.getElementById("moreImgs");

showMoreImgs.addEventListener("click", () => {
    moreImgs.classList.toggle("hidden");
});

// =========================
// Playlist
// =========================

const songs = [
    {
        title: "Aa Hadir El Bosta",
        artist: "Fairuz",
        src: "music/Fairuz Songs/Aa Hadir El Bosta.mp3",
        cover: "gallery/pack_two/EjYe6WAQ-N1gNNi2eeqi5UAf7oaihrG_8TdeaoH_EqOvlRGs_q3gsI79FSfaKzc5UIrepfNEctOQ_k5K9ySB98jS-LZNFhDcp1lwSk2Cx87Z7if829De32a0ZklauuS1-UibNDwhwf423l6VvDwrgsOLpR6ZGssjws7tbX3t4Tykfjakn0uLF76Iz9dv0D2O.jpeg"
    },
    {
        title: "Aatiny El Nay W Ghanny",
        artist: "Fairuz",
        src: "music/Fairuz Songs/Aatiny El Nay W Ghanny.mp3",
        cover: "pictures/fairuz-1.png"
    },
    {
        title: "Adesh Kan Fi Nas",
        artist: "Fairuz",
        src: "music/Fairuz Songs/Adesh Kan Fi Nas.mp3",
        cover: "pictures/Fairouz_en_concert_à_Bercy_1988..jpg"
    },
];

// =========================
// Elements
// =========================

const audio = document.getElementById("audio");

const title = document.querySelector(".info h2");
const artist = document.querySelector(".info p");

const cover = document.querySelector(".cover img");
const background = document.querySelector(".background");

const playBtn = document.getElementById("play");
const playIcon = playBtn.querySelector("i");

const prevBtn = document.querySelectorAll(".controls button")[0];
const nextBtn = document.querySelectorAll(".controls button")[2];

const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress span");

const currentTimeEl = document.getElementById("current");
const durationEl = document.querySelector(".time span:last-child");

// =========================
// Variables
// =========================

let currentSong = 0;
let playing = false;

// =========================
// Load Song
// =========================

function loadSong(index){

    const song = songs[index];

    audio.src = song.src;

    title.textContent = song.title;
    artist.textContent = song.artist;

    cover.src = song.cover;

    background.style.backgroundImage = `url(${song.cover})`;

}

loadSong(currentSong);

// =========================
// Play
// =========================

function playSong(){

    audio.play();

    playing = true;

    playIcon.className = "fa fa-pause";

}

// =========================
// Pause
// =========================

function pauseSong(){

    audio.pause();

    playing = false;

    playIcon.className = "fa fa-play";

}

// =========================
// Play Button
// =========================

playBtn.onclick = () => {

    if(playing){

        pauseSong();

    }else{

        playSong();

    }

};

// =========================
// Next Song
// =========================

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

}

nextBtn.onclick = nextSong;

// =========================
// Previous Song
// =========================

function previousSong(){

    currentSong--;

    if(currentSong < 0){

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

}

prevBtn.onclick = previousSong;

// =========================
// Auto Next
// =========================

audio.addEventListener("ended", nextSong);

// =========================
// Update Progress
// =========================

audio.addEventListener("timeupdate", () => {

    if(audio.duration){

        const percent =
            (audio.currentTime / audio.duration) * 100;

        progressBar.style.width = percent + "%";

        currentTimeEl.textContent =
            formatTime(audio.currentTime);

    }

});

// =========================
// Duration
// =========================

audio.addEventListener("loadedmetadata", () => {

    durationEl.textContent =
        formatTime(audio.duration);

});

// =========================
// Seek
// =========================

progress.onclick = (e) => {

    const width = progress.clientWidth;

    const click = e.offsetX;

    audio.currentTime =
        (click / width) * audio.duration;

};

// =========================
// Format Time
// =========================

function formatTime(seconds){

    if(isNaN(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60);

    return `${min}:${String(sec).padStart(2,"0")}`;

}

// =========================
// Optional Keyboard Shortcuts
// =========================

// document.addEventListener("keydown", (e) => {

//     switch(e.code){

//         case "Space":

//             e.preventDefault();

//             playing ? pauseSong() : playSong();

//             break;

//         case "ArrowRight":

//             nextSong();

//             break;

//         case "ArrowLeft":

//             previousSong();

//             break;

//     }

// });

// Review

let selectedRating = 5;

const stars = document.querySelectorAll(".stars span");

stars.forEach(star => {

    star.addEventListener("click", () => {

        selectedRating = Number(star.dataset.rate);

        stars.forEach(s => {

            s.classList.toggle(
                "active",
                Number(s.dataset.rate) <= selectedRating
            );

        });

    });

});

const db = getDatabase(app);

document
.getElementById("submitReview")
.addEventListener("click", () => {

    const name =
        document.getElementById("name").value.trim();

    const type =
        document.getElementById("type").value;

    const message =
        document.getElementById("message").value.trim();

    if (!name || !message) return;

    push(ref(db, "reviews"), {
        name,
        rating: type === "review" ? selectedRating : 0,
        type,
        message,
        date: Date.now()
    })
    .then(() => {
        console.log("Saved!");
    })
    .catch(error => {
        console.error(error);
    });

});

const container =
document.getElementById("reviewsContainer");

onValue(ref(db, "reviews"), snapshot => {

    container.innerHTML = "";

    const data = snapshot.val();

    if (!data) return;

    const list = Object.entries(data);

    list.reverse();

    list.forEach(([id, item]) => {

        const div = document.createElement("div");

        let stars = "";

        if(item.type === "review"){

            stars =
                "★".repeat(item.rating) +
                "☆".repeat(5-item.rating);

        }

        div.innerHTML = `

            <div class="review-item">

                ${
                    item.type==="review"
                    ? `<div class="rating">Rating: ${stars}</div>`
                    : `<div class="rating">❓ Request</div>`
                }

                <h4>${item.name}</h4>

                <p>${item.message}</p>

            </div>

        `;

        container.appendChild(div);

    });

});