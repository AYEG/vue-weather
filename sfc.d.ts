declare module "*.vue" {
    import * as Vue from 'vue';
    export default typeof Vue
}

declare module "quasar"
declare const __THEME


declare module "*.json" {
    const value: any;
    export default value;
}