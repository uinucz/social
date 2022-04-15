import { observer } from "mobx-react-lite"
import React, { ChangeEvent, useState } from "react"
import { Button, Form, Segment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"

export default observer(function ActivityForm() {
	const { activityStore } = useStore()
	const {
		selectedActivity,
		closeForm,
		createActivity,
		updateActivity,
		loading,
	} = activityStore

	const initialState = selectedActivity ?? {
		id: "",
		title: "",
		category: "",
		description: "",
		time: "",
		city: "",
		venue: "",
	}

	const [activity, setActivity] = useState(initialState)

	function handleSubmit() {
		activity.id ? updateActivity(activity) : createActivity(activity)
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target
		setActivity({ ...activity, [name]: value })
	}

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
					type="date"
					placeholder="Date"
					value={activity.time}
					onChange={handleInputChange}
					name="date"
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
					onClick={closeForm}
					floated="right"
					type="submit"
					content="Cancel"
				/>
			</Form>
		</Segment>
	)
})
