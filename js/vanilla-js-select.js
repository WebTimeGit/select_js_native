const CustomSelect = function (e) {

   let mainInitId = e.elem ? document.getElementById(e.elem) : e.elem,
      optgroup = mainInitId.querySelectorAll('optgroup'),
      selectOption = mainInitId.options,
      selectedIndex = selectOption[mainInitId.selectedIndex],
      dataIndexCount = 0,
      dataImgCount = 0,
      selectTitleClass = 'select-title',
      selectedClass = 'is-selected',
      createSelectContainerClass = 'custom-select',
      createSelectUlClass = 'select-list',
      createOptgroupItemClass = 'select-optgroup',
      createSelectBtnActive = 'active',
      selectListOpenClass = 'is-open',
      SelectArray = [];

   // update local storage function
   const updateLocalStorage = () => {
      localStorage.setItem('select', JSON.stringify(SelectArray));
   }

   console.log(selectedIndex);

   // create our object
   function eventPush() {
      let selectObject = {
         selected: selectedIndex
      };
      SelectArray.push(selectObject);
      updateLocalStorage();
   }

   if (!localStorage.SelectArray) {
      SelectArray = [];
   } else {
      SelectArray = JSON.parse(localStorage.getItem('select'));
   }

   const createSelectContainer = document.createElement('div');
   createSelectContainer.className = createSelectContainerClass;
   if (mainInitId.id) createSelectContainer.id = `custom-${mainInitId.id}`;

   const createSelectBtn = document.createElement('button');
   createSelectBtn.className = selectTitleClass;
   createSelectBtn.textContent = selectOption[0].textContent;

   const createSelectUl = document.createElement("ul");
   createSelectUl.className = createSelectUlClass;

   createSelectBtn.addEventListener('mouseup', function () {
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

         if (selectOption[dataImgCount++].getAttribute('data-srcImg')) {
            let srcImgIndex = e[t].getAttribute('data-srcImg');
            const createSelectImg = document.createElement('img');
            createSelectImg.classList.add('select_img', 'lazy');
            createSelectImg.setAttribute('src', `${srcImgIndex}`);
            createSelectLi.appendChild(createSelectImg);
         }

         createSelectUl.appendChild(createSelectLi);

         if (selectedIndex.textContent === e[t].textContent) {
            createSelectLi.classList.add(selectedClass);
            createSelectBtn.innerHTML = e[t].textContent;
         }
      }
   }

   if (selectedIndex.getAttribute('data-srcImg')) {
      let selectedImg = document.createElement('img');
      selectedImg.setAttribute('src', `${selectedIndex.getAttribute('data-srcImg')}`);
      createSelectBtn.appendChild(selectedImg);
   }

   createSelectContainer.addEventListener('click', e => {
      const target = e.target;

      if ('LI' === target.tagName) {
         createSelectContainer.querySelector(`.${selectTitleClass}`).innerHTML = target.innerHTML;
         mainInitId.options.selectedIndex = target.getAttribute('data-index');

         for (let a = 0; a < selectOption.length; a++) {
            createSelectUl.querySelectorAll('li')[a].classList.remove(selectedClass);
            target.classList.add(selectedClass);
         }
      }
      eventPush();
   });

   function assemblyApp() {
      createSelectContainer.appendChild(createSelectBtn);
      createSelectContainer.appendChild(createSelectUl);
      mainInitId.parentNode.insertBefore(createSelectContainer, mainInitId);
      mainInitId.style.display = 'none';
   }

   return assemblyApp();
};