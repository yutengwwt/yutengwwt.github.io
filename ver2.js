let currentCard = 0;
function nextPrev(n) {
    let x = document.getElementsByClassName("card")
    console.log(n)
    console.log(validateForm())
    if (n == 1 && !validateForm()) {
        console.log('invalid')
        return false;
    }
    let y = document.getElementsByClassName("step")
    x[currentCard].classList.toggle("center")
    y[currentCard].classList.toggle("active")
    x[currentCard].classList.add(n===1? "left-shift":"right-shift")
    x[currentCard+n].classList.add(n===1? "left-shift":"right-shift")
    x[currentCard].classList.remove(n===1? "right-shift":"left-shift")
    x[currentCard+n].classList.remove(n===1? "right-shift":"left-shift")
    currentCard += n
    x[currentCard].classList.toggle("center")
    y[currentCard].classList.toggle("active")
}   
function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("card");
    y = x[currentCard].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].classList.add("invalid")
        // and set the current valid status to false:
        valid = false;
      } else y[i].classList.remove("invalid")
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) document.getElementsByClassName("step")[currentCard].classList.add("finish")
    else document.getElementsByClassName("step")[currentCard].classList.remove("finish")
    return valid; // return the valid status
}


let mode = [false, false, false, false, false]
function addMenSingle() {
    if (!mode[0]) {
        mode[0] = true;
        document.getElementById("MS").insertAdjacentHTML("beforeend",`<input type="number" name="MenSingleFee" id="MenSingleFee" placeholder='報名費 (每人)...'>`)
    }
    const last_input = document.getElementById("MenSingle");
    let html = `<li><input type="text" name="MenSingle[]"></li>`;
    last_input.insertAdjacentHTML("beforeend", html);
}
function addMenDouble() {
    if (!mode[1]) {
        mode[1] = true;
        document.getElementById("MD").insertAdjacentHTML("beforeend",`<br><input type="number" name="MenDoubleFee" id="MenDoubleFee" placeholder='報名費 (每組)...'>`)
    }
    const last_input = document.getElementById("MenDouble");
    let html = `<li><input type="text" name="MenDouble[]"><input type="text" name="MenDouble[]"></li>`;
    last_input.insertAdjacentHTML("beforeend", html);
}
function addWomenSingle() {
    if (!mode[2]) {
        mode[2] = true;
        document.getElementById("WS").insertAdjacentHTML("beforeend",`<br><input type="number" name="WomenSingleFee" id="WomenSingleFee" placeholder='報名費 (每人)...'>`)
    }
    const last_input = document.getElementById("WomenSingle");
    let html = `<li><input type="text" name="WomenSingle[]"></li>`;
    last_input.insertAdjacentHTML("beforeend", html);
}
function addWomenDouble() {
    if (!mode[3]) {
        mode[3] = true;
        document.getElementById("WD").insertAdjacentHTML("beforeend",`<br><input type="number" name="WomenDoubleFee" id="WomenDoubleFee" placeholder='報名費 (每組)...'>`)
    }
    const last_input = document.getElementById("WomenDouble");
    let html = `<li><input type="text" name="WomenDouble[]"><input type="text" name="WomenDouble[]"></li>`;
    last_input.insertAdjacentHTML("beforeend", html);
}
function addMixedDouble() {
    if (!mode[4]) {
        mode[4] = true;
        document.getElementById("MIX").insertAdjacentHTML("beforeend",`<br><input type="number" name="MixedDoubleFee" id="MixedDoubleFee" placeholder='報名費 (每組)...'>`)
    }
    const last_input = document.getElementById("MixedDouble");
    let html = `<li><input type="text" name="MixedDouble[]"><input type="text" name="MixedDouble[]"></li>`;
    last_input.insertAdjacentHTML("beforeend", html);
}
let teamId = 0;
function addTeam() {
    if (teamId === 0) document.getElementById("TEAM").insertAdjacentHTML("beforeend",`<br><input type="number" name="TeamFee" id="TeamFee" placeholder='報名費 (每隊)...'>`)
    const team_list = document.getElementById("TeamList")
    let html = `<div class="team-item"><li><button type="button" onclick="addTeamMember('team-id-${teamId}')">隊員++</button><ol id="team-id-${teamId}" style="list-style:none;"></ol></li><div>`
    team_list.insertAdjacentHTML("beforeend", html)
    teamId += 1;
}
function addTeamMember(team_index) {
    const last_input = document.getElementById(team_index);
    let numb = team_index.match(/\d/g);
    numb = numb.join("");
    let html = `<li><input type="text" name="Team_${numb}-Member[]"></li>`;
    last_input.insertAdjacentHTML("beforeend", html);
}

function resetIndividual() {
    const nodes = [
        document.getElementById("MenSingle"), 
        document.getElementById("MenDouble"),
        document.getElementById("WomenSingle"),
        document.getElementById("WomenDouble"),
        document.getElementById("MixedDouble")
    ]
    nodes.forEach(node => {
        while (node.lastElementChild) {
            node.removeChild(node.lastElementChild);
          }
    })
    for (let idx = 0; idx < 5; idx+=1)
        mode[idx] = false
    const modeFees = ["MenSingleFee", "MenDoubleFee", "WomenSingleFee", "WomenDoubleFee", "MixedDoubleFee"]
    modeFees.forEach(modeFee => {
        const temp = document.getElementById(modeFee)
        if (temp) temp.remove()
    })
}

function resetTeams() {
    teamId = 0;
    const team_list = document.getElementById("TeamList")
    while (team_list.lastElementChild) {
      team_list.removeChild(team_list.lastElementChild);
    }
    const temp = document.getElementById("TeamFee")
    if (temp) temp.remove()
}

console.log('This js script running')