import * as React from 'react';
import Tooltip from '@bit/reactstrap.reactstrap.tooltip';

const InfoTooltip = ({alt, id, description}) => {
    const [show, setShow] = React.useState(false);

    // setTimeout(() => {
    //     setShow(true);
    // }, 100);

    return (
        <>
            <img
                id={`${id}-icon`}
                className="tooltipIcon"
                src={require('../assets/info-circle.svg')}
                alt={`${alt} Tooltip`}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            />
            <Tooltip placement="right" target={`${id}-icon`} isOpen={show}>
                {description}
            </Tooltip>
        </>
    );
};

export default InfoTooltip;
