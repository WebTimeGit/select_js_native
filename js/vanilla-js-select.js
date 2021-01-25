const CustomSelect = function (e) {

   let mainInitId = e.elem ? document.getElementById(e.elem) : e.elem,
      optgroup = mainInitId.querySelectorAll('optgroup'),
      selectOption = mainInitId.options,
      dataIndexCount = 0,
      selectTitleClass = 'select-title',
      selectedClass = 'is-selected',
      createSelectContainerClass = 'custom-select',
      createSelectUlClass = 'select-list',
      createOptgroupItemClass = 'select-optgroup',
      createSelectBtnActive = 'active',
      selectListOpenClass = 'is-open';

   const createSelectContainer = document.createElement('div');
   createSelectContainer.className = createSelectContainerClass;
   mainInitId.id && (createSelectContainer.id = `custom-${mainInitId.id}`);

   const createSelectBtn = document.createElement('button');
   createSelectBtn.className = selectTitleClass;
   createSelectBtn.textContent = selectOption[0].textContent;

   const createSelectUl = document.createElement("ul");
   createSelectUl.className = createSelectUlClass;

   if (optgroup.length > 0) {
      for (let p = 0; p < optgroup.length; p++) {
         const createOptgroupItem = document.createElement('div');
         createOptgroupItem.classList.add(createOptgroupItemClass);
         createOptgroupItem.innerText = optgroup[p].label;
         createSelectUl.appendChild(createOptgroupItem);
         createSelectLi(optgroup[p].querySelectorAll('option'));
      }
   } else createSelectLi(selectOption);

   function createSelectLi(e) {
      for (let t = 0; t < e.length; t++) {
         const createSelectLi = document.createElement('li');
         createSelectLi.innerText = e[t].textContent;
         createSelectLi.setAttribute('data-value', e[t].value);
         createSelectLi.setAttribute('data-index', `${dataIndexCount++}`);
         createSelectUl.appendChild(createSelectLi);

         if (selectOption[mainInitId.selectedIndex].textContent === e[t].textContent) {
            createSelectLi.classList.add(selectedClass);
            createSelectBtn.textContent = e[t].textContent;
         }
      }
   }

   function assemblyApp() {
      createSelectContainer.appendChild(createSelectBtn);
      createSelectContainer.appendChild(createSelectUl);
      createSelectContainer.addEventListener('click', e => {
         e.preventDefault();

         const target = e.target;

         if ('LI' === target.tagName) {
            createSelectContainer.querySelector(`.${selectTitleClass}`).innerText = target.innerText;
            mainInitId.options.selectedIndex = target.getAttribute('data-index');

            for (let a = 0; a < selectOption.length; a++) {
               createSelectUl.querySelectorAll('li')[a].classList.remove(selectedClass);
               target.classList.add(selectedClass);
            }
         }
      });
      mainInitId.parentNode.insertBefore(createSelectContainer, mainInitId);
      mainInitId.style.display = 'none';
   }

   createSelectBtn.addEventListener('click', function () {
      createSelectUl.classList.toggle(selectListOpenClass);
      createSelectBtn.classList.toggle(createSelectBtnActive);
   });

   document.addEventListener('mouseup', function (e) {
      let isClickInside = createSelectBtn.contains(e.target);
      if (!isClickInside) {
         createSelectUl.classList.remove(selectListOpenClass);
         createSelectBtn.classList.remove(createSelectBtnActive);
      }
   })

   return assemblyApp();
};