let totalResultsFromAPI = null;
let firstPortion = null;
let finalPortion = null;

const loaderControl = () => {
  const loader = document.querySelector(".loader-container");
  const loaderOpacityValue = window.getComputedStyle(loader).opacity;
  loaderOpacityValue ? (loader.style.opacity = 0) : (loader.style.opacity = 1);
  setTimeout(() => {
    loaderOpacityValue
      ? loader.classList.add("d-none")
      : loader.classList.add("d-flex");
  }, 600);
};

const expand = (description, image) => {
  const aiDescription = document.querySelector(".ai-description");
  const logoContainer = document.querySelector(".logo-container");
  aiDescription.innerText = description;
  logoContainer.style.backgroundImage = `url(${image})`;
};

const clearAll = () => {
  const parent = document.querySelector(".parent");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const showMore = () => {
  const showMoreButton = document.querySelector(".show-more-button");
  showMoreButton.style.display = "none";
  processResults(finalPortion);
};

const showResult = async ({
  description,
  features,
  image,
  name,
  published_in,
}) => {
  description =
    description ??
    "Artificial Intelligence (AI) is the simulation of human intelligence in machines, enabling tasks like learning, reasoning, problem-solving, and decision-making.";
  const parent = document.querySelector(".parent");
  let allFeatures = "";
  features.forEach((feature) => {
    allFeatures += `<li>${feature}</li>`;
  });
  parent.innerHTML += `
  <div class="card col-12 col-md-2 p-3 my-3 my-md-4"
          style="width: 350px; border:  1px solid rgba(17, 17, 17, 0.10)">
          <img src=${image} class="card-img-top rounded-3 card-image-custom"
            alt="..." />
          <div class="card-body p-0">
            <h1 class="fs-4 fw-semibold my-3">Features</h1>
            <ol class="px-4 mb-3">
              ${allFeatures}
            </ol>
            <hr />
            <div class="container-fluid mt-3 d-flex justify-content-between">
              <div>
                <h1 class="fs-4 fw-semibold mb-2">${name}</h1>
                <div class="d-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z"
                      stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="align-self-center">${published_in}</span>
                </div>
              </div>
              <div class="align-self-center">
                <button type="button" onclick="expand('${description}','${image}')" class="btn rounded-circle btn-outline-none" data-bs-toggle="modal" data-bs-target="#detailsModal"
                  style="width: 50px; height: 50px; background-color: #fef7f7">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75" stroke="#EB5757" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
  `;
};

const allImagsLoaded = () => {

  const allImages = document.querySelectorAll("img");
  let imageCounter=0

  //handling successful images
  allImages.forEach((eachImage) => {
    eachImage.addEventListener("load", ()=>{
      imageCounter++
      if(imageCounter===allImages.length){
        loaderControl();
      }
    });
  });

  //handling failed images
  allImages.forEach((eachImage) => {
    eachImage.addEventListener("error", ()=>{
      eachImage.src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Why-get-certified-in-Artificial-Intelligence.jpg"
      imageCounter++
      if(imageCounter===allImages.length){
        loaderControl();
      }
    });
  });
};

const processResults = (results) => {
  results.forEach((element) => {
    showResult(element);
  });
  allImagsLoaded();
};

const sortByDate = () => {
  const showMoreButton = document.querySelector(".show-more-button");
  totalResultsFromAPI.sort(
    (a, b) => new Date(a.published_in) - new Date(b.published_in)
  );
  firstPortion = totalResultsFromAPI.slice(0, 6);
  finalPortion = totalResultsFromAPI.slice(6, totalResultsFromAPI.length);
  clearAll();
  processResults(firstPortion);
  showMoreButton.style.display = "inline-block";
};

const makeAPICall = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((response) => response.json())
    .then(({ data: { tools } }) => {
      totalResultsFromAPI = tools;
      firstPortion = tools.slice(0, 6);
      finalPortion = tools.slice(6, tools.length);
      processResults(firstPortion);
    })
    .catch((error) => alert(error));
};

const startProcessing = () => {
  makeAPICall();
};

document.addEventListener("DOMContentLoaded", startProcessing);
