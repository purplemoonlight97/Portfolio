const headerHTML = `
                    <div id="header" class="headerBar">
                    <div id="links"></div>
                        <span id="projectsButton">
                            Projects
                        </span>
                    </div>
                    <div id="projects" class="projectsHolder"></div>
                    <div id="mobileOptionButton" class="sideButton">
                        <img src="../images/hamburger.png" height="100%" width="100%" alt="Button for expanding side menu" />
                    </div>
                    <div id="mobileOptionMenu" class="sideMenu"></div>
                    <link href="https://portfolio-vmqu.vercel.app//Header/header.css" rel="stylesheet"/>
                    `;

document.getElementById('websiteHeader').innerHTML = headerHTML;

const header = document.getElementById("header");
const projectsButton = document.getElementById("projectsButton");
const links = document.getElementById("links");
const projects = document.getElementById("projects");
const burgerButton = document.getElementById("mobileOptionButton");
const mobileMenu = document.getElementById("mobileOptionMenu");
const speedFactor = 3; //set higher to increase animation speed
const projectsArray = [
    {
    name: "Pokemon HGSS Aprijuice Calculator",
    link: "https://aprijuice-calculator.vercel.app/"
    },
    /*{
    name: "Four Function Calculator",
    link: ""
    },*/
    {
    name: "Global Temperatures",
    link: "https://portfolio-vmqu.vercel.app//HeatMap/heatMap.html"
    },
    {
        name:"US Education Rates",
        link:"https://portfolio-vmqu.vercel.app//ChoroplethMap/Choropleth.html"
    },
];
const otherLinkArray = [
    {
    name: "Home",
    link: "https://portfolio-vmqu.vercel.app/"
    },
    {
    name: "Portfolio",
    link: "https://portfolio-vmqu.vercel.app/index.html#portfolio"
    },
    {
        name: "Contact",
        link: "https://portfolio-vmqu.vercel.app/index.html#contact"
    },
    /*{
    name: "Resume",
    link: "https://portfolio-vmqu.vercel.app/index.html"
    }*/
];
const numProjects = projectsArray.length;

let i = Number(header.offsetWidth);
let clicked = false;
let animating = false;

projectsButton.addEventListener("click", () => {
    if(!animating){
    while (i >= 0 && !clicked){ 
        (function(i) {
            setTimeout(function() {
                header.style.width = i < window.innerWidth/4 ? window.innerWidth/4 : i + "px";
                links.style.right = "calc(100px - " + Number(window.innerWidth - i) + "px)";
                projectsButton.style.width = Number(window.innerWidth - i)/4 + 100 <= window.innerWidth/4 ? Number(window.innerWidth - i)/4 + 100 + "px" : window.innerWidth/4 + "px"//+ "px";
                projects.style.top = ((numProjects * -50) + window.innerWidth - i) <= 50 ? ((numProjects * -50) + window.innerWidth - i) + "px" : 50 + "px";
                projects.style.zIndex = projects.style.top === "50px" ? 3 : 2;
            }, (window.innerWidth - i)/speedFactor);
        })(i--)
    };

    while (clicked && i <= window.innerWidth){
        (function(i) {
            setTimeout(function() {
                header.style.width = i < window.innerWidth/4 ? window.innerWidth/4 : i + "px";
                links.style.right = "calc(100px - " + Number(window.innerWidth - i) + "px)";
                projectsButton.style.width = (window.innerWidth - i)/4 + 100 + "px"
                projects.style.top = ((numProjects * -50) + window.innerWidth - i) <= 50 ? ((numProjects * -50) + window.innerWidth - i) + "px" : 50 + "px";
                projects.style.zIndex = projects.style.top === "50px" ? 3 : 2;
            }, i/speedFactor);
        })(i++)
    };
    setTimeout(() => {
        animating = false;
        if(clicked){
            header.style.width = "25vw";
            projectsButton.style.width = "100%";
        } else {
            header.style.width = "100vw";
            projectsButton.style.width = "100px";
            links.style.right = "100px";
        }
    }, window.innerWidth/speedFactor);
    clicked = !clicked;
    animating = true;
    }
});

let j = 0;
let mobileClicked = false;

burgerButton.addEventListener("click", () => {
    if(!animating){
    while(j <= 200 && !mobileClicked){
        (function(j){
            setTimeout(function(){
                burgerButton.style.left = "calc(10px + " + j + "px)";
                mobileMenu.style.left = Number(j - 200) + "px";
            }, j / speedFactor);
        })(j++)
    };

    while(j >= 0 && mobileClicked){
        (function(j){
            setTimeout(function(){
                burgerButton.style.left = "calc(10px + " + j + "px)";
                mobileMenu.style.left = Number(j - 200) + "px";
            }, (201-j) / speedFactor);
        })(j--)
    };

    setTimeout(() => {
        animating = false;
        if(mobileClicked){
            mobileMenu.style.left = "0px";
            burgerButton.style.left = "210px";
        } else {
            mobileMenu.style.left = "-200px";
            burgerButton.style.left = "10px";
        }
    }, 202/speedFactor);
    mobileClicked = !mobileClicked;
    animating = true;
    }
});

function primeProjects(){
    let projectsHTML = "";
    let otherHTML = "";

    projectsArray.forEach((e) => {
        projectsHTML += `<a href="${e.link}" class="individualProject" target="_parent">${e.name}</a>`;
    });
    
    otherLinkArray.forEach((e) => {
        otherHTML += `<a href="${e.link}" class="otherLink" target="_parent">${e.name}</a>`
    });

    projects.innerHTML = projectsHTML;
    links.innerHTML = otherHTML;
    mobileMenu.innerHTML = otherHTML + `<div><span>Projects</span></div>` + projectsHTML;
};
window.onload = primeProjects;