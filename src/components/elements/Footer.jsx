import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function App() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-left'>
            <div className='text-center p-3' style={{ backgroundColor: '#5BA4EE', color: '#FFF' }}>
                &copy; {new Date().getFullYear()} Copyright: NZ Vet Locum Network 🩺
            </div>
        </MDBFooter>
    );
}