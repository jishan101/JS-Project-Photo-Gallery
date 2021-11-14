const tempData = {
    async getApiData(pageNo) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${pageNo}&_limit=12`);
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }
};

const localData = {
    setLocalData(pageNo) {
        localStorage.setItem("pageNo", JSON.stringify(pageNo));
    },
    
    getLocalData() {
        const pageNo = JSON.parse(localStorage.getItem("pageNo")) || 1;

        return pageNo;
    },
};

const UI = {
    pageNo: 1,

    selector() {
        const galleryElm = document.querySelector("#gallery");
        const firstPageBtnElm = document.querySelector("#firstPageBtn");
        const previousPageBtnElm = document.querySelector("#previousPageBtn");
        const pagesElm = document.querySelector("#pages");
        const nextPageBtnElm = document.querySelector("#nextPageBtn");
        const lastPageBtnElm = document.querySelector("#lastPageBtn");

        return {galleryElm, firstPageBtnElm, previousPageBtnElm, pagesElm, nextPageBtnElm, lastPageBtnElm};
    },

    insertImgs(dataObj) {
        const {galleryElm} = this.selector();

        let title = "";
        if(dataObj.title.length > 25) {
            title = dataObj.title.slice(0, 25);
        } else {
            title = dataObj.title;
        }

        const colElm = document.createElement("div");
        colElm.classList.add("col");

        const cardElm = document.createElement("div");
        cardElm.classList.add("card");

        const aElm = document.createElement("a");
        aElm.href = dataObj.url;

        const imgElm = document.createElement("img");
        imgElm.setAttribute("src", dataObj.url);
        imgElm.classList.add("card-img-top", "img");
        imgElm.id = dataObj.id;
        imgElm.style.width = "100%";
        imgElm.setAttribute("alt", "...");

        const cardBodyElm = document.createElement("div");
        cardBodyElm.classList.add("card-body");

        const h5Elm = document.createElement("h5");
        h5Elm.classList.add("card-title");
        h5Elm.innerText = title;

        const pElm = document.createElement("p");
        pElm.classList.add("card-text");
        pElm.innerText = "This is a dummy image. This is a dummy image.";

        galleryElm.insertAdjacentElement("beforeend", colElm);

        colElm.insertAdjacentElement("beforeend", cardElm);

        aElm.insertAdjacentElement("beforeend", imgElm);

        cardElm.insertAdjacentElement("beforeend", aElm);
        cardElm.insertAdjacentElement("beforeend", cardBodyElm);

        cardBodyElm.insertAdjacentElement("beforeend", h5Elm);
        cardBodyElm.insertAdjacentElement("beforeend", pElm);
    },

    removeImgs() {
        const {galleryElm} = this.selector();
        
        while (galleryElm.firstElementChild) {
            galleryElm.removeChild(galleryElm.firstElementChild);
        }
    },

    insertImgsInPage(data) {
        this.removeImgs();

        for(dataObj of data) {
            this.insertImgs(dataObj);
        }
    },

    async gotoPage(pageNo) {
        const {pagesElm} = this.selector();
        pagesElm.textContent = pageNo;

        const data = await tempData.getApiData(pageNo);
        this.insertImgsInPage(data);
    },

    init() {
        const {firstPageBtnElm, previousPageBtnElm, nextPageBtnElm, lastPageBtnElm} = this.selector();

        this.gotoPage(this.pageNo);

        firstPageBtnElm.addEventListener("click", () => {
            this.pageNo = 1;
            localData.setLocalData(this.pageNo);
            this.gotoPage(this.pageNo);
        });

        previousPageBtnElm.addEventListener("click", () => {
            if(this.pageNo === 1) {
                this.pageNo = 417;
                localData.setLocalData(this.pageNo);
            } else {
                this.pageNo--;
                localData.setLocalData(this.pageNo);
            }
            this.gotoPage(this.pageNo);
        });

        nextPageBtnElm.addEventListener("click", () => {
            if(this.pageNo === 417) {
                this.pageNo = 1;
                localData.setLocalData(this.pageNo);
            } else {
                this.pageNo++;
                localData.setLocalData(this.pageNo);
            }
            this.gotoPage(this.pageNo);
        });

        lastPageBtnElm.addEventListener("click", () => {
            this.pageNo = 417;
            localData.setLocalData(this.pageNo);
            this.gotoPage(this.pageNo);
        });

        window.addEventListener("DOMContentLoaded", () => {
            this.pageNo = localData.getLocalData();

            this.gotoPage(this.pageNo);
        });
    }
};

UI.init();



// document.addEventListener("click", (e) => {
//     if(e.target.classList.contains("img")) {
//         if(e.target.style.width === "100%") {
//             e.target.style.width = "250%";
//             e.target.style.height = "auto";
//             e.target.style.transition = "width 0.5s ease";
//         } else {
//             e.target.style.width = "100%";
//             e.target.style.height = "auto";
//             e.target.style.transition = "width 0.5s ease";
//         }
//     }
// });





{/* <div class="col">
    <div class="card">
        <img src="..." class="card-img-top" id="0" alt="...">
        <div class ="card-body">
            <h5 class ="card-title">quia quasi enim volupta</h5>
            <p class ="card-text">This is a dummy image. This is a dummy image.</p>
        </div>
    </div>
</div> */}

