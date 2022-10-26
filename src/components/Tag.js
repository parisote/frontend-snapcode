import React from 'react'
import { Button } from 'react-bootstrap';

function Tag(props) {

    const { text } = props
    let variant = ''

    switch (text.toLowerCase()) {
        case 'javascript':
            variant = 'outline-warning'
            break;
        case 'typescript':
            variant = 'outline-info'
            break;
        case 'java':
            variant = 'outline-danger'
            break;
        case 'c#':
            variant = 'outline-secondary'
            break;
        case 'c++':
            variant = 'outline-secondary'
            break;
        case 'python':
            variant = 'outline-success'
            break;
        case 'react':
            variant = 'outline-primary'
            break;
        case 'angular':
            variant = 'outline-danger'
            break;
        case 'vue':
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