import { observer } from "mobx-react-lite"
import React, { ChangeEvent, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button, Form, Segment } from "semantic-ui-react"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { useStore } from "../../../app/stores/store"
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"

export default observer(function ActivityForm() {
	const history = useNavigate()
	const { activityStore } = useStore()
	const {
		loadingInitial,
		createActivity,
		updateActivity,
		loading,
		loadActivity,
		setLoadingInitial,
	} = activityStore
	const { id } = useParams<{ id: string }>()

	const [activity, setActivity] = useState({
		id: "",
		title: "",
		category: "",
		description: "",
		time: "",
		city: "",
		venue: "",
	})

	useEffect(() => {
		if (id) loadActivity(id).then((activity) => setActivity(activity!))
		else {
			setActivity({
				id: "",
				title: "",
				category: "",
				description: "",
				time: "",
				city: "",
				venue: "",
			})
			setLoadingInitial(false)
		}
	}, [id, loadActivity, setLoadingInitial])

	function handleSubmit() {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid(),
			}
			createActivity(newActivity).then(() =>
				history(`/activities/${newActivity.id}`)
			)
		} else {
			updateActivity(activity).then(() => history(`/activities/${activity.id}`))
		}
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target
		setActivity({ ...activity, [name]: value })
	}

	if (loadingInitial) return <LoadingComponent content="Loading activity..." />

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autoComplete="off">
				<Form.Input
					placeholder="Title"
					value={activity.title}
					onChange={handleInputChange}
					name="title"
				></Form.Input>
				<Form.TextArea
					placeholder="Description"
					value={activity.description}
					onChange={handleInputChange}
					name="description"
				></Form.TextArea>
				<Form.Input
					placeholder="Category"
					value={activity.category}
					onChange={handleInputChange}
					name="category"
				></Form.Input>
				<Form.Input
					type="datetime"
					placeholder="Time"
					value={activity.time}
					onChange={handleInputChange}
					name="time"
				></Form.Input>
				<Form.Input
					placeholder="City"
					value={activity.city}
					onChange={handleInputChange}
					name="city"
				></Form.Input>
				<Form.Input
					placeholder="Venue"
					value={activity.venue}
					onChange={handleInputChange}
					name="venue"
				></Form.Input>
				<Button
					loading={loading}
					floated="right"
					positive
					type="submit"
					content="Submit"
				/>
				<Button
					as={Link}
					to="/activities"
					floated="right"
					type="submit"
					content="Cancel"
				/>
			</Form>
		</Segment>
	)
})
