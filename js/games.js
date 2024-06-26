// Summary: Picture galleries and carousels
// Description: Writing JavaScript to help streamline the process for creating picture galleries and carousels for my artwork.
// Author: Ashley Lu
// Created: 09.09.2022

// code references: https://www.tutorialspoint.com/how-to-import-local-json-file-data-to-my-javascript-variable
// https://css-tricks.com/creating-a-modal-image-gallery-with-bootstrap-components/#top-of-site
fetch("../../js/games.json")
.then(response => {
    return response.json();
})
.then(data => {
    createGalleryImgs(data)
    createCarouselImgs(data) 
});

var groupProjects = { 
    "Dewdrop Cafe": "dewdrop-cafe",
    "Ocean Odyssey": "ocean-odyssey",
    "Love Heist Romeo": "love-heist-romeo",
    "Slumber the Sea":"slumber-the-sea",
    "HEART ♥ BREAKOUT": "heart-breakout",
    "Suscord IdleModerator":"suscord"
};
var soloProjects = {
    "Solemn Skies": "solemn-skies",
    "Modded Rocket Patrol": "modded-rp"
};
createPageNav(groupProjects, soloProjects);

/* FUNCTIONS */
function createPageNav(GroupDictionary, SoloDictionary){ 
    for (let project_name in GroupDictionary) {
        var project_pathing = GroupDictionary[project_name]
        $("#group-projects").append("<li><a href='../"+project_pathing+"'>"+project_name+"</a></li>")
        $("#games-group-projects").append("<li><a href='../games/"+project_pathing+"'>"+project_name+"</a></li>")
    }
    for (let project_name in SoloDictionary) {
        var project_pathing = SoloDictionary[project_name]
        $("#solo-projects").append("<li><a href='../"+project_pathing+"'>"+project_name+"</a></li>")
        $("#games-solo-projects").append("<li><a href='../games/"+project_pathing+"'>"+project_name+"</a></li>")
    }
 }

function createGalleryImgs(imgJSON) {
    // finds if #foldername-gallery exists in html and creates a gallery in that div 
    for (let gallery in imgJSON) {
        if ($("#"+gallery+"-gallery").length) {
            var index = 0; // to help keep track of gallery image indexes
            var divEl = $("#"+gallery+"-gallery");
            for (let img of imgJSON[gallery]) {
                var image = img["image"];
                divEl.append("<div class='col-12 col-sm-6 col-md-3'><img class='w-100' src='../../img/games/"+gallery+"/"+image+"' data-bs-target='#"+gallery+"-carousel' data-bs-slide-to='"+index+"'></div>");
                index += 1;
            }
        }
        else {
            continue
        }
    }
}

function createCarouselImgs(imgJSON) {
    // finds if target modal exists and creates/appends carousel for associated gallery in #modals
    var modalsEl = $("#modals");
    for (let gallery in imgJSON) {
        if ($("#"+gallery+"-gallery").length) {
            var index = 0;
            // asssigning all the html code into lines for organization purposes
            var l1 = "<div class='modal fade' id='"+gallery+"-modal' tabindex='-1'>";
            var l2 = "<div class='modal-dialog modal-xl'><div class='modal-content'><div class='modal-header'>";
            var l3 = "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div>";
            var l4 = "<div class='modal-body'><div id='"+gallery+"-carousel' class='carousel carousel-dark slide' data-bs-ride='carousel'>";
            var l5 = "<div class='carousel-inner'>";
            var html = l1+l2+l3+l4+l5;
            for (let img of imgJSON[gallery]) {
                var image = img["image"];
                var caption = img["caption"];
                if (index == 0) {
                    var l6 = "<div class='carousel-item active'>";
                } else {
                    var l6 = "<div class='carousel-item'>";
                }
                var l7 = "<img class='d-block w-100' src='../../img/games/"+gallery+"/"+image+"' data-bs-target='#"+gallery+"-carousel'>"
                if (caption != "") {
                    var l8 = "<div class='carousel-caption d-non d-md-block'><p></p><p class='fredoka-one fw-normal'>"+caption+"</p></div></div>"
                } else {
                    var l8 = "</div>"
                }
                    html += l6 + l7 + l8;
                index += 1;
            }
            var l9 = "<button class='carousel-control-prev' type='button' data-bs-target='#"+gallery+"-carousel' data-bs-slide='prev'><span class='carousel-control-prev-icon' aria-hidden='true'></span><span class='visually-hidden'>Previous</span></button>";
            var l10 = "<button class='carousel-control-next' type='button' data-bs-target='#"+gallery+"-carousel' data-bs-slide='next'><span class='carousel-control-next-icon' aria-hidden='true'></span><span class='visually-hidden'>Next</span></button>";
            var l11 = "</div></div></div></div></div>"
            html += l9 + l10 + l11;
            modalsEl.append(html);
        }
        else {
            continue
        }
    }
}

