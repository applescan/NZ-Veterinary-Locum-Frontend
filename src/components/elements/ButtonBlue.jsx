import Button from 'react-bootstrap/Button';

function buttonBlue(props) {

    return (
        <>
            <style type="text/css">
                {`
                    .btn-blue {
                    background-color: #5BA4EE;
                    color: #fff;
                    }

                    .btn-blue:hover {
                        background-color:#0075EC;
                        color: #fff;
                        }

                    .btn-sml {
                    font-size: 0.7rem;
                    }
                    .btn-med {
                        font-size: 1.0rem;
                        }
    `}
            </style>

            <Button variant="blue" size={props.size} onClick={props.onClick} style={props.style} type={props.type}>
                {props.name}
            </Button>
        </>
    );
}

export default buttonBlue;

