import Input from "../../components/UI/Input/Input";
import React, {useState} from "react";
import Confirm from "../../components/UI/Confirm/Confirm";

export function withInputShowConfirm (Component) {

    return (props) => {
        const [curValue, setCurValue] = useState('');

        return (
            <>
              <Component {...props} onPressOk={() => props.onAttachData(curValue)} >
                    <Input value={curValue} onChange={(e) => {setCurValue(e.target.value)}} label={props.label} fillStyle={true}/>
              </Component>
            </>
        )
    }
}

