import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import apiClient from '../services/apiClient'

function ProfileForm(props) {

    const { show, handleClose, data } = props

    const handleSubmit = async (event) => {
        event.preventDefault()
        const fData = new FormData(event.currentTarget)

        const updatedProfile = {
            username: fData.get('username'),
            name: fData.get('name'),
            biography: fData.get('biography'),
            workingAt: fData.get('workingAt'),
            location: fData.get('location'),
            linkedIn: fData.get('linkedin'),
            twitter: fData.get('twitter'),
        };

        let response = await apiClient.post("/api/user/profile/update/" + data.userId, updatedProfile);
        window.location.reload()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="bg-dark text-white" closeButton>
                <Modal.Title className="bg-dark text-white">Datos personales</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <p>
                    Para terminar, le pediremos que ingrese unos últimos datos para finalizar el registro.
                </p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            className="mb-3 bg-dark text-white"
                            name="username"
                            defaultValue={data.username || ''}
                            placeholder="J-Doe"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="name"
                    >
                        <Form.Label>Nombre y apellido</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            defaultValue={data.name || ''}
                            className="mb-3 bg-dark text-white"
                            name="name"
                            placeholder="Jane doe"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="biography">
                        <Form.Label>Biografía</Form.Label>
                        <Form.Control
                            required
                            defaultValue={data.biography || ''}
                            type='text'
                            className="mb-3 bg-dark text-white"
                            name="biography"
                            placeholder="About me"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="workingAt">
                        <Form.Label>Lugar de trabajo</Form.Label>
                        <Form.Control
                            required
                            defaultValue={data.workingAt || ''}
                            type='text'
                            className="mb-3 bg-dark text-white"
                            name="workingAt"
                            placeholder="Google"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 bg-dark text-white" controlId="place">
                        <Form.Label>Localidad</Form.Label>
                        <Form.Control
                            required
                            defaultValue={data.location || ''}
                            type='text'
                            className="mb-3 bg-dark text-white"
                            name="location"
                            placeholder="Buenos Aires, Argentina"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Linkedin">
                        <Form.Label>Linkedin</Form.Label>
                        <Form.Control
                            required
                            defaultValue={data.linkedIn || ''}
                            type='text'
                            className="mb-3 bg-dark text-white"
                            name="linkedin"
                            placeholder="LinkedinUrl"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Twitter">
                        <Form.Label>Twitter</Form.Label>
                        <Form.Control
                            required
                            defaultValue={data.twitter || ''}
                            type='text'
                            className="mb-3 bg-dark text-white"
                            name="twitter"
                            placeholder="TwitterUrl"
                            autoFocus
                        />
                        <Button type="submit" variant="primary" className='w-100'>
                            Confirmar
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-dark text-white">
                {/* {error ? <div class="alert alert-danger" role="alert"> {errorMsj} </div>
                    : <></>} */}
            </Modal.Footer >
        </Modal>
    )
}

export default ProfileForm