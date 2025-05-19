import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import store from './store';
import { setupPermissionGuard } from './utils/permission';

export function createApp() {
	const app = createSSRApp(App);
	
	// 挂载vuex
	app.use(store);
	
	// 设置路由权限拦截
	setupPermissionGuard();
	
	return {
		app
	};
}
