let input = document.getElementById("input");
let addBtn = document.getElementById("add-btn");
let list = document.querySelector(".list");

addBtn.addEventListener("click", function() {
  if (input.value.trim() !== "") {
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    let delBtn = document.createElement("button");
    checkbox.type = "checkbox";
    delBtn.textContent = "Delete";
    let text = document.createTextNode(input.value.trim());
    listItem.appendChild(text);
    listItem.appendChild(checkbox);
    listItem.appendChild(delBtn);
    listItem.classList.add("list-item");
    delBtn.addEventListener("click", function() {
        if (checkbox.checked) {
           list.removeChild(listItem);
        } else {
           alert("Please check the item before deleting.");
        }
    });
    list.appendChild(listItem);
    input.value = "";
  } else {
    alert("Please enter a task.");
  }
});