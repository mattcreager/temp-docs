
import Multispinner from 'multispinner';

class Spin {

  constructor() {
    this.spinner = {};
  }

  create(name, text) {
    this.spinner[name] = new Multispinner({ [name]: text });
  }

  success(name) {
    this.spinner[name].success(name);
  }

}

let spinners = null;

export default function () {
  spinners = spinners || new Spin()

  return spinners;
}
