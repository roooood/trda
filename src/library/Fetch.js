import axios from 'axios';
import { t } from '../locales';
const Api = axios.create({
  baseURL: 'http://localhost:2657/',
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});


function checkErr(err) {
  window.ee.emit('notify', { message: t('networkError'), type: 'error' })
}

function Http(page, data = {}, callBack) {
  if (typeof callBack == 'undefined') {
    callBack = data;
    Api.get(page)
      .then((response) => {
        callBack(response.data);
      })
      .catch((error) => {
        checkErr(error);
        callBack(error);
      });
  }
  else {
    data = Object.entries(data)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');

    Api.post(page, data)
      .then((response) => {
        callBack(response.data);
      })
      .catch((error) => {
        checkErr(error);
        callBack({success:false});
      });

  }
}

export default Http;
