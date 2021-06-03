import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import TimePicker from 'react-time-picker'
import axios from 'axios'

import './DishForm.scss'

const DishForm = () => {
  const [preparationTime, setPreparationTime] = useState('')
  const [dishType, setDishType] = useState('')
  const [dishFormOutput, setDishFormOutput] = useState(null)

  const handleDishTypeChange = (e) => {
    e.preventDefault()
    setDishType(e.target.value)
  }

  const axiosRequest = (data) => {
    axios
      .post('https://frosty-wood-6558.getsandbox.com:443/dishes', data)
      .then((response) => {
        setDishFormOutput({ ...response.data })
      })
      .catch((err) => {
        alert.log(err)
      })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const sendData = {}
    sendData.name = formData.get('name')
    sendData.preparation_time = formData.get('preparation_time')
    sendData.type = formData.get('type')

    switch (dishType) {
      case 'pizza':
        if (
          formData.get('no_of_slices') >= 1 &&
          formData.get('diameter') >= 0
        ) {
          sendData.no_of_slices = parseInt(formData.get('no_of_slices'))
          sendData.diameter = parseInt(formData.get('diameter'))
          axiosRequest(sendData)
          break
        } else {
          alert(
            'You must take at least 1 slice of pizza or Diameter of your pizza should be larger than 0 '
          )
          break
        }
      case 'soup':
        if (
          formData.get('spiciness_scale') >= 1 &&
          formData.get('spiciness_scale') <= 10
        ) {
          sendData.spiciness_scale = parseInt(formData.get('spiciness_scale'))
          axiosRequest(sendData)
          break
        } else {
          alert('Spiciness scale is 1 - 10.')
          break
        }
      case 'sandwich':
        if (formData.get('slices_of_bread') >= 1) {
          sendData.slices_of_bread = parseInt(formData.get('slices_of_bread'))
          axiosRequest(sendData)
          break
        } else {
          alert('Take at least 1 slice of bread.')
          break
        }
      default:
        console.log('Choose dish type.')
        break
    }
  }

  return (
    <Row className='mt-3 mx-3'>
      <Col xs={12} md={6} className='mb-3'>
        <Form className='dish-form' onSubmit={handleFormSubmit}>
          <Form.Group controlId='dishForm.DishName'>
            <Form.Label>Dish Name</Form.Label>
            <Form.Control type='text' placeholder='Dish' name='name' required />
          </Form.Group>
          <Form.Label htmlFor='dishForm.PreparationTime'>
            Preparation time
          </Form.Label>
          <TimePicker
            id='dishForm.PreparationTime'
            className='d-block mb-3 dish-form__preparation-time-input'
            onChange={setPreparationTime}
            value={preparationTime}
            maxDetail='second'
            disableClock={true}
            required={true}
            name='preparation_time'
          />
          <Form.Group controlId='dishForm.DishType'>
            <Form.Label>Dish Type</Form.Label>
            <Form.Control
              as='select'
              onChange={(e) => handleDishTypeChange(e)}
              name='type'
              required
            >
              <option>Choose dish type</option>
              <option>pizza</option>
              <option>soup</option>
              <option>sandwich</option>
            </Form.Control>
          </Form.Group>
          {dishType === 'pizza' ? (
            <PizzaInputs dishType={dishType} />
          ) : dishType === 'soup' ? (
            <SoupInputs dishType={dishType} />
          ) : dishType === 'sandwich' ? (
            <SandwichInputs dishType={dishType} />
          ) : (
            <></>
          )}
          <Button
            variant='primary'
            type='submit'
            disabled={
              dishType === '' || (dishType === 'Choose dish type' && true)
            }
          >
            Submit
          </Button>
        </Form>
      </Col>
      <Col xs={12} md={6}>
        <pre>
          <code>
            {dishFormOutput != null && JSON.stringify(dishFormOutput, null, 2)}
          </code>
        </pre>
      </Col>
    </Row>
  )
}

const PizzaInputs = ({ dishType }) => (
  <>
    <Form.Group controlId='dishForm.NumberOfSlicesPizza'>
      <Form.Label>Number of Slices</Form.Label>
      <Form.Control
        type='number'
        name='no_of_slices'
        required={dishType === 'pizza' ? true : false}
      ></Form.Control>
    </Form.Group>
    <Form.Group controlId='dishForm.DiameterOfPizza'>
      <Form.Label>Diameter of pizza</Form.Label>
      <Form.Control
        type='number'
        name='diameter'
        step='0.01'
        required={dishType === 'pizza' ? true : false}
      ></Form.Control>
    </Form.Group>
  </>
)

const SoupInputs = ({ dishType }) => (
  <Form.Group controlId='dishForm.SpicinessScale'>
    <Form.Label>Spiciness Scale (1-10)</Form.Label>
    <Form.Control
      type='number'
      name='spiciness_scale'
      max='10'
      min='1'
      required={dishType === 'soup' ? true : false}
    ></Form.Control>
  </Form.Group>
)

const SandwichInputs = ({ dishType }) => (
  <Form.Group controlId='dishForm.NumberOfSlicesBread'>
    <Form.Label>Number of bread slices</Form.Label>
    <Form.Control
      type='number'
      name='slices_of_bread'
      required={dishType === 'sandwich' ? true : false}
    ></Form.Control>
  </Form.Group>
)

export default DishForm
