import Vue from 'vue'
import headTitle from "~/components/security/headTitle";

var components = {
  headTitle
}
Object.keys(components).forEach((key) => Vue.component(key, components[key]))
export default {

}
