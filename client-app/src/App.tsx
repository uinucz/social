import React, { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"
import { Header, List } from "semantic-ui-react"

function App() {
	const [activities, setActivities] = useState([])

	useEffect(() => {
		axios.get("http://localhost:5000/api/activities").then((response) => {
			setActivities(response.data)
		})
	}, [])

	return (
		<div>
			<Header as="h2" icon="users" content="Social" />
			lalalallallala
			<List>
				{activities.map((x: any) => (
					<List.Item key={x.id}>{x.title}</List.Item>
				))}
			</List>
		</div>
	)
}

export default App
