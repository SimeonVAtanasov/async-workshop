(() => {
  const foxApiBaseURL =
    "https://randomfox.ca/floof/?ref=public_apis&utm_medium=website";
  const dogApiBaseURL =
    "https://random.dog/woof.json?ref=public_apis&utm_medium=website";
  const catApiBaseURL = "https://api.thecatapi.com/v1/images/search";

  const apiList = [
    {
      url: foxApiBaseURL,
      imageKey: "image",
    },
    {
      url: dogApiBaseURL,
      imageKey: "url",
    },
    {
      url: catApiBaseURL,
      imageKey: "url",
    },
  ];

  // utils
  const getElById = (id) => document.getElementById(id);
  const createEl = (type) => document.createElement(type);
  const container = getElById("container");
  const manageContainer = (el) => {
    container.innerHTML = null;
    container.appendChild(el);
  };
  const createImgWithSrc = (src) => {
    const img = createEl("img");
    img.src = src;
    img.height = 600;
    return img;
  };

  // getting the elements
  //   const getFoxBtn = getElById("getFoxBtn");
  //   const getDogBtn = getElById("getDogBtn");
  const input = getElById("input");

  // gets random api and performs fetch
  const generateAiImage = async () => {
    const index = Math.ceil(Math.random() * 3) - 1;
    const randomApi = apiList[index];

    const res = await fetch(randomApi.url);
    const data = await res.json();
    let image;
    if (Array.isArray(data)) {
      image = createImgWithSrc(data[0][randomApi.imageKey]);
    } else {
      image = createImgWithSrc(data[randomApi.imageKey]);
    }

    manageContainer(image);
  };

  //debounce
  let idHolder;

  const handeInputChange = (e) => {
    clearTimeout(idHolder);
    idHolder = setTimeout(generateAiImage, 1000);
  };

  //event listeners
  input.addEventListener("input", handeInputChange);

  //   getFoxBtn.addEventListener("click", () => {
  //     fetch(foxApiBaseURL)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const img = createImgWithSrc(data.image);
  //         manageContainer(img);
  //       })
  //       .catch((e) => alert(e));
  //   });

  //   const handleDogBtnClick = async () => {
  //     const res = await fetch(dogApiBaseURL);
  //     const data = await res.json();
  //     const img = createImgWithSrc(data.url);
  //     manageContainer(img);
  //   };

  //   getDogBtn.addEventListener("click", handleDogBtnClick);
})();
