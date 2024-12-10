(() => {
  const foxApi = {
      url: "https://randomfox.ca/floof/?ref=public_apis&utm_medium=website",
      imageKey: "image",
    },
    dogApi = {
      url: "https://random.dog/woof.json?ref=public_apis&utm_medium=website",
      imageKey: "url",
    },
    catApi = {
      url: "https://api.thecatapi.com/v1/images/search",
      imageKey: "url",
    };

  const apiList = [foxApi, dogApi, catApi];

  // utils
  const getElById = (id) => document.getElementById(id),
    createEl = (type) => document.createElement(type),
    container = getElById("container"),
    favoritesBox = getElById("favoritesBox");

  const manageContainer = (el) => {
      container.appendChild(el);
    },
    manageFavorites = (el) => {
      favoritesBox.appendChild(el);
    };

  const createImgWithSrc = (src, isFavorite) => {
    const img = createEl("img");

    img.src = src;
    img.width = 200;

    if (isFavorite) {
      img.addEventListener("click", () => img.remove());
    } else {
      img.addEventListener("click", () => {
        const newImage = createImgWithSrc(src, true);
        manageFavorites(newImage);
      });
    }

    return img;
  };

  // getting the elements
  //   const getFoxBtn = getElById("getFoxBtn");
  //   const getDogBtn = getElById("getDogBtn");
  const input = getElById("input");

  const generateApiDataBasedOnInput = (string) => {
    const value = string.toLowerCase();
    const dogWords = ["dog", "куче", "пес"];
    const catWords = [
      "cat",
      "коте",
      "котка",
      "котенце",
      "коти",
      "мац",
      "писенце",
    ];
    const foxWords = ["fox", "лисица", "лиса", "кума лиса"];

    const searchCallBack = (prev, curr) => {
      if (value.includes(curr)) {
        return true;
      }
      return prev;
    };

    if (dogWords.reduce(searchCallBack, false)) {
      return dogApi;
    } else if (catWords.reduce(searchCallBack, false)) {
      return catApi;
    } else if (foxWords.reduce(searchCallBack, false)) {
      return foxApi;
    } else {
      // generate random
      const index = Math.ceil(Math.random() * 3) - 1;
      return apiList[index];
    }
  };

  // gets random api and performs fetch
  const generateAiImage = async (inputValue) => {
    if (!inputValue) return;

    const apiData = generateApiDataBasedOnInput(inputValue);

    //super ugly but less code
    const arrToMap = [1, 1, 1, 1];

    const results = await Promise.all(arrToMap.map(() => fetch(apiData.url)));
    const data = await Promise.all(results.map((res) => res.json()));

    //removing the old images
    container.innerHTML = null;

    data.forEach((apiObject) => {
      console.log("here");
      let image;
      if (Array.isArray(apiObject)) {
        image = createImgWithSrc(apiObject[0][apiData.imageKey]);
      } else {
        image = createImgWithSrc(apiObject[apiData.imageKey]);
      }

      manageContainer(image);
    });

    // const res = await fetch(apiData.url);
    // const data = await res.json();
    // let image;
    // if (Array.isArray(data)) {
    //   image = createImgWithSrc(data[0][apiData.imageKey]);
    // } else {
    //   image = createImgWithSrc(data[apiData.imageKey]);
    // }

    // manageContainer(image);
  };

  //debounce
  let idHolder;

  const handleInputChange = (e) => {
    clearTimeout(idHolder);

    idHolder = setTimeout(() => generateAiImage(e.target.value), 1000);
  };

  //event listeners
  input.addEventListener("input", handleInputChange);

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
