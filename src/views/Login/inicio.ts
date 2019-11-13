import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import template from './Registrar.vue';
@Component({
    name: 'AddSgp',
    mixins: [template],
    components: {  },
})
export default class Login extends Vue {
    private user = '';
    private password = '';
}
