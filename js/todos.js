"use strict";

const ALPHANUMERIC_REGEX = /^[a-zA-Z ]+$/;
const setInvalid = (errmsg, message) => {
  errmsg.className = "show-error";
  errmsg.innerHTML = message;
};
/* event bindings of tab one */
// section one button click
const validateUser = (e) => {
  const username = document.forms.userForm.username.value;
  const usererr = document.getElementById("error-msg-user");

  if (!username) {
    setInvalid(usererr, "User name must not be empty");
    return false;
  } else if (!ALPHANUMERIC_REGEX.test(username)) {
    setInvalid(usererr, "User name must contains only letters");
    return false;
  }
  // comment 1: else is not necssary, if there is a return statement above it
  setInvalid(usererr, "");
  return true;
};

const validateGender = (e) => {
  const genders = document.getElementsByName("gender");
  const genderChecked = Array.prototype.slice
    .call(genders)
    .filter((item) => item.checked);
  const generr = document.getElementById("error-msg-gender");

  if (!genderChecked.length > 0) {
    setInvalid(generr, `Gender must be selected`);
    return false;
  }
  // comment 1: else is not necssary, if there is a return statement above it
  setInvalid(generr, "");
  return true;
};

const validateExperience = (e) => {
  const experience = document.getElementById("experience");
  const experr = document.getElementById("error-msg-exp");

  if (experience.value == 0) {
    setInvalid(experr, `Experience must be selected`);
    return false;
  }
  // comment 1: else is not necssary, if there is a return statement above it
  setInvalid(experr, "");
  return true;
};

// const validateskills = (fldVal, errFld, fldLabel) => {
//     if (fldVal.length < 2) {
//         setInvalid(errFld, `${fldLabel} must be selected atleast 2`);
//         return false;
//     } else {
//         setInvalid(errFld, "");
//         return true;
//     }
// };

// const validateskill = e => {
//     const skillSet = document.querySelectorAll("input[name='skill']");
//     const skillerr = document.getElementById("error-msg-skill");
//     const skillChecked = Array.prototype.slice.call(skillSet).filter(item => item.checked);
//     //console.log(skillChecked.length)

//     return validateskills(skillChecked, skillerr, 'Skill')
// };

const users = [];
var increment = 1;
var userId;

// Add Todos
const addToDo = () => {
  var obj = {
    id: increment++,
    user: document.forms.userForm.username.value,
    gender: document.forms.myForm.gender.value,
    exp: document.forms.myForm.experience.value,
  };

  const $li = document.getElementById("liTmpl").content.cloneNode(true)
    .firstElementChild;
  $li.id = obj.id;
  $li.querySelector(".user").innerHTML = obj.user;
  $li.querySelector(".gender").innerHTML = obj.gender;
  $li.querySelector(".exp").innerHTML = obj.exp;

  document.getElementById("userContainer").appendChild($li);

  users.push(obj);

  document.forms.userForm.reset();
};

// Edit Todos
const editToDo = (event) => {
  event.preventDefault();

  userId = event.target.closest("li").id;

  const user = users.find(({ id }) => id == userId);

  if (Object.keys(user).length) {
    document.forms.userForm.username.value = user.user;
    document.getElementById("experience").value = user.exp;

    document.getElementsByName("gender")[0].checked = user.gender == "Female";
    document.getElementsByName("gender")[1].checked = user.gender == "Male";
  }
};

// comment 2: bind event if DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Update Todos
  document.getElementById("update").addEventListener("click", () => {
    // read values
    const username = document.forms.userForm.username.value;
    const gender = document.forms.userForm.gender.value;
    const experience = document.forms.userForm.experience.value;

    // update in global object
    const userIndex = users.findIndex(({ id }) => id == userId);
    users[userIndex].user = username;
    users[userIndex].gender = gender;
    users[userIndex].experience = experience;

    // update in table row
    const $parent = document.getElementById(userId);
    $parent.querySelector(".user").innerHTML = username;
    $parent.querySelector(".gender").innerHTML = gender;
    $parent.querySelector(".exp").innerHTML = experience;

    document.forms.userForm.reset();
  });
});

// Delete Todos
const deleteToDO = (event) => {
  event.preventDefault();
  // find index
  const userIndex = users.findIndex(({ id }) => id == userId);
  //remove from global users
  users.splice(userIndex, 1);
  // remove from DOM
  event.target.closest("li").remove();
};

function submitHandler() {
  if (validateUser()) {
    if (validateGender()) {
      if (validateExperience()) {
        //if (validateskill()) {
        // after proper validation add user
        addToDo();
        // reset the form
        document.forms.userForm.reset();
        //}
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
