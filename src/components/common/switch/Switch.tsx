import React, {useState} from 'react'

import { CustomSwitch } from './styled'

interface SwitchProps {
    checked: boolean
    setChecked: (checked: boolean) => void
}

const Switch = ({checked, setChecked}: SwitchProps) => {
    const [value, setValue] = useState(checked)

    const handler = (value: boolean) => {
        setValue(value)
        setTimeout(() => setChecked(value), 1000)
    }

    return (
        <CustomSwitch>
            <label>
                <input checked={value} onChange={(e) => handler(e.currentTarget.checked)} className="switch" type="checkbox" />
                <div>
                    <span/>
                    <span/>
                    <div/>
                </div>
            </label>
        </CustomSwitch>
    )
}

export default Switch