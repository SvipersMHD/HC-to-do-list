var btnHide = document.querySelector(".hide")
var btnAddTask = document.querySelector(".btn__add")
var btnDelette = document.querySelector(".btn__removeall")
var btnFiltreDone = document.querySelector(".filtre__done")
var btnFiltreBeDone = document.querySelector(".filtre__bedone")
var btnFiltreShowall = document.querySelector(".filtre__showall")

var inputDescription = document.querySelector(".description")
var inputName = document.querySelector(".name")
var inputDate = document.querySelector(".inputDate")

var askWrapper = document.querySelector(".ask__box")
var askWrapperBox = document.querySelector(".ask__wrapper")
var errorName = document.querySelector(".error__name")
var errorTask = document.querySelector(".error__task")
var errorDate = document.querySelector(".error__date")
var errorHide = document.querySelector(".error__hide")

//
var askDataFromLocalStorage = localStorage.getItem('askData');
if (askDataFromLocalStorage) {
    askWrapper.innerHTML = askDataFromLocalStorage;
    askWrapperBox.style.transform = "translateY(0)";
    btnHide.style.transform = "translateY(0)";
}

// hauteur du wrapper chargé après reload
var heightPlus = askWrapperBox.offsetHeight + askWrapper.offsetHeight
askWrapperBox.style.height = heightPlus + "px";
/////////////
function rajoutTask(){
    // message erreur
    if(inputDescription.value.length <= 1) {
        errorTask.style.display = "block"
        errorHide.style.display = "none"
    } 
    if(inputDescription.value.length >= 1) {
        errorTask.style.display = "none"
        errorHide.style.display = "none"
    } 
    if(inputName.value.length <= 1) {
        errorName.style.display = "block"
        errorHide.style.display = "none"
    } 
    if(inputName.value.length >= 1) {
        errorName.style.display = "none"
        errorHide.style.display = "none"
    } 
    if(inputDate.value.length <= 1) {
        errorDate.style.display = "block"
        errorHide.style.display = "none"
    } 
    if(inputDate.value.length >= 1) {
        errorDate.style.display = "none"
        errorHide.style.display = "none"
    } 
    if(document.querySelector(".show")) {
        errorHide.style.display = "block"
        errorName.style.display = "none"
        errorTask.style.display = "none"
        errorDate.style.display = "none"
    } 
    ///
    if(
        inputDescription.value.length >= 1 
        &&
        inputName.value.length >= 1
        &&
        inputDate.value.length >= 1
        && 
        document.querySelector(".hide")
        ){
            errorName.style.display = "none"
            errorTask.style.display = "none"
            errorDate.style.display = "none"
            errorHide.style.display = "none"
            var inputData = inputDescription.value
            var inputDataName = inputName.value
            var inputDateSelec = inputDate.value
            var askData = 
            `
            <div class="ask">
            <div class="modifTitre modif">${inputDataName}</div>
            <div class="modifDate modif">${inputDateSelec}</div>
            <div class="modifDescription modif">${inputData}</div>
            <button class="btn__done">Done</button>
            <button class="btn__remove">remove</button>
            </div>
            `
            // met le dernier div en haut 
            askWrapper.insertAdjacentHTML('afterbegin', askData);
            var askTranslate = document.querySelector(".ask")
            var heightPlus = askWrapperBox.offsetHeight + askTranslate.offsetHeight
            firstAsk()
            btnHide.style.transform = "translateY(0)";
            showDiv.style.transform = "translateY(0)";
            askWrapperBox.style.height = heightPlus + "px";
            // Sauvegarde des données
            localStorage.setItem('askData', askWrapper.innerHTML)
            // animation
            setTimeout(function() {
                askTranslate.style.transition = ".3s all ease-in-out";
            }, 1000);
            gsap.fromTo(
                askTranslate,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
                );
                // vide les champs
                inputDescription.value = ""
                inputName.value = ""
                inputDate.value = ""
                itsDone(askTranslate)
                taille()
            }  
        }
        // bouton vert 
        function itsDone(remplacer){
            var btnDone = document.querySelector(".btn__done")
            btnDone.addEventListener("click",function(){
                remplacer.classList.toggle("green-active")
                localStorage.setItem('askData', askWrapper.innerHTML)
            })
        }
        //////////////////
        // bouton enlever 
        function enlever(){
            var btnRemoveTask = document.querySelectorAll(".btn__remove")
            btnRemoveTask.forEach(function(removeTask){
                removeTask.addEventListener("click", function(){
                    removeTask.closest("div").classList.add("slide__droite")
                    setTimeout(() => {
                        removeTask.closest("div").remove();
                        localStorage.setItem('askData', askWrapper.innerHTML);
                    }, 400)
                    var askTranslate = document.querySelector(".ask")
                    var heightMoins = askWrapperBox.offsetHeight - askTranslate.offsetHeight
                    askWrapperBox.style.height = heightMoins + "px";
                })
            });
            btnDelette.addEventListener("click", function(){
                var tailleWrapper = askWrapperBox.offsetHeight
                gsap.to(
                    askWrapper,
                    { y: -tailleWrapper, duration: 0.5, ease: 'power2.out' }
                    );
                    setTimeout(() => {
                        gsap.to(
                            askWrapper,
                            { y: 0,}
                            );
                        }, 500)
                        setTimeout(() => {
                            askWrapper.innerHTML = ""
                        }, 800)
                        setTimeout(() => {
                            askWrapperBox.style.height = 130 + "px";
                        }, 500)
                        setTimeout(() => {
                            askWrapperBox.style.transform = "translateY(-190px)";
                            btnHide.style.transform = "translateY(-60px)";
                        }, 500)
                        localStorage.removeItem('askData');
                    })
                }
                function removeWrapper(){
                    if (!document.querySelector('.btn__remove')) {
                        askWrapperBox.style.transform = "translateY(-190px)";
                        btnHide.style.transform = "translateY(-60px)";
                    }
                }
                setInterval(function() {
                    removeWrapper()
                }, 1000);
                ///////////////////
                // apparition du askwrapper 
                function firstAsk(){
                    gsap.to(askWrapperBox, {
                        y: (0),
                        duration: 0.5,
                    })
                }
                ///////////////////
                // SHOW HIDE 
                var showDiv = document.createElement(`div`)
                showDiv.innerHTML = "Show list"
                showDiv.classList.add("show")
                btnHide.innerHTML = "Hide list"
                btnHide.classList.add("hide")
                
                btnHide.addEventListener("click", function(){
                    var tailleWrapper = askWrapperBox.offsetHeight
                    gsap.to(askWrapperBox, {
                        y: (-tailleWrapper),
                        duration: 0.4,
                    })
                    btnHide.replaceWith(showDiv)
                })
                showDiv.addEventListener("click", function(){
                    var tailleWrapper = askWrapperBox.offsetHeight
                    gsap.to(askWrapperBox, {
                        y: tailleWrapper - tailleWrapper,
                        duration: 0.4,
                    })
                    showDiv.replaceWith(btnHide)
                })
                /////////////////////////////////////////
                // bouton de lancement 
                document.addEventListener("keydown", function(enter){
                    if(enter.key === "Enter") {  
                        rajoutTask()
                        enlever()
                    }
                });
                
                btnAddTask.addEventListener("click", function(){
                    rajoutTask()
                    enlever()
                });
                enlever()
                var askTranslate = document.querySelector(".ask")
                var btnDoneAll = document.querySelectorAll(".btn__done")
                btnDoneAll.forEach(function(btnDoneAllSelect){
                    btnDoneAllSelect.addEventListener("click", function(){
                        btnDoneAllSelect.closest("div").classList.toggle("green-active")
                    })
                })
                
                // bouton done filtre
                btnFiltreBeDone.addEventListener("click", function(){
                    if(document.querySelector(".ask")){
                        var doneGreened = document.querySelectorAll(".green-active")
                        var askTranslate = document.querySelectorAll(".ask")
                        // reset 
                        doneGreened.forEach(function(doneGreene){
                            doneGreene.style.display = "grid"
                        })
                        askTranslate.forEach(function(askTranslateNotDone){
                            askTranslateNotDone.style.display = "grid"
                        })
                        //
                        askTranslate.forEach(function(askTranslateNotDone){
                            askTranslateNotDone.style.display = "grid"
                        })
                        doneGreened.forEach(function(doneGreene){
                            doneGreene.style.display = "none"
                        })
                    }
                })
                btnFiltreDone.addEventListener("click", function(){
                    if(document.querySelector(".ask")){
                        var doneGreened = document.querySelectorAll(".green-active")
                        var askTranslate = document.querySelectorAll(".ask")
                        // reset 
                        doneGreened.forEach(function(doneGreene){
                            doneGreene.style.display = "grid"
                        })
                        askTranslate.forEach(function(askTranslateNotDone){
                            askTranslateNotDone.style.display = "grid"
                        })
                        //
                        askTranslate.forEach(function(askTranslateNotDone){
                            askTranslateNotDone.style.display = "none"
                        })
                        doneGreened.forEach(function(doneGreene){
                            doneGreene.style.display = "grid"
                        })
                    }
                })
                btnFiltreShowall.addEventListener("click", function(){
                    if(document.querySelector(".ask")){
                        var doneGreened = document.querySelectorAll(".green-active")
                        var askTranslate = document.querySelectorAll(".ask")
                        // reset 
                        doneGreened.forEach(function(doneGreene){
                            doneGreene.style.display = "grid"
                        })
                        askTranslate.forEach(function(askTranslateNotDone){
                            askTranslateNotDone.style.display = "grid"
                        })
                        //
                    }
                })
                function taille() {
                    var heightBeforeLoad = askWrapperBox.offsetHeight + 250
                    askWrapperBox.style.height = heightBeforeLoad
                    console.log(heightBeforeLoad + 250);
                } 
                
                
