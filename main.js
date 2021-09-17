var aboutMe = 'aboutMe';
var experience = 'experience';
var hobbies = 'hobbies';
var blocksListInViewOrder = [aboutMe, experience, hobbies];
var radioGroup = document.querySelector('.radio-group');
var cube = document.getElementById('cube');
cube.style.transform = 'rotateX(-90deg)';

function changeSide() {
    var checkedRadio = radioGroup.querySelector(':checked');
    switch (checkedRadio.value) {
        case 'experience':
            cube.style.transform = 'rotateX(0deg)';
            document.title = 'Experience';
            break;
        case 'aboutMe':
            cube.style.transform = 'rotateX(-90deg)';
            document.title = 'About me';
            break;
        case 'hobbies':
            cube.style.transform = 'rotateX(90deg)';
            document.title = 'Hobbies';
            break;
    
        default:
            alert("Oh no there was a issue to change view :(");
            break;
    }
  }

radioGroup.addEventListener( 'change', changeSide );

document.onkeydown = checkKey;

function checkKey(e) {
    var checkedRadio = radioGroup.querySelector(':checked');
    var choosenIndex = blocksListInViewOrder.findIndex(function(el){return el === checkedRadio.value})
    var tabAboutMe = document.getElementById("tab-aboutMe");
    var tabExperience = document.getElementById("tab-experience");
    var tabHobbies = document.getElementById("tab-hobbies");
    
    e = e || window.event;

    if (e.keyCode == '38') {
        switch (checkedRadio.value) {
            case 'aboutMe':
                tabAboutMe.checked = false;
                tabHobbies.checked = true;
                break;
            case 'experience':
                tabExperience.checked = false;
                tabAboutMe.checked = true;
                break;
            case 'hobbies':
                tabHobbies.checked = false;
                tabExperience.checked = true;
                break;
        
            default:
                alert("Oh no there was a issue to change view :(");
                break;
        }
    }
    if (e.keyCode == '40') {
        switch (checkedRadio.value) {
            case 'aboutMe':
                tabAboutMe.checked = false;
                tabExperience.checked = true;
                break;
            case 'experience':
                tabExperience.checked = false;
                tabHobbies.checked = true;
                break;
            case 'hobbies':
                tabHobbies.checked = false;
                tabAboutMe.checked = true;
                break;
        
            default:
                alert("Oh no there was a issue to change view :(");
                break;
        }
    }
    changeSide();
}