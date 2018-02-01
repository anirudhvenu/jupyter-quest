import React from 'react';
import Button from 'material-ui/Button';


export const EditAssignment = ( {create} ) => (
    <Button raised color="primary" onClick={ () => create()}>Create a assignment</Button>
)
