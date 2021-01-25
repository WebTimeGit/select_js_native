const CustomSelect = function (e) {

   let mainInitId = e.elem ? document.getElementById(e.elem) : e.elem,
      // s = "boolean" === e.bubbles,
      selectTitle = "select-title",
      selected = "is-selected",
      selectListOpen = "is-open",
      optgroup = mainInitId.querySelectorAll("optgroup"),
      selectOption = mainInitId.options,
      dataIndexCount = 0;

   const createSelectContainer = document.createElement("div");
   createSelectContainer.className = "custom-select";
   mainInitId.id && (createSelectContainer.id = `custom-${mainInitId.id}`);

   const createSelectBtn = document.createElement("button");
   createSelectBtn.className = selectTitle;
   createSelectBtn.textContent = selectOption[0].textContent;

   createSelectBtn.addEventListener('click', function (){
      selectAddToggle();
   });

   const createSelectUl = document.createElement("ul");
   createSelectUl.className = "select-list";

   if (optgroup.length > 0) {
      for (let p = 0; p < optgroup.length; p++) {
         const createOptgroupItem = document.createElement("div");
         createOptgroupItem.classList.add("select-optgroup");
         createOptgroupItem.innerText = optgroup[p].label;
         createSelectUl.appendChild(createOptgroupItem);
         createSelectLi(optgroup[p].querySelectorAll("option"));
      }

   } else createSelectLi(selectOption);

   function createSelectLi(e) {
      for (let t = 0; t < e.length; t++) {
         const createSelectLi = document.createElement("li");
         createSelectLi.innerText = e[t].textContent;
         createSelectLi.setAttribute("data-value", e[t].value);
         createSelectLi.setAttribute("data-index", `${dataIndexCount++}`);
         createSelectUl.appendChild(createSelectLi);

         if (selectOption[mainInitId.selectedIndex].textContent === e[t].textContent) {
            createSelectLi.classList.add(selected);
            createSelectBtn.textContent = e[t].textContent
         }
      }
   }

   function selectAddToggle() {
      createSelectUl.classList.toggle(selectListOpen)
      createSelectBtn.classList.toggle('active')
   }

   function selectClosed() {
      createSelectUl.classList.remove(selectListOpen);
      createSelectBtn.classList.remove('active')
   }

   document.addEventListener('mouseup', function (e){
      let isClickInside = createSelectBtn.contains(e.target);
      if (!isClickInside) {
         selectClosed();
      }
   })

   function assemblyApp() {
      createSelectContainer.appendChild(createSelectBtn);
      createSelectContainer.appendChild(createSelectUl);
      createSelectContainer.addEventListener("click", e => {
         e.preventDefault();

         const target = e.target;

         if ("LI" === target.tagName) {
            createSelectContainer.querySelector(`.${selectTitle}`).innerText = target.innerText;
            mainInitId.options.selectedIndex = target.getAttribute("data-index");

            // const n = s ? new CustomEvent("change", {bubbles: !0}) : new CustomEvent("change");
            // mainInitId.dispatchEvent(n);

            for (let a = 0; a < selectOption.length; a++) {
               createSelectUl.querySelectorAll("li")[a].classList.remove(selected);
               target.classList.add(selected);
            }
         }
      });
      mainInitId.parentNode.insertBefore(createSelectContainer, mainInitId);
      mainInitId.style.display = "none";
   }

   return assemblyApp();
};