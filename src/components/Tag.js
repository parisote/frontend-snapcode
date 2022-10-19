import React from 'react'
import { Button } from 'react-bootstrap';

function Tag(props) {

    console.log(props)
    const { text } = props
    let variant = ''

    switch (text) {
        case 'JavaScript':
            variant = 'outline-warning'
            break;
        case 'TypeScript':
            variant = 'outline-info'
            break;
        case 'Java':
            variant = 'outline-danger'
            break;
        case 'C#':
            variant = 'outline-secondary'
            break;
        case 'C++':
            variant = 'outline-secondary'
            break;
        case 'Python':
            variant = 'outline-success'
            break;
        case 'React':
            variant = 'outline-primary'
            break;
        case 'Angular':
            variant = 'outline-danger'
            break;
        case 'Vue':
            variant = 'outline-danger'
            break;
        case 'express':
            variant = 'outline-success'
            break;
        default:
            variant = 'outline-secondary'
    }


    return (
        <div>
            <Button size='sm' variant={variant} className='mt-2  mx-1' style={{ maxWidth: '100px' }}>{text}</Button>{' '}
        </div>
    )
}

export default Tag