const CustomSelect = function (e) {

   let mainInitId = e.elem ? document.getElementById(e.elem) : e.elem,
      optGroup = mainInitId.querySelectorAll('optgroup'),
      options = mainInitId.options,
      selectedIndex = options[mainInitId.selectedIndex],
      dataIndexCount = 0,
      dataImgCount = 0,
      createSelectLi,
      createSelectImg,
      prefixContainer = 'custom',
      titleClass = 'select_title',
      selectedClass = 'selected',
      selectContainerClass = 'custom_select',
      selectUlClass = 'select_list',
      optGroupClass = 'select_optgroup',
      imgClass = 'select_img',
      imgLazyClass = 'lazy',
      titleClassActive = 'active',
      ulOpenClass = 'open';

   if (localStorage.getItem('selected')) {
      mainInitId.selectedIndex = localStorage.getItem('selected');
   }

   const createSelectContainer = document.createElement('div');
   createSelectContainer.className = selectContainerClass;
   if (mainInitId.id) createSelectContainer.id = `${prefixContainer}-${mainInitId.id}`;

   let createSelectBtn = document.createElement('button');
   let btnSpan = document.createElement('span');
   createSelectBtn.appendChild(btnSpan);
   createSelectBtn.className = titleClass;
   btnSpan.textContent = options[0].textContent;

   if (selectedIndex.getAttribute('data-srcImg')) {
      let selectedImg = document.createElement('img');
      selectedImg.setAttribute('src', `${selectedIndex.getAttribute('data-srcImg')}`);
      createSelectBtn.appendChild(selectedImg);
   }

   const createSelectUl = document.createElement("ul");
   createSelectUl.className = selectUlClass;

   if (optGroup.length > 0) {
      for (let p = 0; p < optGroup.length; p++) {
         const createOptgroupItem = document.createElement('div');
         createOptgroupItem.classList.add(optGroupClass);
         createOptgroupItem.innerText = optGroup[p].label;
         createSelectUl.appendChild(createOptgroupItem);
         createLi(optGroup[p].querySelectorAll('option'));
      }
   } else createLi(options);

   function createLi(e) {
      for (let t = 0; t < e.length; t++) {
         createSelectLi = document.createElement('li');
         let liSpan = document.createElement('span');
         createSelectLi.appendChild(liSpan)
         liSpan.textContent = e[t].textContent;

         createSelectLi.setAttribute('data-value', e[t].value);
         createSelectLi.setAttribute('data-index', `${dataIndexCount++}`);
         createSelectUl.appendChild(createSelectLi);

         if (selectedIndex.textContent === e[t].textContent) {
            createSelectLi.classList.add(selectedClass);
            btnSpan.textContent = e[t].textContent;
         }

         if (options[dataImgCount++].getAttribute('data-srcImg')) {
            let srcImg = e[t].getAttribute('data-srcImg');
            createSelectImg = document.createElement('img');
            createSelectImg.classList.add(imgClass, imgLazyClass);
            createSelectImg.setAttribute('src', srcImg);
            createSelectLi.appendChild(createSelectImg);
         }
      }
   }

   createSelectUl.addEventListener('click', e => {
      const target = e.target;

      if ('DIV' === target.tagName){}
      else {
         createSelectBtn.innerHTML = target.closest('li').innerHTML;
         mainInitId.options.selectedIndex = +target.closest('li').getAttribute('data-index');

         for (let a = 0; a < options.length; a++) {
            createSelectUl.querySelectorAll('li')[a].classList.remove(selectedClass);
            target.closest('li').classList.add(selectedClass);
         }

         localStorage.setItem('selectedList', target.closest('li').getAttribute('data-index'));
         localStorage.setItem('btn', target.closest('li').innerHTML);
         localStorage.setItem('selected', options[mainInitId.selectedIndex].value);
      }

   });

   createSelectBtn.addEventListener('click', function () {
      createSelectUl.classList.toggle(ulOpenClass);
      createSelectBtn.classList.toggle(titleClassActive);
   });

   document.addEventListener('mouseup', function (e) {
      let isClickInside = createSelectBtn.contains(e.target);
      if (!isClickInside && !e.target.classList.contains(optGroupClass)) {
         createSelectUl.classList.remove(ulOpenClass);
         createSelectBtn.classList.remove(titleClassActive);
      }
   })

   if (localStorage.getItem('selectedList')) {
      for (let b = 0; b < options.length; b++) {
         createSelectUl.querySelectorAll('li')[b].classList.remove(selectedClass);
      }
      createSelectUl.querySelectorAll('li')[localStorage.getItem('selectedList')].classList.add(selectedClass);
   }

   if (localStorage.getItem('btn')) {
      createSelectBtn.innerHTML = localStorage.getItem('btn');
   }
   createSelectContainer.appendChild(createSelectBtn);
   createSelectContainer.appendChild(createSelectUl);
   mainInitId.parentNode.insertBefore(createSelectContainer, mainInitId);
   mainInitId.style.display = 'none';
};