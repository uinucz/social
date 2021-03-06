import React from "react"
import ReactDOM from "react-dom"
import "./app/layout/styles.css"
import "react-toastify/dist/ReactToastify.min.css"
import "react-calendar/dist/Calendar.css"
import "react-datepicker/dist/react-datepicker.css"
import App from "./app/layout/App"
import reportWebVitals from "./reportWebVitals"
import { store, StoreContext } from "./app/stores/store"
import { CustomRouter } from "./features/activities/CustomRouter"
import { createBrowserHistory } from "history"

export const history = createBrowserHistory()

ReactDOM.render(
	<StoreContext.Provider value={store}>
		<CustomRouter history={history}>
			<App />
		</CustomRouter>
	</StoreContext.Provider>,
	document.getElementById("root")
)

// import { createRoot } from "react-dom/client"
// createRoot(document.getElementById("app")!).render(
// 	<StoreContext.Provider value={store}>
// 		<App />
// 	</StoreContext.Provider>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
