import React, { useEffect } from "react"
import { Container } from "semantic-ui-react"
import NavBar from "./NavBar"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard"
import { observer } from "mobx-react-lite"
import { Route, Router, Routes, useLocation, useRoutes } from "react-router-dom"
import HomePage from "../../features/home/HomePage"
import ActivityForm from "../../features/activities/form/ActivityForm"
import ActivityDetails from "../../features/activities/details/ActivityDetails"
import TestErrors from "../../features/errors/TestError"
import { ToastContainer } from "react-toastify"
import NotFound from "../../features/errors/NotFound"
import ServerError from "../../features/errors/ServerError"
import LoginForm from "../../features/users/LoginForm"
import { useStore } from "../stores/store"
import LoadingComponent from "./LoadingComponent"
import ModalContainer from "../common/modals/ModalContainer"

function App() {
	const location = useLocation()
	const { commonStore, userStore } = useStore()

	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => commonStore.setAppLoaded())
		} else {
			commonStore.setAppLoaded()
		}
	}, [commonStore, userStore])

	if (!commonStore.appLoaded)
		return <LoadingComponent content="Loading app..." />

	return (
		<>
			<ToastContainer position="bottom-right" hideProgressBar />
			<ModalContainer />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/*"
					element={
						<>
							<NavBar />
							<Container style={{ marginTop: "7em" }}>
								<Routes>
									<Route path="/activities" element={<ActivityDashboard />} />
									<Route path="/activities/:id" element={<ActivityDetails />} />

									{["/createActivity", "/manage/:id"].map((path) => (
										<Route
											key={location.key}
											path={path}
											element={<ActivityForm />}
										/>
									))}

									<Route path="/errors" element={<TestErrors />} />
									<Route path="/server-error" element={<ServerError />} />
									<Route path="/login" element={<LoginForm />} />
									<Route path="/*" element={<NotFound />} />
								</Routes>
							</Container>
						</>
					}
				/>
			</Routes>
		</>
	)
}

export default observer(App)
