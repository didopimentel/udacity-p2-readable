import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';



const store = createStore(
	reducer,
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)



ReactDOM.render(
	<Provider store={store}>
			<App/>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
