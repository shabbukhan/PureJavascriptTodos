'use strict';


const ALPHANUMERIC_REGEX = /^[a-zA-Z ]+$/;
const setInvalid = (errmsg, message) => {
        errmsg.className = "show-error";
        errmsg.innerHTML = message;
    }
    /* event bindings of tab one */
    // section one button click
const validateUser = e => {
    const username = document.forms.userForm.username.value;
    const usererr = document.getElementById("error-msg-user");

    if (!username) {
        setInvalid(usererr, "User name must not be empty");
        return false;
    } else if (!ALPHANUMERIC_REGEX.test(username)) {
        setInvalid(usererr, "User name must contains only letters");
        return false;
    } else {
        setInvalid(usererr, "");
        return true;
    }
};

const validateGenders = (fldVal, errFld, fldLabel) => {
    if (!fldVal.length > 0) {
        setInvalid(errFld, `${fldLabel} must be selected`);
        return false;
    } else {
        setInvalid(errFld, "");
        return true;

    }
};

const validateGender = e => {
    const genders = document.getElementsByName("gender");
    const genderChecked = Array.prototype.slice.call(genders).filter(item => item.checked);
    const generr = document.getElementById("error-msg-gender");

    return validateGenders(genderChecked, generr, 'Gender')
};

const validateExperiences = (fldVal, errFld, fldLabel) => {
    if (fldVal.value == 0) {
        setInvalid(errFld, `${fldLabel} must be selected`);
        return false;
    } else {
        setInvalid(errFld, "");
        return true;
    }
};

const validateExperience = e => {
    const experience = document.getElementById("experience");
    const experr = document.getElementById("error-msg-exp");

    return validateExperiences(experience, experr, 'Experience')
};


const validateskills = (fldVal, errFld, fldLabel) => {
    if (fldVal.length < 2) {
        setInvalid(errFld, `${fldLabel} must be selected atleast 2`);
        return false;
    } else {
        setInvalid(errFld, "");
        return addToDo();
    }
};

const validateskill = e => {
    const skillSet = document.querySelectorAll("input[name='skill']");
    const skillerr = document.getElementById("error-msg-skill");
    const skillChecked = Array.prototype.slice.call(skillSet).filter(item => item.checked);
    //console.log(skillChecked.length)

    return validateskills(skillChecked, skillerr, 'Skill')
};


const jsonObj = [];
var increment = 1;
var elementID;

// Add Todos
const addToDo = () => {
    var skillChecked = [];

    const username = document.forms.userForm.username.value;
    const genders = document.getElementsByName("gender");
    const genderChecked = document.querySelector('input[name="gender"]:checked').value;
    const experience = document.getElementById("experience").value;

    const skillSet = document.getElementsByName("skill");
    Array.prototype.slice.call(skillSet).filter(item => {
        if (item.checked === true) {
            skillChecked.push(item.value);
        }
        return skillChecked;

    });


    var obj = {
        id: increment++,
        user: username,
        gender: genderChecked,
        exp: experience,
        skills: skillChecked // in array
    };

    var objSkills = obj.skills.map(skill => skill); // get skill items

    const li = document.createElement('li');
    li.innerHTML = `<span class='user'> ${obj.user} </span><span class='gender'> ${obj.gender} </span><span class='exp'> ${obj.exp} </span><span class='skill'> ${objSkills} </span> <div><a href='#' onclick='editToDo(event)'>Edit</a>  <a href='#' onclick='deleteToDO(event)'>Delete</a></div>`;
    li.setAttribute('id', obj.id)

    document.getElementById('userContainer').appendChild(li);
    jsonObj.push(obj);
    console.log(jsonObj);
    document.forms.userForm.reset();
};

// Edit Todos
const editToDo = (event) => {
    var gender = document.getElementsByName("gender");
    var skill = document.getElementsByName("skill");
    event.preventDefault();
    elementID = event.target.closest('li').id;

    return jsonObj.filter((item) => {
        if (item.id == elementID) {
            document.forms.userForm.username.value = item.user;
            document.getElementById("experience").value = item.exp

            if (item.gender.includes('Female')) {
                gender[0].checked = true;
                gender[1].checked = false;

            }
            if (item.gender.includes('Male')) {
                gender[1].checked = true;
                gender[0].checked = false

            }

            if (item.skills.includes('Javascript') &&
                item.skills.includes('HTML5') &&
                item.skills.includes('CSS3')) {
                skill[0].checked = true
                skill[1].checked = true
                skill[2].checked = true
            } else if (item.skills.includes('Javascript') && item.skills.includes('HTML5')) {
                skill[0].checked = true
                skill[1].checked = true
            } else if (item.skills.includes('Javascript') && item.skills.includes('CSS3')) {
                skill[0].checked = true
                skill[2].checked = true
            } else if (item.skills.includes('HTML5') && item.skills.includes('CSS3')) {
                skill[1].checked = true
                skill[2].checked = true
            }

        }

    })
}

// Update Todos
document
    .getElementById("update")
    .addEventListener("click", () => {

        //updating user name
        const parent = document.getElementById(elementID);
        const userName = parent.querySelector('.user');
        userName.innerHTML = document.forms.userForm.username.value;

        //updating user gender
        const userGender = parent.querySelector('.gender');
        userGender.innerHTML = document.querySelector('input[name="gender"]:checked').value;

        //updating user Exp
        const userExp = parent.querySelector('.exp');
        userExp.innerHTML = document.getElementById("experience").value;

        //updating user skills
        const userSkill = parent.querySelector('.skill');
        const skillSet = document.getElementsByName("skill");
        const elCollection = Array.prototype.slice.call(skillSet).filter(item => {
            if (item.checked === true) {
                return item;
            }

        });

        var editedSkills = elCollection.map(it => it.value)
        userSkill.innerHTML = editedSkills;
        document.forms.userForm.reset();

    });

// Delete Todos
const deleteToDO = event => {
    event.preventDefault();
    event.target.closest('li').remove();
}

// validate before submit
const submit = e => {
    if (validateUser()) {
        if (validateGender()) {
            if (validateExperience()) {
                if (validateskill()) {
                    console.log("submitted");
                    document.forms.userForm.reset();
                }

            }


        }

    }
}


//validate username
// document
//     .getElementById("username")
//     .addEventListener("focusout", validateUser);


// document
//     .getElementById("gender")
//     .addEventListener("focusout", validateGender);

// document
//     .getElementById("experience")
//     .addEventListener("focusout", validateExperience);

// document
//     .getElementById("skillSet")
//     .addEventListener("focusout", validateskill);

document
    .getElementById("submit")
    .addEventListener("click", submit);