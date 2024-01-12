//global vars.
// let img_arr = [];

//global objs.
let dom_Helper = {
  putDomInBody: function (dom) {
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(dom);
  },
  addChildToParent: function (parent, child) {
    parent.appendChild(child);
  },

  createDomObj: function (tagName, className) {
    let temp_dom = document.createElement(tagName);
    if (className !== undefined) {
      temp_dom.classList.add(className);
    }
    return temp_dom;
  },
};

let div_container = {
  div_img: [],
  init: function () {
    let tmp_div = this.createContainerDiv();
    dom_Helper.putDomInBody(tmp_div);
  },
  createContainerDiv: function () {
    let tmp_div = dom_Helper.createDomObj("div", "container");
    return tmp_div;
  },
  generateImgs: function () {
    let _self = this;
    data_obj.getDataFromApi("http://googleapis.com/getImgs", function (imgs) {
      _self.div_img = imgs;
      let containerDiv = document.getElementsByClassName("container")[0];
      for (let i = 0; i < imgs.length; i++) {
        const imgUrl = imgs[i];
        //console.log("imgUrl", imgUrl);
        let tmp_img_dom = img_obj.createImgDom();
        img_obj.loadImage(tmp_img_dom, imgUrl);
        dom_Helper.addChildToParent(containerDiv, tmp_img_dom);
      }
    });
  },
};

let img_obj = {
  createImgDom: function () {
    let tmp_img = dom_Helper.createDomObj("img");
    return tmp_img;
  },
  loadImage: function (img_dom, imgUrl) {
    img_dom.setAttribute("src", imgUrl);
  },
};

let data_obj = {
  getDataFromApi: function (apiUrl, cb) {
    let data = [
      "https://fastly.picsum.photos/id/833/300/300.jpg?hmac=m33-N82Dblxw-Bzcfdv95OhsW2L00s_mLYjpSM6aR2k",
      "https://fastly.picsum.photos/id/288/300/300.jpg?hmac=7RMC2BTzA6EpogvGf74Us4VguwkoeSsLzBARJbs5VOk",
      "https://fastly.picsum.photos/id/390/300/300.jpg?hmac=vIwFiXdW16lazu7WfEtZYsQ3UJSXWKISG7tOiTT-nhc",
      "https://fastly.picsum.photos/id/790/300/300.jpg?hmac=jXjdU1D_tMJC9_oX744nIo2DeE65T9ri0pJUM3k86E8",
      "https://fastly.picsum.photos/id/90/300/300.jpg?hmac=QT72Dh2MxQaVSEq6qSwRCE38wKIshGRJMffXMzgK0_Q",
      "https://fastly.picsum.photos/id/236/300/300.jpg?hmac=foqe5XWYGwVxei7jB9_mh6DQDjOydIus_sTfpOuB2M8",
    ];
    //img_arr = data;
    setTimeout(function () {
      //img_arr = data; we didnt  want to do this for all api data so we declared an array variable in div_container object called  div_img and we used this array variable to stores images coming through from api
      cb && cb(img_arr);
    }, 2000);
  },
};

document.addEventListener("DOMContentLoaded", function () {
  div_container.init();
  div_container.generateImgs();
  div_container.generateImgs();
});
